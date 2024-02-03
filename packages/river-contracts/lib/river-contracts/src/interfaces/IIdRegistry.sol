// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

/**
 * @title IIdRegistry
 * @author Lifeworld
 */
interface IIdRegistry {

    //////////////////////////////////////////////////
    // ERRORS
    //////////////////////////////////////////////////

    error Unauthorized();
    error Has_Id();
    error Has_No_Id();

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////

    event Register(address indexed to, uint256 id, address recovery);
    event Transfer(address indexed from, address indexed to, uint256 indexed id);
    event Recover(address indexed from, address indexed to, uint256 indexed id);
    event ChangeRecoveryAddress(uint256 indexed id, address indexed recovery);
}
