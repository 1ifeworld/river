// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {IDelegateRegistry} from "./interfaces/IDelegateRegistry.sol";
import {IdRegistry} from "./IdRegistry.sol";

/**
 * @title DelegateRegistry
 * @author Lifeworld
 */
contract DelegateRegistry is IDelegateRegistry {

    //////////////////////////////////////////////////
    // ERRORS
    //////////////////////////////////////////////////   

    /// @dev Revert when the caller must have an id but does not have one.
    error Has_No_Id();    

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////       

    /**
     * @dev Emit an event when an id grants a delegation
     *
     *      Id owners can toggle the delegation status of any address to create messages
     *      in the NodeRegistry on its behalf
     *
     * @param id            The id granting delegation
     * @param target        Address receiving delegation
     * @param status        T/F of delegation status
     */
    event Delegate(uint256 indexed id, address indexed target, bool indexed status); 

    //////////////////////////////////////////////////
    // CONSTRUCTOR
    //////////////////////////////////////////////////         

    /**
     * @notice Specify address of idRegistry
     *
     * @param _idRegistry IdRegistry address
     *
     */
    constructor(address _idRegistry) {
        idRegistry = IdRegistry(_idRegistry);
    }

    //////////////////////////////////////////////////
    // CONSTANTS
    //////////////////////////////////////////////////   

    /**
     * @inheritdoc IDelegateRegistry
     */
    IdRegistry immutable public idRegistry;

    //////////////////////////////////////////////////
    // STORAGE
    //////////////////////////////////////////////////        

    /**
     * @inheritdoc IDelegateRegistry
     */    
    mapping(uint256 => mapping(address => bool)) public idDelegates;

    //////////////////////////////////////////////////
    // ID DELEGATION
    //////////////////////////////////////////////////    

    /**
     * @inheritdoc IDelegateRegistry
     */
    function updateDelegate(address target, bool status) external {
        // Retrieve id for msg.sender
        uint256 id = idRegistry.idOwnedBy(msg.sender);
        // Check if sender has an id
        if (id == 0) revert Has_No_Id();
        // Delegate to target for given id 
        idDelegates[id][target] = status;
        emit Delegate(id, target, status);
    }

    /**
     * @inheritdoc IDelegateRegistry
     */
    function isDelegate(uint256 id, address target) external view returns (bool delegateStatus) {
        delegateStatus = idDelegates[id][target];
    }
}