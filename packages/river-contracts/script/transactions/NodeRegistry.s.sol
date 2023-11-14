// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {NodeRegistry} from "imp/NodeRegistry.sol";

contract NodeRegistryScript is Script {
    NodeRegistry nodeRegistry =
        NodeRegistry(0x5FbDB2315678afecb367f032d93F642f64180aa3);
    bytes32 constant PUB_SCHEMA =
        0xF36F2F0432F99EA34A360F154CEA9D1FAD45C7319E27ADED55CC0D28D0924068;
    bytes32 constant CHANNEL_SCHEMA =
        0x08B83A3AFF9950D7F88522AC4A172BD8405BE30B0D3B416D42FD73C30AC27C9F;

    uint256 private nonce = 0; // Unique data modifier

    function setUp() public {}

    function run() public {
        bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        uint256 deployerPrivateKey = uint256(privateKeyBytes);
        vm.startBroadcast(deployerPrivateKey);

        recursiveOperation(1000);

        vm.stopBroadcast();
    }

    function recursiveOperation(uint256 num_ops) internal {

        for (uint256 i; i < num_ops; i++) {
            registerPubNode();
            // updatePubNode();
            // registerChannelNode();
            // updateChannelNode();
        }
    }

    // Random number generator for MOCK_USER_ID
    function random() internal view returns (uint256) {
        return
            (uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, block.number, msg.sender)
                )
            ) % 10) + 1;
    }

    // PUBLICATION HELPERS

    function registerPubNode() public {
        uint256 mockUserId = random(); // Randomly generated user ID

        bytes[] memory messages = new bytes[](2);
        uint256[] memory admins = new uint256[](1);
        admins[0] = 1;
        uint256[] memory members = new uint256[](2);
        members[0] = 2;
        members[1] = 3;
        messages[0] = abi.encode(101, abi.encode(admins, members));
        messages[1] = abi.encode(201, abi.encode("yourIpfsStringHere"));
        nodeRegistry.register(mockUserId, PUB_SCHEMA, messages);
    }

    function updatePubNode() public {
        uint256 mockUserId = random();
        bytes[] memory messages = new bytes[](1);
        messages[0] = abi.encode(201, abi.encode("newIpfsString"));
        nodeRegistry.update(mockUserId, nonce, messages);
    }

    // CHANNEL HELPERS

    function registerChannelNode() public {
        uint256 mockUserId = random();

        bytes[] memory messages = new bytes[](3);
        uint256[] memory admins = new uint256[](1);
        admins[0] = 1;
        uint256[] memory members = new uint256[](2);
        members[0] = 2;
        members[1] = 3;
        messages[0] = abi.encode(101, abi.encode(admins, members));
        messages[1] = abi.encode(301, abi.encode("channelIpfsUri"));
        messages[2] = abi.encode(
            302,
            abi.encode(
                10, // chainId
                nonce, // id using nonce for uniqueness
                address(nodeRegistry), // pointer
                true // hasId
            )
        );
        nodeRegistry.register(mockUserId, CHANNEL_SCHEMA, messages);
    }

    function updateChannelNode() public {
        uint256 mockUserId = random(); // Randomly generated user ID

        bytes[] memory messages = new bytes[](1);
        messages[0] = abi.encode(
            302,
            abi.encode(
                18, // chainId
                nonce, // id using nonce
                address(nodeRegistry), // pointer
                true // hasId
            )
        );
        nodeRegistry.update(mockUserId, nonce, messages);
    }
}

// ======= DEPLOY SCRIPTS =====

// source .env
// forge script script/transactions/NodeRegistry.s.sol:NodeRegistryScript -vvvv --rpc-url $RPC_URL --broadcast
