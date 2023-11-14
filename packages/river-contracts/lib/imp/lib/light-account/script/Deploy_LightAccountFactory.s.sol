// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Script.sol";

import {IEntryPoint} from "account-abstraction/interfaces/IEntryPoint.sol";

import {LightAccountFactory} from "../src/LightAccountFactory.sol";

// @notice Deploys LightAccountFactory to the address `0x00006B00f8Ee98Eb4eA288B1E89d00702361e055`
// @dev Note: Script uses EntryPoint at address 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789
// @dev To run: `forge script script/Deploy_LightAccountFactory.s.sol:Deploy_LightAccountFactory --broadcast --rpc-url $RPC_URL_GOERLI --verify --verifier-url https://api-goerli-optimistic.etherscan.io/api -vvvv`
contract Deploy_LightAccountFactory is Script {
    error InitCodeHashMismatch(bytes32 initCodeHash);
    error DeployedAddressMismatch(address deployed);

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // Using entryPoint: 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789
        // Correct as of Oct 3 2023, from https://docs.alchemy.com/reference/eth-supportedentrypoints
        IEntryPoint entryPoint = IEntryPoint(payable(0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789));

        // Init code hash check
        bytes32 initCodeHash = keccak256(
            abi.encodePacked(type(LightAccountFactory).creationCode, bytes32(uint256(uint160(address(entryPoint)))))
        );

        // Log init code hash
        console.logBytes32(initCodeHash);

        if (initCodeHash != 0x3fd089820df67839c6d2ed1ddb05b163d4ff67bf917b8a6addcb8d6a98499821) {
            revert InitCodeHashMismatch(initCodeHash);
        }

        console.log("********************************");
        console.log("******** Deploy Inputs *********");
        console.log("********************************");
        console.log("Entrypoint Address is:");
        console.logAddress(address(entryPoint));
        console.log("********************************");
        console.log("******** Deploy ...... *********");
        console.log("********************************");

        LightAccountFactory factory =
        new LightAccountFactory{salt: 0x004991c3bbcf3dd0596292c80351798965070d75ffbfc94e11540400000e05c0}(entryPoint);
        // Deployed address check
        if (address(factory) != 0x00006B00f8Ee98Eb4eA288B1E89d00702361e055) {
            revert DeployedAddressMismatch(address(factory));
        }

        console.log("LightAccountFactory address:");
        console.logAddress(address(factory));

        console.log("Implementation address:");
        console.logAddress(address(factory.accountImplementation()));
        vm.stopBroadcast();
    }
}
