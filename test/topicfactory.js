const {toAsciiTrimmed} = require('../src/utils/name-utils');

var TopicFactory = artifacts.require("./TopicFactory.sol");
var Topic = artifacts.require("./Topic.sol");

contract('TopicFactory', function (accounts) {
    var topicFactoryInstance;

    it("should create topic contract", async () => {
        const topicFactoryInstance = await TopicFactory.deployed();
        await topicFactoryInstance.createContract('test');
        const contracts = await topicFactoryInstance.contracts();

        const createdTopicInstance = await Topic.at(contracts[0]);

        assert.equal(toAsciiTrimmed(await createdTopicInstance.name()), 'test');
    });

})
;
