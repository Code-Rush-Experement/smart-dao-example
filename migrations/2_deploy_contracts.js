var TopicFactory = artifacts.require("./TopicFactory.sol");
var ContributorCoin = artifacts.require("./ContributorCoin.sol");

var gas = 4700000;

module.exports = function (deployer) {

    deployer.deploy(TopicFactory);

    const initialSupply = 10000;
    const tokenName = 'Contributor Coin';
    const tokenSymbol = 'CC';

    deployer.deploy(ContributorCoin, [initialSupply, tokenName, tokenSymbol], {gas: gas});
};
