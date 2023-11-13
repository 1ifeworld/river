// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title Message_Type
 * @author Lifeworld
 */
abstract contract Message_Type {

    //////////////////////////////////////////////////
    // GENERIC
    //////////////////////////////////////////////////

    function export_000_Message() external pure returns (uint256 userId, uint256 msgType, bytes memory msgBody) {
        return (userId, msgType, msgBody);
    }

}