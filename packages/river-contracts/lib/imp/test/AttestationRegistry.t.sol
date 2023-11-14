// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test, console2} from "forge-std/Test.sol";
import {ECDSA} from "openzeppelin-contracts/utils/cryptography/ECDSA.sol";

import {AttestationRegistry} from "../src/AttestationRegistry.sol";

// TODO: add tests confirming this works with smart accounts as well. shouldnt be an issue

contract AttestationRegistryTest is Test {       
    using ECDSA for bytes32;

    //////////////////////////////////////////////////
    // PARAMETERS
    //////////////////////////////////////////////////   

    /* Actors */
    Account public eoaOwner;
    Account public eoaAttestor;
    Account public eoaMalicious;         

    /* IMP infra */
    AttestationRegistry attestationRegistry;

    //////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////   

    // Set-up called before each test
    function setUp() public {
        // setup actors
        eoaOwner = makeAccount("owner");
        eoaAttestor = makeAccount("attestor");
        eoaMalicious = makeAccount("malicious");
        // setup registry
        attestationRegistry = new AttestationRegistry();
    }    

    //////////////////////////////////////////////////
    // ATTEST TEST
    ////////////////////////////////////////////////// 

    function test_attest() public {
        // Setup inputs
        bytes memory message = bytes("Hello World");
        uint256 deadline = 1; // block timestamp will be 1 at time of attest call
        bytes32 hashedMessage = keccak256(abi.encodePacked(message, deadline));
        bytes32 digest = hashedMessage.toEthSignedMessageHash();
        bytes memory sig = _sign(eoaAttestor.key, digest);
        // Trigger attest from id owner
        vm.startPrank(eoaOwner.addr);
        // Checks if topics 1, 2, 3, non-indexed data and event emitter match expected emitter + event signature + event values
        vm.expectEmit(true, true, false, false, address(attestationRegistry));
        // Emit event we are expecting
        emit AttestationRegistry.Attest(eoaOwner.addr, eoaAttestor.addr);
        // Perform attest call
        attestationRegistry.attest(eoaAttestor.addr, message, sig, deadline);
        // Check for expected storage updates
        assertEq(attestationRegistry.attestorFor(eoaOwner.addr), eoaAttestor.addr);
        assertEq(attestationRegistry.attestedBy(eoaAttestor.addr), eoaOwner.addr);     
    } 

    function test_Revert_addressSwap_attest() public {
        // Setup inputs
        bytes memory message = bytes("Hello World");
        uint256 deadline = 1; // block timestamp will be 1 at time of attest call
        bytes32 hashedMessage = keccak256(abi.encodePacked(message, deadline));
        bytes32 digest = hashedMessage.toEthSignedMessageHash();
        bytes memory sig = _sign(eoaAttestor.key, digest);
        // Trigger attest from id owner
        vm.startPrank(eoaOwner.addr);
        // Expect revert replacing signer address with different address
        vm.expectRevert(abi.encodeWithSignature("Invalid_Signature()"));
        attestationRegistry.attest(eoaMalicious.addr, message, sig, deadline);        
    }

    function test_Revert_maliciousSig_attest() public {
        // Setup inputs
        bytes memory message = bytes("Hello World");
        uint256 deadline = 1; // block timestamp will be 1 at time of attest call
        bytes32 hashedMessage = keccak256(abi.encodePacked(message, deadline));
        bytes32 digest = hashedMessage.toEthSignedMessageHash();
        bytes memory sig = _sign(eoaMalicious.key, digest);
        // Trigger attest from id owner
        vm.startPrank(eoaOwner.addr);
        // Expect revert replacing sig with one produced by different key-pair
        vm.expectRevert(abi.encodeWithSignature("Invalid_Signature()"));
        attestationRegistry.attest(eoaAttestor.addr, message, sig, deadline);        
    }    

    function test_Revert_expiredSig_attest() public {
        // Setup inputs
        bytes memory message = bytes("Hello World");
        uint256 deadline = 0; // block timestamp will be 1 at time of attest call
        bytes32 hashedMessage = keccak256(abi.encodePacked(message, deadline));
        bytes32 digest = hashedMessage.toEthSignedMessageHash();
        bytes memory sig = _sign(eoaAttestor.key, digest);
        // Trigger attest from id owner
        vm.startPrank(eoaOwner.addr);
        // Expect revert signature expired
        vm.expectRevert(abi.encodeWithSignature("Signature_Expired()"));        
        attestationRegistry.attest(eoaAttestor.addr, message, sig, deadline);        
    }        

    function test_Revert_incorrectDigest_attest() public {
        // Setup inputs
        bytes memory message = bytes("Hello World");
        uint256 deadline = 1; // block timestamp will be 1 at time of attest call
        // purposely NOT include deadline in hashing to triger revett
        bytes32 hashedMessage = keccak256(message);
        bytes32 digest = hashedMessage.toEthSignedMessageHash();
        bytes memory sig = _sign(eoaAttestor.key, digest);
        // Trigger attest from id owner
        vm.startPrank(eoaOwner.addr);
        // Expect revert signature expired
        vm.expectRevert(abi.encodeWithSignature("Invalid_Signature()"));        
        attestationRegistry.attest(eoaAttestor.addr, message, sig, deadline);        
    }        

    //////////////////////////////////////////////////
    // REVOKE TEST
    ////////////////////////////////////////////////// 

    function test_revoke() public {
        // Process valid attestation
        vm.startPrank(eoaOwner.addr);
        bytes memory message = bytes("Hello World");
        uint256 deadline = 1; // block timestamp will be 1 at time of attest call
        bytes32 hashedMessage = keccak256(abi.encodePacked(message, deadline));
        bytes32 digest = hashedMessage.toEthSignedMessageHash();
        bytes memory sig = _sign(eoaAttestor.key, digest);
        attestationRegistry.attest(eoaAttestor.addr, message, sig, deadline);
        /*
            SHIFT TO REVOKE LOGIC
        */        
        // Trigger attest from attestor address
        vm.startPrank(eoaAttestor.addr);
        // Checks if topics 1, 2, 3, non-indexed data and event emitter match expected emitter + event signature + event values
        vm.expectEmit(true, true, false, false, address(attestationRegistry));
        // Emit event we are expecting
        emit AttestationRegistry.Revoke(eoaAttestor.addr, eoaOwner.addr);
        // Perform attest call
        attestationRegistry.revoke();
        // Check for expected storage updates
        assertEq(attestationRegistry.attestorFor(eoaOwner.addr), address(0));
        assertEq(attestationRegistry.attestedBy(eoaAttestor.addr), address(0));     
    } 

    function test_Revert_noAttestation_revoke() public {
        // Trigger attest from attestor address
        vm.startPrank(eoaAttestor.addr);
        vm.expectRevert(abi.encodeWithSignature("No_Existing_Attestation()"));
        attestationRegistry.revoke();
    }

    //////////////////////////////////////////////////
    // HELPERS
    //////////////////////////////////////////////////  

    function _sign(uint256 privateKey, bytes32 digest) internal pure returns (bytes memory) {
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
        return abi.encodePacked(r, s, v);
    }    
}