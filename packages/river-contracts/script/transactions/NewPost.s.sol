// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {PostGateway} from "imp/PostGateway.sol";
import {ECDSA} from "openzeppelin-contracts/utils/cryptography/ECDSA.sol";

contract PostScript is Script {
    using ECDSA for bytes32;

    PostGateway postGateway = PostGateway(0x5FbDB2315678afecb367f032d93F642f64180aa3); // anvil
    // PostGateway postGateway = PostGateway(0x339513226Afd92B309837Bad402c6D3ADDE9Ad24); // opGoerli

    uint256 constant userId = 1;
    uint8 constant sigType = 1;
    uint16 constant version = 1;
    string public ipfsUri = "ipfs://bafkreiai2xekku6zoiwkchzgpsrjsd3z3nuotk3lzsoyo27rqymp6d3cni";

    uint256 public deployerPrivateKey;
    
    function setUp() public {}

    function run() public {
        /* Load private key */
        bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        deployerPrivateKey = uint256(privateKeyBytes);
        /* Start function transmission */
        vm.startBroadcast(deployerPrivateKey);

        createChannel();        
        referenceChannel();

        createPublication();        
        referencePublication();

        removeReference();

        vm.stopBroadcast();
        /* End function transmission */
    }

    function createChannel() public {
        // Prep message for post        
        uint32 msgType = 100;
        uint64 expiration = uint64(block.timestamp) + 600;
        uint256[] memory adminIds = new uint256[](1);
        adminIds[0] = 1;
        uint256[] memory memberIds = new uint256[](2);
        memberIds[0] = 2;
        memberIds[1] = 3;
        uint256[] memory channelTags = new uint256[](1);
        channelTags[0] = 1;
        bytes memory msgBody = abi.encode(ipfsUri, adminIds, memberIds, channelTags);        
        bytes[] memory messageArray = new bytes[](1);
        messageArray[0] = abi.encodePacked(msgType, msgBody);
        // generate post signature
        bytes memory signedPost = signPost(deployerPrivateKey, version, expiration, messageArray);         
        // encode post inputs
        bytes memory postInputs = abi.encodePacked(
            userId,                             // userId
            sigType,                            // sigType
            signedPost,                         // signature
            version,                            // version
            expiration,                         // expiration
            abi.encode(messageArray)            // message array
        );                 
        // call post
        postGateway.post(postInputs);
    }

    function referenceChannel() public {
        // Prep message for post        
        uint32 msgType = 101;
        uint64 expiration = uint64(block.timestamp) + 600;
        uint256 targetChannel = 5;
        uint256[] memory channelTags = new uint256[](1);
        channelTags[0] = 1;
        bytes memory msgBody = abi.encode(targetChannel, channelTags);        
        bytes[] memory messageArray = new bytes[](1);
        messageArray[0] = abi.encodePacked(msgType, msgBody);
        // generate post signature
        bytes memory signedPost = signPost(deployerPrivateKey, version, expiration, messageArray);         
        // encode post inputs
        bytes memory postInputs = abi.encodePacked(
            userId,                             // userId
            sigType,                            // sigType
            signedPost,                         // signature
            version,                            // version
            expiration,                         // expiration
            abi.encode(messageArray)            // message array
        );                 
        // call post
        postGateway.post(postInputs);        
    }

    function createPublication() public {
        // Prep message for post        
        uint32 msgType = 200;
        uint64 expiration = uint64(block.timestamp) + 600;        
        uint256[] memory channelTags = new uint256[](1);
        channelTags[0] = 1;
        bytes memory msgBody = abi.encode(ipfsUri, channelTags);        
        bytes[] memory messageArray = new bytes[](1);
        messageArray[0] = abi.encodePacked(msgType, msgBody);
        // generate post signature
        bytes memory signedPost = signPost(deployerPrivateKey, version, expiration, messageArray);         
        // encode post inputs
        bytes memory postInputs = abi.encodePacked(
            userId,                             // userId
            sigType,                            // sigType
            signedPost,                         // signature
            version,                            // version
            expiration,                         // expiration
            abi.encode(messageArray)            // message array
        );                 
        // call post
        postGateway.post(postInputs);
    }

    function referencePublication() public {
        // Prep message for post        
        uint32 msgType = 201;
        uint64 expiration = uint64(block.timestamp) + 600;        
        uint256 targetPub = 1;
        uint256[] memory channelTags = new uint256[](1);
        channelTags[0] = 5;
        bytes memory msgBody = abi.encode(targetPub, channelTags);        
        bytes[] memory messageArray = new bytes[](1);
        messageArray[0] = abi.encodePacked(msgType, msgBody);
        // generate post signature
        bytes memory signedPost = signPost(deployerPrivateKey, version, expiration, messageArray);         
        // encode post inputs
        bytes memory postInputs = abi.encodePacked(
            userId,                             // userId
            sigType,                            // sigType
            signedPost,                         // signature
            version,                            // version
            expiration,                         // expiration
            abi.encode(messageArray)            // message array
        );                 
        // call post
        postGateway.post(postInputs);
    }    

    function removeReference() public {
        // Prep message for post        
        uint32 msgType = 500;
        uint64 expiration = uint64(block.timestamp) + 600;        
        uint256 channelId = 1;
        uint256 referenceId = 1;
        bytes memory msgBody = abi.encode(channelId, referenceId);        
        bytes[] memory messageArray = new bytes[](1);
        messageArray[0] = abi.encodePacked(msgType, msgBody);
        // generate post signature
        bytes memory signedPost = signPost(deployerPrivateKey, version, expiration, messageArray);         
        // encode post inputs
        bytes memory postInputs = abi.encodePacked(
            userId,                             // userId
            sigType,                            // sigType
            signedPost,                         // signature
            version,                            // version
            expiration,                         // expiration
            abi.encode(messageArray)            // message array
        );                 
        // call post
        postGateway.post(postInputs);
    }       

    //////////////////////////////////////////////////
    // HELPERS
    //////////////////////////////////////////////////  


    function _sign(uint256 privateKey, bytes32 digest) internal pure returns (bytes memory) {
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
        return abi.encodePacked(r, s, v);
    }     

    function signPost(
        uint256 privateKey, 
        uint16 vers, 
        uint64 exp, 
        bytes[] memory msgArray
    ) public pure returns (bytes memory signedPost) {
        bytes32 hash = keccak256(abi.encode(vers, exp, msgArray)).toEthSignedMessageHash();
        signedPost = _sign(privateKey, hash);
    }
}

// ======= DEPLOY SCRIPTS =====

// source .env
// forge script script/transactions/NewPost.s.sol:PostScript -vvvv --rpc-url $RPC_URL --broadcast
// forge script script/transactions/NewPost.s.sol:PostScript -vvvv --fork-url http://localhost:8545 --broadcast