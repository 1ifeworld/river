// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test, console2} from "forge-std/Test.sol";

import {IdRegistry} from "../src/IdRegistry.sol";
import {IIdRegistry} from "../src/interfaces/IIdRegistry.sol";


/*
    TODO: Missing event testing
*/

contract IdRegistryTest is Test {       

    //////////////////////////////////////////////////
    // CONSTANTS
    //////////////////////////////////////////////////   

    //////////////////////////////////////////////////
    // STORAGE
    //////////////////////////////////////////////////   

    /* contracts + accounts */
    IdRegistry public idRegistry;
    Account public trusted;
    Account public relayer;
    Account public user;     
    Account public malicious;     

    //////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////   

    // Set-up called before each test
    function setUp() public {
        // accounts
        trusted = makeAccount("trusted");
        relayer = makeAccount("relayer");
        user = makeAccount("user");
        malicious = makeAccount("malicious");        
        // contracts
        idRegistry = new IdRegistry(trusted.addr);  
        vm.prank(trusted.addr);
        idRegistry.setTrustedCaller(trusted.addr);
    }    

    //////////////////////////////////////////////////
    // SIGNATURE BASED WRITES
    //////////////////////////////////////////////////    

    function test_sigBased_registerFor() public {
        // start prank as trusted caller
        vm.startPrank(trusted.addr);
        // generate registerfor signature
        bytes memory sig = _signRegister(
            user.key,
            user.addr,
            trusted.addr,
            _deadline()
        );
        // Set up event tests
        vm.expectEmit(true, false, false, false, address(idRegistry));    
        // Emit event with expected value
        emit IIdRegistry.Register(user.addr, 1, trusted.addr);            
        // register id to user
        uint256 rid = idRegistry.registerFor(user.addr, trusted.addr, _deadline(), sig);
        vm.stopPrank();
        // asserts
        assertEq(idRegistry.idCounter(), rid);
        assertEq(idRegistry.idOf(user.addr), rid);
        assertEq(idRegistry.custodyOf(rid), user.addr);
        assertEq(idRegistry.recoveryOf(rid), trusted.addr);
    }

    // //////////////////////////////////////////////////
    // // HELPERS
    // //////////////////////////////////////////////////  

    function _deadline() internal view returns (uint256 deadline) {
        deadline = block.timestamp + 1;
    }

    function _sign(uint256 privateKey, bytes32 digest) internal returns (bytes memory sig) {
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
        sig = abi.encodePacked(r, s, v);
        assertEq(sig.length, 65);
    }                       

    function _signRegister(
        uint256 pk,
        address to,
        address recovery,
        uint256 deadline
    ) internal returns (bytes memory signature) {
        address signer = vm.addr(pk);
        bytes32 digest = idRegistry.hashTypedDataV4(
            keccak256(abi.encode(idRegistry.REGISTER_TYPEHASH(), to, recovery, idRegistry.nonces(signer), deadline))
        );
        signature = _sign(pk, digest);
    }         
}
