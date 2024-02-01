// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

/**
 * @title IPostGateway2
 * @author Lifeworld
 */
interface IPostGateway2 {

    //////////////////////////////////////////////////
    // GENERAL
    //////////////////////////////////////////////////        

    struct Post {
        address signer;
        Message message;
        uint16 hashType;
        bytes32 hash;
        uint16 sigType;
        bytes sig;
    }    

    struct Message {
        uint256 rid; // could use sig here instead? rid seems fine tho
        uint256 timestamp;
        MessageTypes msgType;			
        bytes msgBody;				
    }         

    enum MessageTypes {
        NONE,                       // 0
        CREATE_ITEM,                // 1
        UPDATE_ITEM,                // 2
        CREATE_CHANNEL,             // 3
        UPDATE_CHANNEL,             // 4  
        ADD_ITEM_TO_CHANNEL,        // 5
        REMOVE_ITEM_FROM_CHANNEL    // 6
    }    

    //////////////////////////////////////////////////
    // ITEMS
    //////////////////////////////////////////////////      

    enum ItemDataTypes {
        NONE,
        STRING_URI
    }

    enum ItemAccessTypes {
        NONE,
        ADMINS
    }

    struct ItemData {
        ItemDataTypes dataType;
        bytes contents;
    }        


    struct ItemAccess {
        ItemAccessTypes accessType;
        bytes contents;
    }            

    struct Item {
        ItemData data;
        ItemAccess access;
    }   

    //////////////////////////////////////////////////
    // CHANNELS
    //////////////////////////////////////////////////       

    enum ChannelDataTypes {
        NONE,
        STRING_URI
    }

    enum ChannelAccessTypes {
        NONE,
        ROLES
    }    

    struct ChannelData {
        ChannelDataTypes dataType;
        bytes contents;
    }    

    struct ChannelAccess {
        ChannelAccessTypes accessType;
        bytes contents;
    }      

    struct Channel {
        ChannelData data;
        ChannelAccess access;
    }

    //////////////////////////////////////////////////
    // OTHER
    //////////////////////////////////////////////////    

    struct AddItem {
        bytes itemCid;
        bytes channelCid;
    }        

    struct RemoveItem {
        bytes itemCid;
        bytes channelCid;
    }      
}