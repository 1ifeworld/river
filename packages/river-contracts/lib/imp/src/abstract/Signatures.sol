// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {ECDSA} from "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import {SignatureChecker} from "openzeppelin-contracts/utils/cryptography/SignatureChecker.sol";

// TODO: missing documentation for `_verifySig`

abstract contract Signatures {
    using ECDSA for bytes32;

    /// @dev Revert if signature was not valid for designated signer address
    error Invalid_Signature();

    /// @dev Revert if current timestamp is past designated deadline
    error Signature_Expired();

    function _verifySig(bytes memory message, address signer, uint256 deadline, bytes memory sig) internal view {
        // Check if signature deadline has passed
        if (block.timestamp > deadline) revert Signature_Expired();        
        // Convert message to hash, encoded with deadline
        bytes32 hash = keccak256(abi.encodePacked(message, deadline));
        // Convert hash to EIP-191 signed message hash
        bytes32 digest = hash.toEthSignedMessageHash();
        // Perform check on signature
        if (!SignatureChecker.isValidSignatureNow(signer, digest, sig)) revert Invalid_Signature();
    }      
}