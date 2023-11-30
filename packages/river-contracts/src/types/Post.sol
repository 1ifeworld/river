// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title Post
 * @author Lifeworld
 */
abstract contract Post {
    /**
     * @dev type(uint8).max = 63
     * @dev type(uint16).max = 65,535
     * @dev type(uint64).max = 8,446,744,073,709,551,615
     */    
    function exportPost()
        external
        pure
        returns (
            uint256 userId,
            uint8 sigType,
            bytes memory sig,
            uint16 version,
            uint64 expiration,
            bytes[] memory messageArray
        )
    {
        return (userId, sigType, sig, version, expiration, messageArray);
    }
}
