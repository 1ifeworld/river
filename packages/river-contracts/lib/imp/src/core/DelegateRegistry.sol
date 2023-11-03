// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {IDelegateRegistry} from "./interfaces/IDelegateRegistry.sol";
import {IdRegistry} from "./IdRegistry.sol";

/// TODO: bump to sol 0.8.22

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
     *      Id owners can toggle the delegation status of any address to act on its behalf.
     *      When an id is transferred, it increments a transferNonce for the given id
     *      that effectively clears all existing delegates for that id.
     *      Delegations can then be made again by the new id owners
     *
     * @param id            The id granting delegation
     * @param nonce         The current transfer nonce of id
     * @param target        Address receiving delegation
     * @param status        T/F of delegation status
     */
    event Delegate(uint256 indexed id, uint256 nonce, address indexed target, bool indexed status); 

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
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public idDelegates;

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
        // Retrieve transfer nonce for id
        uint256 idTransferNonce = idRegistry.transferCountForId(id);
        // Delegate to target for given id + transfer nonce
        idDelegates[id][idTransferNonce][target] = status;
        emit Delegate(id, idTransferNonce, target, status);
    }

    /**
     * @inheritdoc IDelegateRegistry
     */
    function isDelegate(uint256 id, address target) external view returns (bool delegateStatus) {
        delegateStatus = idDelegates[id][idRegistry.transferCountForId(id)][target];
    }
}