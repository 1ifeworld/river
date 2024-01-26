// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {IdRegistry} from "../../src/IdRegistry.sol";
import {DelegateRegistry} from "../../src/DelegateRegistry.sol";
import {ChannelRegistry} from "../../src/ChannelRegistry.sol";
import {ItemRegistry} from "../../src/ItemRegistry.sol";
import {RoleBasedAccess} from "../../src/logic/RoleBasedAccess.sol";
import {StringRenderer} from "../../src/renderer/StringRenderer.sol";
import {NftRenderer} from "../../src/renderer/NftRenderer.sol";
import {IRoles} from "../../src/interfaces/IRoles.sol";

contract FullTestScript is Script {

    IdRegistry public idRegistry = IdRegistry(0x73c68a5Cc6d6586CA5Bd2F0c6f8eC8524f33557b);  
    DelegateRegistry public delegateRegistry = DelegateRegistry(0xDc4D28a3010ad7aAfFc24c377Ebb7Cb4d32A1Ae9);    
    ChannelRegistry public channelRegistry = ChannelRegistry(0x0dE97a5bc300d20A0D629179cF678296177854E8);
    ItemRegistry public itemRegistry = ItemRegistry(0xf35776f159614B573C2Ae10F95407ed8b70D4C73);
    RoleBasedAccess public roleBasedAccess = RoleBasedAccess(0x412CAEe8a5EE5741bED459951C091f8FfaA14778);
    StringRenderer public stringRenderer = StringRenderer(0x1358b4111fbfD1929D3D47cfab2f00bF134e3918);
    NftRenderer public nftRenderer = NftRenderer(0xc71780165ecEF5ba96B71b01B2ecA1F107A0B8c4);  
    
    function setUp() public {}

    function run() public {
        bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        uint256 deployerPrivateKey = uint256(privateKeyBytes);

        vm.startBroadcast(deployerPrivateKey);

        // register id
        // idRegistry.register(address(0));
        // prep data for new channel
        uint256 userId = 1;
        uint256[] memory userIds = new uint256[](1);
        userIds[0] = userId;
        IRoles.Roles[] memory roles = new RoleBasedAccess.Roles[](1);
        roles[0] = IRoles.Roles.ADMIN;
        bytes memory logicInit = abi.encode(userIds, roles);
        // create new channel
        (bytes32 channelHash,) = channelRegistry.newChannel(
            userId,
            "ipfs://bafybeiczsscdsbs7ffqz55asqdf3smv6klcw3gofszvwlyarci47bgf354",
            address(roleBasedAccess),
            logicInit
        );
        // prep data for new item
        ItemRegistry.Init[] memory newItems = new ItemRegistry.Init[](1);
        // packs data so that [:20] == address of renderer, [20:] == bytes for renderer to decode into string
        newItems[0].data = abi.encodePacked(address(stringRenderer), bytes("ipfs://bafybeiczsscdsbs7ffqz55asqdf3smv6klcw3gofszvwlyarci47bgf354"));
        bytes32[] memory channels = new bytes32[](1);
        channels[0] = channelHash;        
        newItems[0].channels = channels;
        // new item
        itemRegistry.newItems(userId, newItems);        
        //                 
        vm.stopBroadcast();
    }
}

// ======= DEPLOY SCRIPTS =====

// source .env
// forge script script/transactions/FullTest.s.sol:FullTestScript -vvvv --rpc-url $RPC_URL --broadcast  