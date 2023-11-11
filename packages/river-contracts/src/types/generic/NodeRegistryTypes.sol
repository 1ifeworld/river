// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title NodeRegistryTypes
 * @author Lifeworld
 */
abstract contract NodeRegistryTypes {

    //////////////////////////////////////////////////
    // GENERIC
    //////////////////////////////////////////////////

    function export_000_Message() external pure returns (uint256 userId, uint256 msgType, bytes memory msgBody) {
        return (userId, msgType, msgBody);
    }

}