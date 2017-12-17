pragma solidity ^0.4.4;


/// @title just micro-conf topics
contract Topic {
    bytes32 public name;

    function Topic(bytes32 _name) public {
        name = _name;
    }

}
