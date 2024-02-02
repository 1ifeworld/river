// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {IPostGateway2} from "./IPostGateway2.sol";

/**
 * @title PostGateway2
 * @author Lifeworld
 */
contract PostGateway2 is IPostGateway2 {

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////    

    /**
     * @dev Emit an event when `post()` is called
     *
     * @param sender    Address of the account calling `post()`
     */
    event NewPost(address indexed sender);    

    //////////////////////////////////////////////////
    // POST
    //////////////////////////////////////////////////

    function post(Post calldata /*post*/) external {
        emit NewPost(msg.sender);
    }    

    function postBatch(Post[] calldata posts) external {
        address sender = msg.sender;
        for (uint256 i; i < posts.length; ++i) {
            emit NewPost(sender);
        }        
    }          

    //////////////////////////////////////////////////
    // TYPE HELPRES
    //////////////////////////////////////////////////

    function exportChannelStruct() external pure returns (Channel memory channel) {
        return channel;
    }

    function exportItemStruct() external pure returns (Item memory item) {
        return item;
    }    

    function exportAddItemStruct() external pure returns (AddItem memory addItem) {
        return addItem;
    }    
}