pragma solidity ^0.4.4;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract ContributorCoin is StandardToken {
    string public name = 'ContributorCoin';
    string public symbol = 'C1';
    uint public decimals = 2;
    uint public INITIAL_SUPPLY = 100000;


    function ContributorCoin() public {
        totalSupply = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }


}
