pragma solidity ^0.4.0;

import "./Topic.sol";


contract TopicFactory {
    bytes32[] names;
    address[] newContracts;

    function TopicFactory() public {

    }

    function createContract (bytes32 name) public {
        address newContract = new Topic(name);
        newContracts.push(newContract);
    }

    function contracts() public constant returns (address[]) {
        return newContracts;
    }
}


