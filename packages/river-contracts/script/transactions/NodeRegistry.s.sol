// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {NodeRegistry} from "imp/NodeRegistry.sol";

contract NodeRegistryScript is Script {

    NodeRegistry nodeRegistry = NodeRegistry(0xF26F07040922992DF06091235A50872e31C85Ab8);
    uint256 constant MOCK_USER_ID = 1;
    bytes32 constant PUB_SCHEMA = 0xF36F2F0432F99EA34A360F154CEA9D1FAD45C7319E27ADED55CC0D28D0924068;
    bytes32 constant CHANNEL_SCHEMA = 0x08B83A3AFF9950D7F88522AC4A172BD8405BE30B0D3B416D42FD73C30AC27C9F;
    
    function setUp() public {}

    function run() public {
        /* Load private key */
        bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        uint256 deployerPrivateKey = uint256(privateKeyBytes);
        /* Start function transmission */
        vm.startBroadcast(deployerPrivateKey);

        // registerPubNode();

        // updatePubNode();

        // registerChannelNode();

        updateChannelNode();

        vm.stopBroadcast();
        /* End function transmission */
    }


    // PUBLICATION HELPERS

    function registerPubNode() public {
        // prep register publication message data
        bytes[] memory messages = new bytes[](2);
        uint256[] memory admins = new uint256[](1);
        admins[0] = 1;
        uint256[] memory members = new uint256[](2);
        members[0] = 2;
        members[1] = 3;
        messages[0] = abi.encode(101, abi.encode(admins, members));
        messages[1] = abi.encode(201, abi.encode("yourIpfsStringHere"));
        nodeRegistry.register(MOCK_USER_ID, PUB_SCHEMA, messages);
    }

    function updatePubNode() public {
        // prep update publication -- set Uri message data
        bytes[] memory messages = new bytes[](1);
        messages[0] = abi.encode(201, abi.encode("newIpfsString"));
        nodeRegistry.update(MOCK_USER_ID, 5, messages);
    }

    // CHANNEL HELPERS

    function registerChannelNode() public {
        // prep register channel + add first item message data
        bytes[] memory messages = new bytes[](3);
        uint256[] memory admins = new uint256[](1);
        admins[0] = 1;
        uint256[] memory members = new uint256[](2);
        members[0] = 2;
        members[1] = 3;
        messages[0] = abi.encode(101, abi.encode(admins, members));
        messages[1] = abi.encode(301, abi.encode("channelIpfsUri"));        
        messages[2] = abi.encode(302, abi.encode(
            10,                     // chainId
            4,                      // id
            address(nodeRegistry),  // pointer
            true                    // hasId
        ));      
        nodeRegistry.register(MOCK_USER_ID, CHANNEL_SCHEMA, messages);
    }    

    function updateChannelNode() public {
        // prep update channel -- add new item message data
        bytes[] memory messages = new bytes[](1);
        messages[0] = abi.encode(302, abi.encode(
            18,                     // chainId
            9,                      // id
            address(nodeRegistry),  // pointer
            true                    // hasId
        ));      
        // userId, nodeId, messages
        nodeRegistry.update(MOCK_USER_ID, 9, messages);
    }    
}

// ======= DEPLOY SCRIPTS =====

// source .env
// forge script script/transactions/NodeRegistry.s.sol:NodeRegistryScript -vvvv --rpc-url $RPC_URL --broadcast