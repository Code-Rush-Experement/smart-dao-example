const {toAsciiTrimmed} = require('../src/utils/name-utils');
var _ = require('lodash');
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

    it("should fire event when topic contract created", async () => {
        //given
        const topicFactoryInstance = await TopicFactory.deployed();
        const event = topicFactoryInstance.TopicCreated();
        const watchPromise = new Promise((resolve, reject) => {
            event.watch(function(error, result){
                if (_.isError(error)) {
                    reject(error);
                }
                resolve(result)
            });
        });

        //then
        await topicFactoryInstance.createContract('test');

        //given
        const result = await watchPromise;
        assert.equal(toAsciiTrimmed(result.args.name), 'test');
    });

})
;
