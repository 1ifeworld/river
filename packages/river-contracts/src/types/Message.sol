// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title Message
 * @author Lifeworld
 */
abstract contract Message {
    /**
     * @dev type(uint32).max = 4,294,967,295
     */
    function exportMessage() 
        external 
        pure 
        returns (uint32 msgType, bytes memory msgBody) 
    {
        return (msgType, msgBody);
    }
}
