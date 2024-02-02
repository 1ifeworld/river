// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {PostGateway2} from "../../src/PostGateway2.sol";
import {IPostGateway2} from "../../src/IPostGateway2.sol";
import {ECDSA} from "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import {SignatureChecker} from "openzeppelin-contracts/utils/cryptography/SignatureChecker.sol";
import {MessageHashUtils} from "openzeppelin-contracts/utils/cryptography/MessageHashUtils.sol";

contract NewPostScript is Script {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    // PostGateway2 postGateway = PostGateway2(0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0); // anvil
    PostGateway2 postGateway = PostGateway2(0x05aD6cA9C2b3F71a6B30A8C7d414C95E10EC0217); // arb nova
    
    Account public relayer;
    Account public user;    
    uint256 public deployerPrivateKey;
    VmSafe.Wallet public deployerWallet;
    
    function setUp() public {
        relayer = makeAccount("relayer");
        user = makeAccount("user");              
    }

    function run() public {
        /* Load private key */
        bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        deployerPrivateKey = uint256(privateKeyBytes);
        deployerWallet = vm.createWallet(deployerPrivateKey);
        /* Start function transmission */
        vm.startBroadcast(deployerPrivateKey);

        // createChannel();        
        createItemAndAddToChannel();
        // editChannelAccess_AddAdmin();
        // editChannelAccess_RemoveAdmin();
        // editChannelAccess_AddMember();
        // editChannelAccess_RemoveMember();

        // createPublication();        
        // referencePublication();

        // removeReference();

        vm.stopBroadcast();
        /* End function transmission */
    }

    function createChannel() public {
        // structure init + data + message
        uint256[] memory admins = new uint256[](1);
        uint256[] memory members = new uint256[](0);
        admins[0] = 1;
        // members[0] = 2;
        // members[1] = 3;
        IPostGateway2.Channel memory channel = IPostGateway2.Channel({
            data: IPostGateway2.ChannelData({
                dataType: IPostGateway2.ChannelDataTypes.STRING_URI,
                contents: abi.encode("omRuYW1la2NoYW5uZWxOYW1la2Rlc2NyaXB0aW9ucmNoYW5uZWxEZXNjcmlwdGlvbg")
            }),
            access: IPostGateway2.ChannelAccess({
                accessType: IPostGateway2.ChannelAccessTypes.ROLES,
                contents: abi.encode(admins, members)
            })
        });
        bytes memory encodedChannel = abi.encode(channel);
        // structure Message
        IPostGateway2.Message memory message = IPostGateway2.Message({
            rid: 1,
            timestamp: 1706853740,
            msgType: IPostGateway2.MessageTypes.CREATE_CHANNEL, // create/init id
            msgBody: encodedChannel
        });
        // create hash + sig for post
        (bytes32 createChannelHash, bytes memory createChannelSig) = signMessage(deployerPrivateKey, message);
        // structure Post
        IPostGateway2.Post memory post = IPostGateway2.Post({
            signer: deployerWallet.addr,
            message: message,
            hashType: 1,
            hash: createChannelHash, 
            sigType: 1,
            sig: createChannelSig
        });
        // console2.logBytes(post);
        // process post 
        postGateway.post(post);
    
    }

    function createItemAndAddToChannel() public {

        /*
            CREATE ITEM SETUP
        */

        // structure create item data/access + message
        uint256[] memory admins = new uint256[](1);
        admins[0] = 1;
        IPostGateway2.Item memory createItem = IPostGateway2.Item({
            data: IPostGateway2.ItemData({
                dataType: IPostGateway2.ItemDataTypes.STRING_URI,
                contents: abi.encode("bafkreig6fmbdm7cacbislqditpxjkhadzdlcuwr3ujqhsj4e7hjrbxxnaa")
            }),
            access: IPostGateway2.ItemAccess({
                accessType: IPostGateway2.ItemAccessTypes.ADMINS,
                contents: abi.encode(admins)
            })
        });
        // structure create item Message
        IPostGateway2.Message memory createItemMessage = IPostGateway2.Message({
            rid: 1,
            timestamp: 1706853940,
            msgType: IPostGateway2.MessageTypes.CREATE_ITEM,
            msgBody: abi.encode(createItem)
        });
        // create hash + sig for post
        (bytes32 createItemHash, bytes memory createItemSig) = signMessage(deployerPrivateKey, createItemMessage);
        // structure create item Post
        IPostGateway2.Post memory createItemPost = IPostGateway2.Post({
            signer: deployerWallet.addr,
            message: createItemMessage,
            hashType: 1,
            hash: createItemHash, 
            sigType: 1,
            sig: createItemSig
        });

        /*
            ADD ITEM SETUP
        */

        // structure ADD_ITEM_TO_CHANNEL  data/access + message
        IPostGateway2.AddItem memory addItem = IPostGateway2.AddItem({
            itemCid: "bafyreig36f4vknxpfqtli3hegy24a4z56zehylfpbdbr74zgi645uw6xua",
            channelCid: "bafyreiajeyzvo3vc3zgonbguqapeiz2o662w5al6av5ror6g2yvhafrn4m"
        });
        // structure add item Message
        IPostGateway2.Message memory addItemMessage = IPostGateway2.Message({
            rid: 1,
            timestamp: 1706853940,
            msgType: IPostGateway2.MessageTypes.ADD_ITEM_TO_CHANNEL,
            msgBody: abi.encode(addItem)
        });
        // create hash + sig for post
        (bytes32 addItemHash, bytes memory addItemSig) = signMessage(deployerPrivateKey, addItemMessage);
        // structure add item Post
        IPostGateway2.Post memory addItemPost = IPostGateway2.Post({
            signer: deployerWallet.addr,
            message: addItemMessage,
            hashType: 1,
            hash: addItemHash, 
            sigType: 1,
            sig: addItemSig
        });
        //  setup batch post
        IPostGateway2.Post[] memory batchPostInputs = new IPostGateway2.Post[](1);
        // batchPostInputs[0] = createItemPost;
        batchPostInputs[0] = addItemPost;
        // process batch post 
        postGateway.postBatch(batchPostInputs);
    }

    // function createChannel() public {
    //     // Prep message for post        
    //     uint32 msgType = 100;
    //     uint64 expiration = uint64(block.timestamp) + 600;
    //     uint256[] memory adminIds = new uint256[](1);
    //     adminIds[0] = 2;
    //     uint256[] memory memberIds = new uint256[](2);
    //     memberIds[0] = 100;
    //     memberIds[1] = 101;
    //     uint256[] memory channelTags = new uint256[](0);
    //     // uint256[] memory channelTags = new uint256[](1);
    //     // channelTags[0] = 1;
    //     bytes memory msgBody = abi.encode(ipfsUri, adminIds, memberIds, channelTags);        
    //     bytes[] memory messageArray = new bytes[](1);
    //     messageArray[0] = abi.encodePacked(msgType, msgBody);
    //     // generate post signature
    //     (bytes32 hash, bytes memory signedPost) = signPost(deployerPrivateKey, version, expiration, messageArray);         
    //     // encode post inputs
    //     bytes memory postInputs = abi.encodePacked(
    //         userId,                             // userId
    //         hashType,                           // userId
    //         hash,                               // userId
    //         sigType,                            // sigType
    //         signedPost,                         // signature
    //         version,                            // version
    //         expiration,                         // expiration
    //         abi.encode(messageArray)            // message array
    //     );                             
    //     // call post
    //     postGateway.post(postInputs);
    // }

    // function referenceChannel() public {
    //     // Prep message for post        
    //     uint32 msgType = 101;
    //     uint64 expiration = uint64(block.timestamp) + 600;
    //     uint256 targetChannel = 5;
    //     uint256[] memory channelTags = new uint256[](1);
    //     channelTags[0] = 1;
    //     bytes memory msgBody = abi.encode(targetChannel, channelTags);        
    //     bytes[] memory messageArray = new bytes[](1);
    //     messageArray[0] = abi.encodePacked(msgType, msgBody);
    //     // generate post signature
    //     (bytes32 hash, bytes memory signedPost) = signPost(deployerPrivateKey, version, expiration, messageArray);         
    //     // encode post inputs
    //     bytes memory postInputs = abi.encodePacked(
    //         userId,                             // userId
    //         hashType,                           // hashType
    //         hash,                               // hash
    //         sigType,                            // sigType
    //         signedPost,                         // signature
    //         version,                            // version
    //         expiration,                         // expiration
    //         abi.encode(messageArray)            // message array
    //     );                             
    //     // call post
    //     postGateway.post(postInputs);        
    // }

    // function editChannelAccess_AddAdmin() public {
    //     // Prep message for post        
    //     uint32 msgType = 103;
    //     uint64 expiration = uint64(block.timestamp) + 600;
    //     uint256 targetChannel = 1;
    //     int256[] memory admins = new int256[](1);
    //     admins[0] = 1;
    //     int256[] memory members = new int256[](0);
    //     bytes memory msgBody = abi.encode(targetChannel, admins, members);        
    //     bytes[] memory messageArray = new bytes[](1);
    //     messageArray[0] = abi.encodePacked(msgType, msgBody);
    //     // generate post signature
    //     (bytes32 hash, bytes memory signedPost) = signPost(deployerPrivateKey, version, expiration, messageArray);         
    //     // encode post inputs
    //     bytes memory postInputs = abi.encodePacked(
    //         userId,                             // userId
    //         hashType,                           // hashType
    //         hash,                               // hash
    //         sigType,                            // sigType
    //         signedPost,                         // signature
    //         version,                            // version
    //         expiration,                         // expiration
    //         abi.encode(messageArray)            // message array
    //     );                             
    //     // call post
    //     postGateway.post(postInputs);        
    // }    

    // function editChannelAccess_RemoveAdmin() public {
    //     // Prep message for post        
    //     uint32 msgType = 103;
    //     uint64 expiration = uint64(block.timestamp) + 600;
    //     uint256 targetChannel = 1;
    //     int256[] memory admins = new int256[](1);
    //     admins[0] = -1;
    //     int256[] memory members = new int256[](0);
    //     bytes memory msgBody = abi.encode(targetChannel, admins, members);        
    //     bytes[] memory messageArray = new bytes[](1);
    //     messageArray[0] = abi.encodePacked(msgType, msgBody);
    //     // generate post signature
    //     (bytes32 hash, bytes memory signedPost) = signPost(deployerPrivateKey, version, expiration, messageArray);         
    //     // encode post inputs
    //     bytes memory postInputs = abi.encodePacked(
    //         userId,                             // userId
    //         hashType,                           // hashType
    //         hash,                               // hash
    //         sigType,                            // sigType
    //         signedPost,                         // signature
    //         version,                            // version
    //         expiration,                         // expiration
    //         abi.encode(messageArray)            // message array
    //     );                             
    //     // call post
    //     postGateway.post(postInputs);        
    // }        

    // function editChannelAccess_AddMember() public {
    //     // Prep message for post        
    //     uint32 msgType = 103;
    //     uint64 expiration = uint64(block.timestamp) + 600;
    //     uint256 targetChannel = 3;
    //     int256[] memory admins = new int256[](0);
    //     int256[] memory members = new int256[](1);
    //     members[0] = 1;
    //     bytes memory msgBody = abi.encode(targetChannel, admins, members);        
    //     bytes[] memory messageArray = new bytes[](1);
    //     messageArray[0] = abi.encodePacked(msgType, msgBody);
    //     // generate post signature
    //     (bytes32 hash, bytes memory signedPost) = signPost(deployerPrivateKey, version, expiration, messageArray);         
    //     // encode post inputs
    //     bytes memory postInputs = abi.encodePacked(
    //         userId,                             // userId
    //         hashType,                           // hashType
    //         hash,                               // hash
    //         sigType,                            // sigType
    //         signedPost,                         // signature
    //         version,                            // version
    //         expiration,                         // expiration
    //         abi.encode(messageArray)            // message array
    //     );                             
    //     // call post
    //     postGateway.post(postInputs);        
    // }    

    // function editChannelAccess_RemoveMember() public {
    //     // Prep message for post        
    //     uint32 msgType = 103;
    //     uint64 expiration = uint64(block.timestamp) + 600;
    //     uint256 targetChannel = 3;
    //     int256[] memory admins = new int256[](0);
    //     int256[] memory members = new int256[](1);
    //     members[0] = -1;
    //     bytes memory msgBody = abi.encode(targetChannel, admins, members);        
    //     bytes[] memory messageArray = new bytes[](1);
    //     messageArray[0] = abi.encodePacked(msgType, msgBody);
    //     // generate post signature
    //     (bytes32 hash, bytes memory signedPost) = signPost(deployerPrivateKey, version, expiration, messageArray);         
    //     // encode post inputs
    //     bytes memory postInputs = abi.encodePacked(
    //         userId,                             // userId
    //         hashType,                           // hashType
    //         hash,                               // hash
    //         sigType,                            // sigType
    //         signedPost,                         // signature
    //         version,                            // version
    //         expiration,                         // expiration
    //         abi.encode(messageArray)            // message array
    //     );                             
    //     // call post
    //     postGateway.post(postInputs);        
    // }    


    // function createPublication() public {
    //     // Prep message for post        
    //     uint32 msgType = 200;
    //     uint64 expiration = uint64(block.timestamp) + 600;        
    //     uint256[] memory channelTags = new uint256[](1);
    //     channelTags[0] = 1;
    //     bytes memory msgBody = abi.encode(ipfsUri, channelTags);        
    //     bytes[] memory messageArray = new bytes[](1);
    //     messageArray[0] = abi.encodePacked(msgType, msgBody);
    //     // generate post signature
    //     (bytes32 hash, bytes memory signedPost) = signPost(deployerPrivateKey, version, expiration, messageArray);         
    //     // encode post inputs
    //     bytes memory postInputs = abi.encodePacked(
    //         userId,                             // userId
    //         hashType,                           // userId
    //         hash,                             // userId
    //         sigType,                            // sigType
    //         signedPost,                         // signature
    //         version,                            // version
    //         expiration,                         // expiration
    //         abi.encode(messageArray)            // message array
    //     );                             
    //     // call post
    //     postGateway.post(postInputs);
    // }

    // function referencePublication() public {
    //     // Prep message for post        
    //     uint32 msgType = 201;
    //     uint64 expiration = uint64(block.timestamp) + 600;        
    //     uint256 targetPub = 1;
    //     uint256[] memory channelTags = new uint256[](1);
    //     channelTags[0] = 5;
    //     bytes memory msgBody = abi.encode(targetPub, channelTags);        
    //     bytes[] memory messageArray = new bytes[](1);
    //     messageArray[0] = abi.encodePacked(msgType, msgBody);
    //     // generate post signature
    //     (bytes32 hash, bytes memory signedPost) = signPost(deployerPrivateKey, version, expiration, messageArray);         
    //     // encode post inputs
    //     bytes memory postInputs = abi.encodePacked(
    //         userId,                             // userId
    //         hashType,                           // userId
    //         hash,                             // userId
    //         sigType,                            // sigType
    //         signedPost,                         // signature
    //         version,                            // version
    //         expiration,                         // expiration
    //         abi.encode(messageArray)            // message array
    //     );                             
    //     // call post
    //     postGateway.post(postInputs);
    // }    

    // function removeReference() public {
    //     // Prep message for post        
    //     uint32 msgType = 500;
    //     uint64 expiration = uint64(block.timestamp) + 600;        
    //     uint256 channelId = 1;
    //     uint256 referenceId = 1;
    //     bytes memory msgBody = abi.encode(channelId, referenceId);        
    //     bytes[] memory messageArray = new bytes[](1);
    //     messageArray[0] = abi.encodePacked(msgType, msgBody);
    //     // generate post signature
    //     (bytes32 hash, bytes memory signedPost) = signPost(deployerPrivateKey, version, expiration, messageArray);         
    //     // encode post inputs
    //     bytes memory postInputs = abi.encodePacked(
    //         userId,                             // userId
    //         hashType,                           // userId
    //         hash,                             // userId
    //         sigType,                            // sigType
    //         signedPost,                         // signature
    //         version,                            // version
    //         expiration,                         // expiration
    //         abi.encode(messageArray)            // message array
    //     );                 
    //     // call post
    //     postGateway.post(postInputs);
    // }       

    //////////////////////////////////////////////////
    // HELPERS
    //////////////////////////////////////////////////  


    function _sign(uint256 privateKey, bytes32 digest) internal pure returns (bytes memory sig) {
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
        sig = abi.encodePacked(r, s, v);
    }  

    function signMessage(
        uint256 privateKey, 
        PostGateway2.Message memory message
    ) public pure returns (bytes32 hash, bytes memory signedMessage) {
        hash = keccak256(abi.encode(message)).toEthSignedMessageHash();
        signedMessage = _sign(privateKey, hash);
    }           
}

// ======= DEPLOY SCRIPTS =====

// source .env
// forge script script/transactions/NewPost.s.sol:NewPostScript -vvvv --fork-url http://localhost:8545 --broadcast
// forge script script/transactions/NewPost.s.sol:NewPostScript -vvvv --rpc-url $RPC_URL --gas-estimate-multiplier 200 --broadcast