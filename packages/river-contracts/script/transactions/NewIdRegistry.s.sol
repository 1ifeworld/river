// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {IdRegistry} from "river-contracts/IdRegistry.sol";

contract IdRegistryScript is Script {

    IdRegistry public idRegistry = IdRegistry(0x5FbDB2315678afecb367f032d93F642f64180aa3);  
    
    function setUp() public {}

    function run() public {
        bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        uint256 deployerPrivateKey = uint256(privateKeyBytes);
        VmSafe.Wallet memory deployerWallet = vm.createWallet(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        // register id        
        idRegistry.register(deployerWallet.addr);
        vm.stopBroadcast();
    }
}

// ======= DEPLOY SCRIPTS =====

// source .env
// forge script script/transactions/NewIdRegistry.s.sol:IdRegistryScript -vvvv --fork-url http://localhost:8545 --broadcast

// forge script script/transactions/NewIdRegistry.s.sol:IdRegistryScript -vvvv --rpc-url $RPC_URL --broadcast  