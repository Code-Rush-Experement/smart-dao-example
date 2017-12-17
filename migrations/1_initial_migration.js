var Migrations = artifacts.require("./Migrations.sol");
var TruffleConfig = require('../truffle-config');
var Web3 = require('web3');
var readlineSync = require('readline-sync');

module.exports = function (deployer, network, addresses) {

    const config = TruffleConfig.networks[network];

    var password = process.env.ACCOUNT_PASSWORD;
    console.log('>> from ' + config.from);
    console.log('>> password in env: ' + !!password);
    if (!!password && network.from) {
        password = readlineSync.question('Enter eth account password: ', { hideEchoBack: true });
    }
    console.log('>> password from console: ' + !!password);

    const needUnlock = config.from && password;

    if (!!needUnlock) {
        const web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.host + ':' + config.port));

        console.log('>> Unlocking account ' + config.from);
        web3.eth.personal.unlockAccount(config.from, password, 36000);
    }

    console.log('>> Deploying migration');

    deployer.deploy(Migrations);
};
