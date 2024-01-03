// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {IdRegistry} from "imp/IdRegistry.sol";
import {PostGateway} from "imp/PostGateway.sol";

contract ImpSetupScript is Script {

    IdRegistry public idRegistry;    
    PostGateway public postGateway;
    
    function setUp() public {}

    function run() public {
        bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        uint256 deployerPrivateKey = uint256(privateKeyBytes);

        vm.startBroadcast(deployerPrivateKey);
        
        postGateway = new PostGateway();
        idRegistry = new IdRegistry();        

        vm.stopBroadcast();
    }
}

// ======= DEPLOY SCRIPTS =====

// source .env
// forge script script/ImpSetup.s.sol:ImpSetupScript -vvvv --rpc-url $RPC_URL --broadcast --verify --verifier-url https://api-goerli-optimistic.etherscan.io/api
// forge script script/ImpSetup.s.sol:ImpSetupScript -vvvv --rpc-url $RPC_URL --broadcast --verify --verifier-url https://api-optimistic.etherscan.io/api
// forge script script/ImpSetup.s.sol:ImpSetupScript -vvvv --rpc-url $RPC_URL --broadcast --verify --verifier-url https://api.arbiscan.io/api
// forge script script/ImpSetup.s.sol:ImpSetupScript -vvvv --rpc-url $RPC_URL --broadcast --verify --verifier-url https://api-goerli.arbiscan.io/api
// forge script script/ImpSetup.s.sol:ImpSetupScript -vvvv --rpc-url $RPC_URL --broadcast --gas-estimate-multiplier 200 --verify --verifier-url https://api-nova.arbiscan.io/api
// forge script script/ImpSetup.s.sol:ImpSetupScript -vvvv --broadcast --fork-url http://localhost:8545

// forge script script/ImpSetup.s.sol:ImpSetupScript -vvvv --rpc-url $RPC_URL --broadcast --verify --verifier blockscout --verifier-url https://explorer-river_j5bpjduqfv.t.conduit.xyz/api\?
// forge script script/ImpSetup.s.sol:ImpSetupScript -vvvv --rpc-url $RPC_URL --broadcast  

// forge verify-contract 0xF26F07040922992DF06091235A50872e31C85Ab8 IdRegistry --verifier blockscout --verifier-url https://explorer-river_j5bpjduqfv.t.conduit.xyz/api

// forge verify-contract <address> src/MyToken.sol:MyToken--verifier=blockscout --verifier-url=https://explorer-[your_network_id].t.conduit.xyz/api\?

// forge verify-contract <address> <contract> --verifier=blockscout --verifier-url 

// forge verify-contract \
//     --chain-id 11155111 \
//     --num-of-optimizations 1000000 \
//     --watch \
//     --constructor-args $(cast abi-encode "constructor(string,string,uint256,uint256)" "ForgeUSD" "FUSD" 18 1000000000000000000000) \
//     --etherscan-api-key <your_etherscan_api_key> \
//     --compiler-version v0.8.10+commit.fc410830 \
//     <the_contract_address> \
//     src/MyToken.sol:MyToken 