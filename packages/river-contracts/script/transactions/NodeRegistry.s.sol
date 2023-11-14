// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {NodeRegistry} from "imp/NodeRegistry.sol";

contract NodeRegistryScript is Script {

    NodeRegistry nodeRegistry = NodeRegistry(0xF26F07040922992DF06091235A50872e31C85Ab8);
    uint256 constant MOCK_USER_ID = 1;
    bytes32 constant PUB_SCHEMA = 0xF36F2F0432F99EA34A360F154CEA9D1FAD45C7319E27ADED55CC0D28D0924068;
    
    function setUp() public {}

    function run() public {
        bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        uint256 deployerPrivateKey = uint256(privateKeyBytes);

        vm.startBroadcast(deployerPrivateKey);

        // prep message data
        bytes[] memory messages = new bytes[](2);
        uint256[] memory admins = new uint256[](1);
        admins[0] = 1;
        uint256[] memory members = new uint256[](2);
        members[0] = 2;
        members[1] = 3;
        messages[0] = abi.encode(101, abi.encode(admins, members));
        messages[1] = abi.encode(201, abi.encode("yourIpfsStringHere"));

        nodeRegistry.register(MOCK_USER_ID, PUB_SCHEMA, messages);

        vm.stopBroadcast();
    }
}

// ======= DEPLOY SCRIPTS =====

// source .env
// forge script script/transactions/NodeRegistry.s.sol:NodeRegistryScript -vvvv --rpc-url $RPC_URL --broadcast