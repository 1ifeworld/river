// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {IdRegistry} from "../src/IdRegistry.sol";
import {DelegateRegistry} from "../src/DelegateRegistry.sol";
import {ChannelRegistry} from "../src/ChannelRegistry.sol";
import {ItemRegistry} from "../src/ItemRegistry.sol";
import {RoleBasedAccess} from "../src/logic/RoleBasedAccess.sol";
import {StringRenderer} from "../src/renderer/StringRenderer.sol";
import {NftRenderer} from "../src/renderer/NftRenderer.sol";

contract RiverSetupScript is Script {

    IdRegistry public idRegistry = IdRegistry(0x73c68a5Cc6d6586CA5Bd2F0c6f8eC8524f33557b);
    DelegateRegistry public delegateRegistry = DelegateRegistry(0xDc4D28a3010ad7aAfFc24c377Ebb7Cb4d32A1Ae9);
    ChannelRegistry public channelRegistry;
    ItemRegistry public itemRegistry;
    RoleBasedAccess public roleBasedAccess;
    StringRenderer public stringRenderer;
    NftRenderer public nftRenderer;

    function setUp() public {}

    function run() public {
        bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        uint256 deployerPrivateKey = uint256(privateKeyBytes);
        VmSafe.Wallet memory deployerWallet = vm.createWallet(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);
        
        idRegistry = new IdRegistry(deployerWallet.addr);  
        delegateRegistry = new DelegateRegistry(address(idRegistry));          
        channelRegistry = new ChannelRegistry(address(idRegistry), address(delegateRegistry));  
        itemRegistry = new ItemRegistry(address(idRegistry), address(delegateRegistry), address(channelRegistry));  
        roleBasedAccess = new RoleBasedAccess(address(idRegistry), address(delegateRegistry));  
        stringRenderer = new StringRenderer();  
        nftRenderer = new NftRenderer();      

        vm.stopBroadcast();
    }
}

// ======= DEPLOY SCRIPTS =====

// source .env

// forge script script/RiverSetupScript.s.sol:RiverSetupScript -vvvv --broadcast --fork-url http://localhost:8545
// forge script script/RiverSetupScript.s.sol:RiverSetupScript -vvvv --rpc-url $RPC_URL --broadcast --verify --verifier blockscout --verifier-url https://explorerl2new-river-j5bpjduqfv.t.conduit.xyz/api\?
// forge script script/RiverSetupScript.s.sol:RiverSetupScript -vvvv --rpc-url $RPC_URL --broadcast  
                                                           
// forge verify-contract 0x412CAEe8a5EE5741bED459951C091f8FfaA14778 src/logic/RoleBasedAccess.sol:RoleBasedAccess --verifier blockscout --verifier-url https://explorerl2new-river-j5bpjduqfv.t.conduit.xyz/api\?