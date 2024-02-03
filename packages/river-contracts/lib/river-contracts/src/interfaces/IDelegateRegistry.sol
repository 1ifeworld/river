
// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

/**
 * @title IDelegateRegistry
 * @author Lifeworld
 */
interface IDelegateRegistry {    
    //////////////////////////////////////////////////
    // TYPES
    //////////////////////////////////////////////////    
    struct Delegation {
        address target;
        bytes4 selector;
        bool status;
        address delegate;
    }    
}

