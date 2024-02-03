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

    IdRegistry public idRegistry = IdRegistry(0xd35fF289853947472b22773E323D6239C32e1E7A);  
    DelegateRegistry public delegateRegistry = DelegateRegistry(0x45c05c7b7a5782BfB32553FecBCcCcBC36F21578);    
    ChannelRegistry public channelRegistry = ChannelRegistry(0x339513226Afd92B309837Bad402c6D3ADDE9Ad24);
    ItemRegistry public itemRegistry = ItemRegistry(0xEc341633d600Bdad8E704729AE95049DDfec6c6f);
    RoleBasedAccess public roleBasedAccess = RoleBasedAccess(0x05aD6cA9C2b3F71a6B30A8C7d414C95E10EC0217);
    StringRenderer public stringRenderer = StringRenderer(0xdc151805e5A93284e1E337Bf5B7c4060AB9BC5Be);
    NftRenderer public nftRenderer = NftRenderer(0xFFc1FA270C80104e6AC6CB5Ec31662Fe071C81bD);  
    
    function setUp() public {}

    function run() public {
        bytes32 privateKeyBytes = vm.envBytes32("PRIVATE_KEY");
        uint256 deployerPrivateKey = uint256(privateKeyBytes);
        VmSafe.Wallet memory deployerWallet = vm.createWallet(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        // register id        
        idRegistry.register(deployerWallet.addr);
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