// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {SignatureChecker} from "openzeppelin-contracts/utils/cryptography/SignatureChecker.sol";
import {ISignatures} from "../interfaces/abstract/ISignatures.sol";

abstract contract Signatures is ISignatures {
    
    //////////////////////////////////////////////////
    // GENERIC HELPER
    ////////////////////////////////////////////////// 

    function _verifySig(bytes32 digest, address signer, uint256 deadline, bytes memory sig) internal view {
        if (block.timestamp > deadline) revert SignatureExpired();
        if (!SignatureChecker.isValidSignatureNow(signer, digest, sig)) {
            revert InvalidSignature();
        }
    }
}