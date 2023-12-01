// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {PostGateway} from "imp/PostGateway.sol";
import {ECDSA} from "openzeppelin-contracts/utils/cryptography/ECDSA.sol";

contract PostScript is Script {
    using ECDSA for bytes32;

    PostGateway postGateway = PostGateway(0x5FbDB2315678afecb367f032d93F642f64180aa3);

    uint256 constant userId = 1;
    uint8 constant sigType = 1;
    uint16 constant version = 1;
    bytes public sig = hex"a3f20717a250c2b0b729b07ff9e6d8c0c1556334506f6c1f6f85c37b3a771fc45fb12f9e3c2322701ac7916c8b0b726f27dbeee6ab09cb3d7d44db6e8a3a3e331b";
    string public ipfsUri = "ipfs://bafkreiai2xekku6zoiwkchzgpsrjsd3z3nuotk3lzsoyo27rqymp6d3cni";

    uint256 public deployerPrivateKey;
    
    function setUp() public {}

    function run() public {
        /* Load private key */
        bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        deployerPrivateKey = uint256(privateKeyBytes);
        /* Start function transmission */
        vm.startBroadcast(deployerPrivateKey);

        // create Post with one createPublication message
        // createPublication();

        // create Channel with one createChannel message
        createChannel();        

        // add item with one addItem message
        // addItemPub();                
        // addItemNFT();

        // createPub and addItemPub
        // createPubAndAddItem();
        createPublicationAndAddItem();

        vm.stopBroadcast();
        /* End function transmission */
    }

    function createPublication() public {
        // Prep message for post        
        uint32 msgType = 110;
        uint64 expiration = uint64(block.timestamp) + 600;
        bytes memory msgBody = abi.encode(ipfsUri);        
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

    function createChannel() public {
        // Prep message for post        
        uint32 msgType = 210;
        uint64 expiration = uint64(block.timestamp) + 600;
        uint256[] memory adminIds = new uint256[](1);
        adminIds[0] = 1;
        uint256[] memory memberIds = new uint256[](2);
        memberIds[0] = 2;
        memberIds[1] = 3;
        bytes memory msgBody = abi.encode(ipfsUri, adminIds, memberIds);        
        bytes[] memory messageArray = new bytes[](1);
        messageArray[0] = abi.encodePacked(msgType, msgBody);
        // generate post signature
        bytes memory signedPost = signPost(deployerPrivateKey, version, expiration, messageArray);         
        // encode post inputs
        bytes memory postInputs = abi.encodePacked(
            userId,                             // userId
            sigType,                            // sigType
            signedPost,                                // signature
            version,                            // version
            expiration,      // expiration
            abi.encode(messageArray)            // message array
        );                 
        // call post
        postGateway.post(postInputs);
    }

    function addItemPub() public {   
        // prep message for post
        uint32 msgType = 213;
        uint64 expiration = uint64(block.timestamp) + 600;
        uint32 itemType = 1; // 1 = PUB
        int256 channelIdToTarget = 1;
        int256 pubIdToAdd = 1;
        bytes memory itemBody = abi.encode(channelIdToTarget, pubIdToAdd);
        bytes memory msgBody = abi.encode(itemType, itemBody);
        bytes[] memory messageArray = new bytes[](1);
        messageArray[0] = abi.encodePacked(msgType, msgBody);        
        // generate post signature
        bytes memory signedPost = signPost(deployerPrivateKey, version, expiration, messageArray);         
        // encode post inputs
        bytes memory postInputs = abi.encodePacked(
            userId,                             // userId
            sigType,                            // sigType
            signedPost,                                // signature
            version,                            // version
            expiration,      // expiration
            abi.encode(messageArray)            // message array
        );     
        // call post
        postGateway.post(postInputs);
    }

    function addItemNFT() public {
        // Prep message for post        
        uint32 msgType = 213;
        uint64 expiration = uint64(block.timestamp) + 600;
        uint32 itemType = 2; // 2 = NFT
        int256 channelIdToTarget = 1; 
        uint256 chainId = 420;
        address target = address(postGateway);
        bool hasId = true;
        uint256 tokenId = 1;
        bytes memory itemBody = abi.encode(channelIdToTarget, 
            chainId,
            target,
            hasId,
            tokenId
        );
        bytes memory msgBody = abi.encode(itemType, itemBody);        
        bytes[] memory messageArray = new bytes[](1);
        messageArray[0] = abi.encodePacked(msgType, msgBody);
        // generate post signature
        bytes memory signedPost = signPost(deployerPrivateKey, version, expiration, messageArray);                 
        // encode post inputs
        bytes memory postInputs = abi.encodePacked(
            userId,                             // userId
            sigType,                            // sigType
            signedPost,                                // signature
            version,                            // version
            expiration,      // expiration
            abi.encode(messageArray)            // message array
        );                 
        // call post
        postGateway.post(postInputs);
    }



    function createPublicationAndAddItem() public {
        // Prep message for post        
        uint64 expiration = uint64(block.timestamp) + 600;
        /* createPub */
        uint32 msgType1 = 110;        
        bytes memory msgBody1 = abi.encode(ipfsUri);        
        /* addItemPub */
        uint32 msgType2 = 213;
        uint32 itemType = 1; // 1 = PUB
        int256 channelIdToTarget = 1;
        int256 pubIdToAdd = -10; // -10 means grab the pub created at index 0 of this state change
        bytes memory itemBody = abi.encode(channelIdToTarget, pubIdToAdd);
        bytes memory msgBody2 = abi.encode(itemType, itemBody);
        /* setup message array */
        bytes[] memory messageArray = new bytes[](2);
        messageArray[0] = abi.encodePacked(msgType1, msgBody1);
        messageArray[1] = abi.encodePacked(msgType2, msgBody2);
        // generate post signature
        bytes memory signedPost = signPost(deployerPrivateKey, version, expiration, messageArray);            
        // encode post inputs
        bytes memory postInputs = abi.encodePacked(
            userId,                             // userId
            sigType,                            // sigType
            signedPost,                                // signature
            version,                            // version
            expiration,      // expiration
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
// forge script script/transactions/Post.s.sol:PostScript -vvvv --rpc-url $RPC_URL --broadcast --verify --verifier-url https://api-goerli-optimistic.etherscan.io/api
// forge script script/transactions/Post.s.sol:PostScript -vvvv --fork-url http://localhost:8545 --broadcast