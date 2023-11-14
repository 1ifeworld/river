// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/Test.sol";
import {EntryPoint} from "account-abstraction/core/EntryPoint.sol";

import {LightAccount} from "../src/LightAccount.sol";
import {LightAccountFactory} from "../src/LightAccountFactory.sol";

contract LightAccounFactorytTest is Test {
    using stdStorage for StdStorage;

    //////////////////////////////////////////////////
    // PARAMETERS
    //////////////////////////////////////////////////

    address public constant OWNER_ADDRESS = address(0x100);
    LightAccountFactory public factory;
    EntryPoint public entryPoint;

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////

    event LightAccountCreated(address indexed deployedAddress, uint256 salt);

    //////////////////////////////////////////////////
    // SETUP (Runs before every test)
    //////////////////////////////////////////////////

    function setUp() public {
        entryPoint = new EntryPoint();
        factory = new LightAccountFactory(entryPoint);
    }

    //////////////////////////////////////////////////
    // TESTS
    //////////////////////////////////////////////////

    function testReturnsAddressWhenAccountAlreadyExists() public {
        LightAccount account = factory.createAccount(OWNER_ADDRESS, 1);
        LightAccount otherAccount = factory.createAccount(OWNER_ADDRESS, 1);
        assertEq(address(account), address(otherAccount));
    }

    function testGetAddress() public {
        address counterfactual = factory.getAddress(OWNER_ADDRESS, 1);
        assertEq(counterfactual.codehash, bytes32(0));
        LightAccount factual = factory.createAccount(OWNER_ADDRESS, 1);
        assertTrue(address(factual).codehash != bytes32(0));
        assertEq(counterfactual, address(factual));
    }

    function testFactoryEmitsLightAccountCreated() public {
        // Set subsequent msg.sender to arbitrary address
        vm.startPrank(address(0x123));
        // Get counterfactual address for light account deployed with specific owner address + salt
        address counterfactual = factory.getAddress(OWNER_ADDRESS, 1);
        // Expect emit
        vm.expectEmit(true, true, false, false, address(factory));
        // Emit the event we expect to see
        emit LightAccountCreated(counterfactual, 1);
        // Create account from factory
        LightAccount account = factory.createAccount(OWNER_ADDRESS, 1);
        // Test that account equals counter factual address
        assertEq(address(account), counterfactual);
    }
}
