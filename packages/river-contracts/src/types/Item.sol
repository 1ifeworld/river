// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title Item
 * @author Lifeworld
 */
abstract contract Item {
    function exportItem()
        external
        pure
        returns (uint256 chainId, address target, bool hasId, int256 id, int256 channelId)
    {
        return (chainId, target, hasId, id, channelId);
    }
}
