var TopicFactory = artifacts.require("./TopicFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(TopicFactory);
};
