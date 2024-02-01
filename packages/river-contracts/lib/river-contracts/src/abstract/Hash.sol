// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

/**
 * @title Hash
 * @author Lifeworld 
 */
abstract contract Hash {
    function _generateHash(uint256 userId, uint256 targetId, bytes32 salt) internal pure returns (bytes32 hash) {
        hash = keccak256(abi.encode(userId, targetId, salt));
    }
}