// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title Post_Type
 * @author Lifeworld
 */
abstract contract Post {

    function exportPost() external pure returns (
        uint256 userId,
        uint16 sigType,
        bytes memory sig,
        uint96 version,
        uint96 expiration,
        bytes[] memory messageArray
    ) {
        return (
            userId, 
            sigType,
            sig,
            version,
            expiration,
            messageArray
        );
    }
}