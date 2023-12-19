// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {IdRegistry} from "../src/IdRegistry.sol";
import {PostGateway} from "../src/PostGateway.sol";

contract ImpSetupScript is Script {

    IdRegistry public idRegistry;    
    PostGateway public postGateway;
    
    function setUp() public {}

    function run() public {
        bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        uint256 deployerPrivateKey = uint256(privateKeyBytes);

        vm.startBroadcast(deployerPrivateKey);
                
        idRegistry = new IdRegistry();
        postGateway = new PostGateway();

        vm.stopBroadcast();
    }
}

// ======= DEPLOY SCRIPTS =====

// source .env
// forge script script/ImpSetup.s.sol:ImpSetupScript -vvvv --rpc-url $RPC_URL --broadcast --verify --verifier-url https://api-goerli-optimistic.etherscan.io/api
// forge script script/ImpSetup.s.sol:ImpSetupScript -vvvv --broadcast --fork-url http://localhost:8545


// forge script script/ImpSetup.s.sol:ImpSetupScript -vvvv --rpc-url $RPC_URL --broadcast