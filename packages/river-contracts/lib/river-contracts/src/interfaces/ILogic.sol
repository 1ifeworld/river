// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

/**
 * @title ILogic
 * @author Lifeworld
 */
interface ILogic {    
    function initializeWithData(uint256 userId, bytes32 channelHash, bytes memory data) external;
    function access(uint256 userId, bytes32 channelId, uint256 access) external view returns (uint256);
}