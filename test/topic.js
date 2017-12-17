const {toAsciiTrimmed} = require('../src/utils/name-utils');

var TopicFactory = artifacts.require("./TopicFactory.sol");
var Topic = artifacts.require("./Topic.sol");

contract('Topic', function (accounts) {
    it("should has name", async () => {
        const createdTopicInstance = await Topic.new('test');
        assert.equal(toAsciiTrimmed(await createdTopicInstance.name()), 'test');
    });
});
