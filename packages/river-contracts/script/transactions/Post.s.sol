// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {PostGateway} from "imp/PostGateway.sol";

contract PostScript is Script {

    PostGateway postGateway = PostGateway(0x5FbDB2315678afecb367f032d93F642f64180aa3);

    uint256 constant userId = 1;
    uint8 constant sigType = 1;
    uint16 constant version = 1;
    bytes public sig = hex"a3f20717a250c2b0b729b07ff9e6d8c0c1556334506f6c1f6f85c37b3a771fc45fb12f9e3c2322701ac7916c8b0b726f27dbeee6ab09cb3d7d44db6e8a3a3e331b";
    string public ipfsUri = "ipfs://bafkreiai2xekku6zoiwkchzgpsrjsd3z3nuotk3lzsoyo27rqymp6d3cni";
    
    function setUp() public {}

    function run() public {
        /* Load private key */
        bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        uint256 deployerPrivateKey = uint256(privateKeyBytes);
        /* Start function transmission */
        vm.startBroadcast(deployerPrivateKey);

        // create Post with one createPublication message
        // createPublication();

        // create Channel with one createChannel message
        // createChannel();        

        // add item with one addItem message
        addItem();                

        vm.stopBroadcast();
        /* End function transmission */
    }

    function createPublication() public {
        // Prep message for post        
        uint32 msgType = 1;
        bytes memory msgBody = abi.encode(ipfsUri);        
        bytes[] memory messageArray = new bytes[](1);
        messageArray[0] = abi.encodePacked(msgType, msgBody);
        // encode post inputs
        bytes memory postInputs = abi.encodePacked(
            userId,                             // userId
            sigType,                            // sigType
            sig,                                // signature
            version,                            // version
            uint64(block.timestamp) + 600,      // expiration
            abi.encode(messageArray)            // message array
        );                 
        // call post
        postGateway.post(postInputs);
    }

    function createChannel() public {
        // Prep message for post        
        uint32 msgType = 2;
        uint256[] memory adminIds = new uint256[](1);
        adminIds[0] = 1;
        uint256[] memory memberIds = new uint256[](2);
        memberIds[0] = 2;
        memberIds[1] = 3;
        bytes memory msgBody = abi.encode(ipfsUri, adminIds, memberIds);        
        bytes[] memory messageArray = new bytes[](1);
        messageArray[0] = abi.encodePacked(msgType, msgBody);
        // encode post inputs
        bytes memory postInputs = abi.encodePacked(
            userId,                             // userId
            sigType,                            // sigType
            sig,                                // signature
            version,                            // version
            uint64(block.timestamp) + 600,      // expiration
            abi.encode(messageArray)            // message array
        );                 
        // call post
        postGateway.post(postInputs);
    }

    function addItem() public {
        // Prep message for post        
        uint32 msgType = 3;
        uint256 chainId = 420;
        address target = address(postGateway);
        bool hasId = true;
        int256 id = 1;
        int256 channelId = 1;
        bytes memory msgBody = abi.encode(
            chainId,
            target,
            hasId,
            id,
            channelId    
        );        
        bytes[] memory messageArray = new bytes[](1);
        messageArray[0] = abi.encodePacked(msgType, msgBody);
        // encode post inputs
        bytes memory postInputs = abi.encodePacked(
            userId,                             // userId
            sigType,                            // sigType
            sig,                                // signature
            version,                            // version
            uint64(block.timestamp) + 600,      // expiration
            abi.encode(messageArray)            // message array
        );                 
        // call post
        postGateway.post(postInputs);
    }
}

// ======= DEPLOY SCRIPTS =====

// source .env
// forge script script/transactions/Post.s.sol:PostScript -vvvv --fork-url http://localhost:8545 --broadcast