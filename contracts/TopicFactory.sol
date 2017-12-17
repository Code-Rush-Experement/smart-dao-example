pragma solidity ^0.4.0;

import "./Topic.sol";


contract TopicFactory {
    bytes32[] names;
    address[] newContracts;

    event TopicCreated(address id, bytes32 name, address sender);

    function TopicFactory() public {

    }

    function createContract (bytes32 name) public {
        address newContract = new Topic(name);
        newContracts.push(newContract);
        TopicCreated(newContract, name, msg.sender);
    }

    function contracts() public constant returns (address[]) {
        return newContracts;
    }
}


