// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {IdRegistry} from "../../src/core/IdRegistry.sol";

contract IdRegistryScript is Script {

    IdRegistry idRegistry = IdRegistry(0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512);
    
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        idRegistry.register(address(0), new bytes(0));

        vm.stopBroadcast();
    }
}

// ======= DEPLOY SCRIPTS =====

// source .env
// forge script script/transactions/IdRegistry.s.sol:IdRegistryScript -vvvv --broadcast --fork-url http://localhost:8545