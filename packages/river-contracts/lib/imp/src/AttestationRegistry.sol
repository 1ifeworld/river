// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Signatures} from "./abstract/Signatures.sol";

/**
 * @title AttestationRegistry
 * @author Lifeworld
 */
contract AttestationRegistry is Signatures {

    //////////////////////////////////////////////////
    // ERROR
    //////////////////////////////////////////////////      

    error No_Existing_Attestation();

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////       

    event Attest(address indexed sender, address indexed attestor); 
    event Revoke(address indexed revoker, address indexed attestedFor); 

    //////////////////////////////////////////////////
    // STORAGE
    //////////////////////////////////////////////////        

    mapping(address => address) public attestorFor;
    mapping(address => address) public attestedBy;

    //////////////////////////////////////////////////
    // ATTEST
    //////////////////////////////////////////////////    

    /// @dev To use correctly, signature must be signed on the EIP
    /// step 1. decide on a message. convert it to bytes.
    /// step 2. use an encoding library like viem to perform a kecack256 op on the bytes value, turining it 
    ///         bytes32 hash. message must be encodePacked with deadline
    /// step 3. convert the bytes32 hash into a EIP191 compliant eth signed message using an encoding library
    /// step 4. sign the eip191 hash from the address you are atteseting to, and pass that in as the sig value
    ///        the kecacked BUT NOT YET eip191 hash should go in the 'messageToHash' field
    function attest(address signer, bytes memory message, bytes memory sig, uint256 deadline) external {
        // Cache msg.sender
        address sender = msg.sender;
        // Perform signature check defined in Signatures.sol
        _verifySig(message, signer, deadline, sig);
        // Save attestor storage. They cannot attest again until clearing their attestation
        attestorFor[sender] = signer;
        attestedBy[signer] = sender;
        // Emit Attestation event
        emit Attest(msg.sender, signer);
    }    

    //////////////////////////////////////////////////
    // REVOKE
    //////////////////////////////////////////////////    

    function revoke() external {
        // Cache msg.sender
        address sender = msg.sender;
        // Retrieve attested by value
        address target = attestedBy[sender];
        // Check if attestation exists for sender
        if (target == address(0)) revert No_Existing_Attestation();
        // Clear attestation storage
        delete attestedBy[sender];
        delete attestorFor[target];
        // Emit for indexing
        emit Revoke(sender,  target);
    }
}