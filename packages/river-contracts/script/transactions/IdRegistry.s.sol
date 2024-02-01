// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// import "forge-std/Script.sol";
// import {ECDSA} from "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
// import {Test, console2} from "forge-std/Test.sol";

// import {IdRegistry} from "imp/IdRegistry.sol";

// contract IdRegistryScript is Script {
//     using ECDSA for bytes32;

//     // IdRegistry idRegistry = IdRegistry(0x339513226Afd92B309837Bad402c6D3ADDE9Ad24);
//     // anvil below
//     IdRegistry idRegistry = IdRegistry(0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512);

//     function setUp() public {}

//     function run() public {
//         uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
//         // uint256 registerForKey = vm.envUint("REGISTER_FOR_KEY");
//         // anvil below
//         uint256 secondPrivateKey = vm.envUint("SECOND_PRIVATE_KEY");

//         vm.startBroadcast(deployerPrivateKey);

//         // // Set hash inputs
//         // uint256 expiration = 1734558342000;
//         // bytes32 hash = keccak256(abi.encodePacked(
//         //     idRegistry.REGISTER_TYPEHASH(),
//         //     expiration
//         // ));
//         // // Generate sig from `to` address
//         // bytes32 digest = hash.toEthSignedMessageHash();

//         // console2.logBytes32(hash);
//         // console2.logBytes32(digest);

//         // bytes memory sig = _sign(registerForKey, digest);
//         // idRegistry.registerFor({
//         //     to: 0xfa4cfb84642163b95e071390eb1dCF2c9EC1C334,
//         //     backupAddress: 0x33F59bfD58c16dEfB93612De65A5123F982F58bA,
//         //     expiration: expiration,
//         //     sig: sig
//         // });

//         // idRegistry.register(address(0));

        
        
        
        
//         // anvil experimentation
        

//         // Set hash inputs
//         uint256 expiration = 1734558342000;
//         bytes32 hash = keccak256(abi.encodePacked(
//             idRegistry.REGISTER_TYPEHASH(),
//             expiration
//         ));
//         // Generate sig from `to` address
//         bytes32 digest = hash.toEthSignedMessageHash();

//         console2.logBytes32(hash);
//         console2.logBytes32(digest);

//         bytes memory sig = _sign(deployerPrivateKey, digest);
//         idRegistry.registerFor({
//             to: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
//             backupAddress: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
//             expiration: expiration,
//             sig: sig
//         });

        
//         vm.stopBroadcast();
//     }

//     function _sign(uint256 privateKey, bytes32 digest) internal pure returns (bytes memory) {
//         (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
//         return abi.encodePacked(r, s, v);
//     }
// }

// // ======= DEPLOY SCRIPTS =====

// // source .env
// // forge script script/transactions/IdRegistry.s.sol:IdRegistryScript -vvvv --broadcast --fork-url http://localhost:8545
// // forge script script/transactions/IdRegistry.s.sol:IdRegistryScript -vvvv --rpc-url $RPC_URL --broadcast
