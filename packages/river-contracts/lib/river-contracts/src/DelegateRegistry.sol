// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {IdRegistry} from "./IdRegistry.sol";
import {IDelegateRegistry} from "./interfaces/IDelegateRegistry.sol";
import {Signatures} from "./abstract/Signatures.sol";
import {EIP712} from "./abstract/EIP712.sol";

/**
 * @title DelegateRegistry
 * @author Lifeworld
 */
contract DelegateRegistry is IDelegateRegistry, Signatures, EIP712 {

    //////////////////////////////////////////////////
    // ERRORS
    //////////////////////////////////////////////////    

    error Unauthorized_Signer_For_User(uint256 userId);

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////        
    
    event Delegations(address sender, uint256 userId, Delegation[]);

    //////////////////////////////////////////////////
    // CONSTANTS
    //////////////////////////////////////////////////      

    // TODO: is this a valid typehash? theres other bytes inputs that are passed in
    //       but unclear if thats worth including? since wont be readable anyway in signing flow?
    bytes32 public constant SET_DELEGATES_TYPEHASH =
        keccak256("SetDelegates(uint256 userId,Delegation[] dels)");    

    //////////////////////////////////////////////////
    // STORAGE
    //////////////////////////////////////////////////

    IdRegistry public idRegistry;

    mapping(uint256 userId => 
        mapping(address delegate => 
            mapping(address target => 
                mapping(bytes4 selector => bool status)))) public isDelegate;

    //////////////////////////////////////////////////
    // CONSTRUCTOR
    //////////////////////////////////////////////////            

    constructor(address _idRegistry) EIP712("DelegateRegistry", "1") {
        idRegistry = IdRegistry(_idRegistry);
    }        

    //////////////////////////////////////////////////
    // WRITES
    //////////////////////////////////////////////////   
                
    // TODO: add sig based function
    function setDelegates(uint256 userId, Delegation[] memory dels) external {
        // Cache msg.sender
        address sender = msg.sender;
        // Check authorization status for msg.sender. Must be custody address
        if (sender != idRegistry.custodyOf(userId)) revert Unauthorized_Signer_For_User(userId);
        // Process delegations
        for (uint256 i; i < dels.length; ++i) {
            isDelegate[userId][dels[i].delegate][dels[i].target][dels[i].selector] = dels[i].status;    
        }
        // Emit for indexing
        emit Delegations(sender, userId, dels);
    }

    // TODO: add sig based function
    function setDelegatesFor(uint256 userId, Delegation[] memory dels, address signer, uint256 deadline, bytes calldata sig) external {
        // verify signer check
        _verifySetDelegatesSig(userId, dels, signer, deadline, sig);        
        // Check authorization status for msg.sender. Must be custody address
        if (signer != idRegistry.custodyOf(userId)) revert Unauthorized_Signer_For_User(userId);
        // Process delegations
        for (uint256 i; i < dels.length; ++i) {
            isDelegate[userId][dels[i].delegate][dels[i].target][dels[i].selector] = dels[i].status;    
        }
        // Emit for indexing
        emit Delegations(signer, userId, dels);
    }    

    ////////////////////////////////////////////////////////////////
    // SIGNATURE VERIFICATION HELPERS
    ////////////////////////////////////////////////////////////////

    function _verifySetDelegatesSig(         
        uint256 userId, 
        Delegation[] memory dels,
        address signer,
        uint256 deadline, 
        bytes memory sig
    ) internal view {
        _verifySig(
            _hashTypedDataV4(keccak256(abi.encode(SET_DELEGATES_TYPEHASH, userId, dels, deadline))),
            signer,
            deadline,
            sig
        );
    }          
}   