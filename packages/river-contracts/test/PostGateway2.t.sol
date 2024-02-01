// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test, console2} from "forge-std/Test.sol";

import {PostGateway2} from "../src/PostGateway2.sol";
import {IPostGateway2} from "../src/IPostGateway2.sol";
import {ECDSA} from "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import {SignatureChecker} from "openzeppelin-contracts/utils/cryptography/SignatureChecker.sol";
import {MessageHashUtils} from "openzeppelin-contracts/utils/cryptography/MessageHashUtils.sol";

import {PostDecoder, BytesHelper} from "./lib/PostDecoder.sol";

contract PostGateway2Test is Test {       
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;
  

    //////////////////////////////////////////////////
    // PARAMETERS
    //////////////////////////////////////////////////   

    PostGateway2 public postGateway;
    Account public relayer;
    Account public user;     

    //////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////   

    // Set-up called before each test
    function setUp() public {
        postGateway = new PostGateway2();  
        relayer = makeAccount("relayer");
        user = makeAccount("user");
    }    

    //////////////////////////////////////////////////
    // POST MESSAGE TESTS
    //////////////////////////////////////////////////  

    function test_post() public {

        /*
            CREATE Channel SETUP
        */

        // structure create channel data/access + message
        uint256[] memory admins = new uint256[](1);
        uint256[] memory members = new uint256[](2);
        admins[0] = 1;
        members[0] = 2;
        members[1] = 3;
        IPostGateway2.Channel memory createChannel = IPostGateway2.Channel({
            data: IPostGateway2.ChannelData({
                dataType: IPostGateway2.ChannelDataTypes.STRING_URI,
                contents: abi.encode("ipfs://contentsOfChannelUri")
            }),
            access: IPostGateway2.ChannelAccess({
                accessType: IPostGateway2.ChannelAccessTypes.ROLES,
                contents: abi.encode(admins, members)
            })
        });
        // structure create channel Message
        IPostGateway2.Message memory createChannelMessage = IPostGateway2.Message({
            rid: 1,
            timestamp: block.timestamp + 1,
            msgType: IPostGateway2.MessageTypes.CREATE_CHANNEL,
            contents: abi.encode(createChannel)
        });
        // create hash + sig for post
        bytes32 createChannelHash = keccak256(abi.encode(createChannelMessage)).toEthSignedMessageHash();
        bytes memory createChannelSig = signMessage(user.key, createChannelMessage);
        // structure create item Post
        IPostGateway2.Post memory createChannelPost = IPostGateway2.Post({
            signer: user.addr,
            message: createChannelMessage,
            hashType: 1,
            hash: createChannelHash, 
            sigType: 1,
            sig: createChannelSig
        });
        // process post 
        postGateway.post(createChannelPost);
        // run sig test
        assertEq(SignatureChecker.isValidSignatureNow(user.addr, createChannelHash, createChannelSig), true);             
    }

    // initial example is creating an item + posting it to a channel
    function test_batchPost() public {
        vm.startPrank(relayer.addr);

        /*
            CREATE ITEM SETUP
        */

        // structure create item data/access + message
        uint256[] memory admins = new uint256[](1);
        admins[0] = 1;
        IPostGateway2.Item memory createItem = IPostGateway2.Item({
            data: IPostGateway2.ItemData({
                dataType: IPostGateway2.ItemDataTypes.STRING_URI,
                contents: abi.encode("ipfs://contentsOf")
            }),
            access: IPostGateway2.ItemAccess({
                accessType: IPostGateway2.ItemAccessTypes.ADMINS,
                contents: abi.encode(admins)
            })
        });
        // structure create item Message
        IPostGateway2.Message memory createItemMessage = IPostGateway2.Message({
            rid: 1,
            timestamp: block.timestamp + 1,
            msgType: IPostGateway2.MessageTypes.CREATE_ITEM,
            contents: abi.encode(createItem)
        });
        // create hash + sig for post
        bytes32 createItemHash = keccak256(abi.encode(createItemMessage)).toEthSignedMessageHash();
        bytes memory createItemSig = signMessage(user.key, createItemMessage);
        // structure create item Post
        IPostGateway2.Post memory createItemPost = IPostGateway2.Post({
            signer: user.addr,
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
            itemCid: "ipfs://itemPlaceholder",
            channelCid: "ipfs://channelPlaceholder"
        });
        // structure add item Message
        IPostGateway2.Message memory addItemMessage = IPostGateway2.Message({
            rid: 1,
            timestamp: block.timestamp + 1,
            msgType: IPostGateway2.MessageTypes.ADD_ITEM_TO_CHANNEL,
            contents: abi.encode(addItem)
        });
        // create hash + sig for post
        bytes32 addItemHash = keccak256(abi.encode(addItemMessage)).toEthSignedMessageHash();
        bytes memory addItemSig = signMessage(user.key, addItemMessage);
        // structure add item Post
        IPostGateway2.Post memory addItemPost = IPostGateway2.Post({
            signer: user.addr,
            message: addItemMessage,
            hashType: 1,
            hash: addItemHash, 
            sigType: 1,
            sig: addItemSig
        });
        //  setup batch post
        IPostGateway2.Post[] memory batchPostInputs = new IPostGateway2.Post[](2);
        batchPostInputs[0] = createItemPost;
        batchPostInputs[1] = addItemPost;
        // process post 
        postGateway.postBatch(batchPostInputs);
        // run sig test
        assertEq(SignatureChecker.isValidSignatureNow(user.addr, createItemHash, createItemSig), true);         
        assertEq(SignatureChecker.isValidSignatureNow(user.addr, addItemHash, addItemSig), true);         
    }

    //////////////////////////////////////////////////
    // HELPERS
    //////////////////////////////////////////////////  


    function _sign(uint256 privateKey, bytes32 digest) internal returns (bytes memory sig) {
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
        sig = abi.encodePacked(r, s, v);
        assertEq(sig.length, 65);
    }  

    function signMessage(
        uint256 privateKey, 
        IPostGateway2.Message memory message
    ) public returns (bytes memory signedMessage) {
        bytes32 hash = keccak256(abi.encode(message)).toEthSignedMessageHash();
        signedMessage = _sign(privateKey, hash);
    }         
}