// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test, console2} from "forge-std/Test.sol";

import {NodeRegistry} from "../src/NodeRegistry.sol";

contract NodeRegistryTest is Test {       

    //////////////////////////////////////////////////
    // CONSTANTS
    //////////////////////////////////////////////////   

    address constant MOCK_USER = address(0x123);
    uint256 constant MOCK_USER_ID = 1;
    bytes constant ZERO_BYTES = new bytes(0);
    bytes32 constant ZERO_BYTES32 = keccak256(new bytes(0));
    bytes32 constant EXAMPLE_SCHEMA = 0xF36F2F0432F99EA34A360F154CEA9D1FAD45C7319E27ADED55CC0D28D0924068;

    //////////////////////////////////////////////////
    // PARAMETERS
    //////////////////////////////////////////////////   

    NodeRegistry nodeRegistry;

    //////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////   

    // Set-up called before each test to clear 0 -> 1 gas cost for nodeCount storage
    function setUp() public {
        nodeRegistry = new NodeRegistry();  
        bytes[] memory emptyArray = new bytes[](1);
        emptyArray[0] = ZERO_BYTES;
        nodeRegistry.register(MOCK_USER_ID, ZERO_BYTES32, emptyArray);
    }    
    
    //////////////////////////////////////////////////
    // REGISTER TESTS
    //////////////////////////////////////////////////     

    function test_register() public {
        // Prep input data
        bytes[] memory messages = new bytes[](0);
        // Prank into user
        vm.startPrank(MOCK_USER);        
        // Cache expected nodeId return value post register execution
        uint256 expectedCount = nodeRegistry.nodeCount() + 1;        
        // Checks if topics 1, 2, 3, non-indexed data and event emitter match expected emitter + event signature + event values
        vm.expectEmit(true, true, true, true, address(nodeRegistry));    
        // Emit event with expected values
        emit NodeRegistry.Register(MOCK_USER, MOCK_USER_ID, EXAMPLE_SCHEMA, expectedCount, messages);        
        // Call `register()` on nodeRegistry
        nodeRegistry.register(MOCK_USER_ID, EXAMPLE_SCHEMA, messages);
        // Check storage updated correctly
        assertEq(nodeRegistry.nodeCount(), expectedCount);
    }        

    function test_batchRegister() public {
        // Define batch quantity
        uint256 quantity = 10;        
        // Prep input data
        bytes[][] memory messages = new bytes[][](quantity);
        // Prank into user
        vm.startPrank(MOCK_USER);        
        // Cache expected nodeId return value post register execution
        uint256 expectedCount = nodeRegistry.nodeCount() + quantity;            
        // Call `registerBatch()` on nodeRegistry
        nodeRegistry.registerBatch(generateIdArray(quantity, MOCK_USER_ID), generateSchemaArray(quantity, EXAMPLE_SCHEMA), messages);
        // Check storage updated correctly
        assertEq(nodeRegistry.nodeCount(), expectedCount);
    }            

    function test_Revert_messagesUnderflow_batchRegister() public {
        // Define batch quantity
        uint256 quantity = 10;        
        // Prep input data
        bytes[][] memory messages = new bytes[][](quantity - 1);
        // Prank into user
        vm.startPrank(MOCK_USER);        
        // Should revert because of mismatched schemas + messages lengths
        // At the time of testing, error code reads: "panic: array out-of-bounds access (0x32)"
        vm.expectRevert();
        nodeRegistry.registerBatch(generateIdArray(quantity, MOCK_USER_ID), generateSchemaArray(quantity, EXAMPLE_SCHEMA), messages);
    }     

    //////////////////////////////////////////////////
    // UPDATE TESTS
    //////////////////////////////////////////////////   

    // function test_update() public {
    //     // Prep input data
    //     uint256 targetNodeId = 1;
    //     bytes[] memory messages = new bytes[](0);
    //     // Prank into user
    //     vm.startPrank(MOCK_USER);             
    //     // Checks if topics 1, 2, 3, non-indexed data and event emitter match expected emitter + event signature + event values
    //     vm.expectEmit(true, true, false, true, address(nodeRegistry));    
    //     // Emit event with expected values
    //     emit NodeRegistry.Update(MOCK_USER, targetNodeId, messages);        
    //     // Call `register()` on nodeRegistry
    //     nodeRegistry.update(targetNodeId, messages);
    // }     

    // function test_batchUpdate() public {
    //     // Define batch quantity
    //     uint256 quantity = 10;        
    //     uint256 targetNodeId = 1;
    //     // Prep input data
    //     bytes[][] memory messages = new bytes[][](quantity);
    //     // Prank into user
    //     vm.startPrank(MOCK_USER);                
    //     // Call `updateBatch` on nodeRegistry
    //     nodeRegistry.updateBatch(generateIdArray(quantity, targetNodeId), messages);        
    // }         

    // function test_Revert_messagesUnderflow_batchUpdate() public {
    //     // Define batch quantity
    //     uint256 quantity = 10;        
    //     uint256 targetNodeId = 1;
    //     // Prep input data
    //     bytes[][] memory messages = new bytes[][](quantity - 1);
    //     // Prank into user
    //     vm.startPrank(MOCK_USER);        
    //     // Should revert because of mismatched nodeIds + messages lengths
    //     // At the time of testing, error code reads: "panic: array out-of-bounds access (0x32)"
    //     vm.expectRevert();
    //     nodeRegistry.updateBatch(generateIdArray(quantity, targetNodeId), messages);
    // }       

    //////////////////////////////////////////////////
    // HELPERS
    //////////////////////////////////////////////////  

    function generateSchemaArray(uint256 quantity, bytes32 schema) public pure returns (bytes32[] memory schemaArray) {                   
        schemaArray = new bytes32[](quantity);
        for (uint256 i; i < quantity; ++i) {
            schemaArray[i] = schema;
        }
    }            

    function generateIdArray(uint256 quantity, uint256 id) public pure returns (uint256[] memory idArray) {                   
        idArray = new uint256[](quantity);
        for (uint256 i; i < quantity; ++i) {
            idArray[i] = id;
        }
    }                          
}