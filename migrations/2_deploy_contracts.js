var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TopicFactory = artifacts.require("./TopicFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TopicFactory);
};
