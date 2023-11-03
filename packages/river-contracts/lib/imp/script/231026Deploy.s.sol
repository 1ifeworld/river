// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {IdRegistry} from "../src/core/IdRegistry.sol";
import {NodeRegistry} from "../src/core/NodeRegistry.sol";
import {DelegateRegistry} from "../src/core/DelegateRegistry.sol";
import {RiverValidatorV1} from "../src/validators/RiverValidatorV1.sol";

import {LightAccount} from "light-account/src/LightAccount.sol";
import {LightAccountFactory} from "light-account/src/LightAccountFactory.sol";

import {IEntryPoint} from "light-account/lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";


contract DeployCore is Script {

    IdRegistry idRegistry;
    NodeRegistry nodeRegistry;
    DelegateRegistry delegateRegistry;
    RiverValidatorV1 riverValidator;
    address operator = 0x004991c3bbcF3dd0596292C80351798965070D75;

    // LightAccount lightAccount;
    // LightAccountFactory lightAccountFactory;
    // IEntryPoint entryPoint = IEntryPoint(0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789);
    // address initialOwner = 0x806164c929Ad3A6f4bd70c2370b3Ef36c64dEaa8;
    // uint256 salt = 1234;
    
    function setUp() public {}

    function run() public {
        // NEW (?)
        // bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        // uint256 deployerPrivateKey = uint256(privateKeyBytes);
        // Current        
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        nodeRegistry = new NodeRegistry();
        // idRegistry = new IdRegistry();
        // delegateRegistry = new DelegateRegistry(address(idRegistry));
        // riverValidator = new RiverValidatorV1(operator);

        // lightAccountFactory = new LightAccountFactory(entryPoint);
        // lightAccountFactory.createAccount(initialOwner, 1234);

        vm.stopBroadcast();
    }
}

// ======= DEPLOY SCRIPTS =====

// source .env
// forge script script/231026Deploy.s.sol:DeployCore -vvvv --rpc-url $RPC_URL --broadcast --verify --verifier-url https://api-goerli-optimistic.etherscan.io/api
// forge script script/231026Deploy.s.sol:DeployCore -vvvv --broadcast --fork-url http://localhost:8545