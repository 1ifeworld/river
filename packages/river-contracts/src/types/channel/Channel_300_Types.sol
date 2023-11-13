// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;


/**
 * @title Channel_300_Types
 * @author Lifeworld
 */
abstract contract Channel_300_Types {    

    //////////////////////////////////////////////////
    // CHANNEL
    //////////////////////////////////////////////////   

    function export_301_Channel_SetUri() 
        external pure returns (string memory uri) 
    {
        return (uri);
    }        

    function export_302_Channel_AddItem() 
        external pure returns (uint256 chainId, uint256 id, address pointer, bool hasId) 
    {
        return (chainId, id, pointer, hasId);
    }          

    function export_303_Channel_RemoveItem()    
        external pure returns (uint256 channelIndex) 
    {
        return (channelIndex);
    }      
}