// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {Test, console2} from "forge-std/Test.sol";

import {NodeRegistry} from "../src/core/NodeRegistry.sol";
import {INodeRegistryTypes} from "./utils/INodeRegistryTypes.sol";

/*
    TODO:

    1. fix issues with the testing around expectEmit
    2. run gas calcs again for all tests
*/

contract NodeRegistryTest is Test, INodeRegistryTypes {

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////    

    event RegisterSchema(address indexed sender, bytes32 indexed schema, bytes indexed data);
    event RegisterNode(address indexed sender, uint256 indexed nodeId, bytes indexed data);
    event MessageNode(address indexed sender, uint256 indexed messageId, bytes indexed data);        

    //////////////////////////////////////////////////
    // CONSTANTS
    //////////////////////////////////////////////////   

    address mockUserAccount = address(0x123);
    uint256 mockUserId = 1;
    uint256 mockNodeId = 1;    
    bytes32 mockSchema = keccak256(abi.encode(1));
    uint256 mockRegType = 1;
    string mockUri = "ipfs://bafybeihax3e3suai6qrnjrgletfaqfzriziokl7zozrq3nh42df7u74jyu";
    bytes32 mockMerkleRoot = 0x86c29b38b8e59d3d08913796a5f1eeaefa01125ee2a61fdfd3aeffdcfe6180e1;
    bytes zeroBytes = new bytes(0);

    //////////////////////////////////////////////////
    // PARAMETERS
    //////////////////////////////////////////////////   

    NodeRegistry nodeRegistry;

    //////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////   

    // Set-up called before each test
    function setUp() public {
        nodeRegistry = new NodeRegistry();  
        nodeRegistry.registerSchema(new bytes(0));
        nodeRegistry.registerNode(new bytes(0));
        nodeRegistry.messageNode(new bytes(0));
    }    

    //////////////////////////////////////////////////
    // REGISTER SCHEMA TESTS
    ////////////////////////////////////////////////// 

    /*
      SCHEMA REGISTRATION TESTS
        - test_registerSchema
        - test_batchRegisterSchema
        - test_initialData_RegisterSchema
        - test_initialData_batchRegisterSchema
    */    
    function test_registerSchema() public {
        vm.startPrank(mockUserAccount);
        // Checks if topics 1, 2, 3, non-indexed data and event emitter match expected emitter + event signature + event values
        // vm.expectEmit(true, true, true, false, address(nodeRegistry));        
        // vm.expectEmit(address(nodeRegistry));        
        // Generate input data
        bytes memory encodedData = abi.encode(SchemaRegistration({
            userId: mockUserId,
            regType: mockRegType,
            regBody: zeroBytes
        }));
        // Emit event we are expecting
        // emit RegisterSchema(mockUserAccount, mockSchema, encodedData);
        // Perform call to emit event
        nodeRegistry.registerSchema(encodedData);
        // Perform another call to test gas for second register node call in same txn
        nodeRegistry.registerSchema(encodedData);
        require(nodeRegistry.schemaCount() == 3, "schemaCount not incremented correctly");
    }

    function test_batchRegisterSchema() public {
        vm.prank(mockUserAccount);
        uint256 quantity = 10;
        nodeRegistry.registerSchemaBatch(generateBatchRegisterData(quantity));
        require(nodeRegistry.schemaCount() == 11, "schemaCount not incremented correctly");
    }       

    //////////////////////////////////////////////////
    // REGISTER NODE TESTS
    //////////////////////////////////////////////////     

    /*
        TESTS
        - test_registerNode
        - test_batchRegisterNode
        - test_initialData_RegisterNode
        - test_initialData_batchRegisterNode
    */

    /*
        Gas breakdown
        - first node registration (in setup, no data, cold access, zero -> non-zero messageCount) = 
        - second node registration (no data, cold access, non-zero -> non-zero messageCount) = 
        - third node registration (no data, warm access, non-zero -> non-zero messageCount) = 
    */
    function test_registerNode() public {
        vm.startPrank(mockUserAccount);
        // Checks if topics 1, 2, 3, non-indexed data and event emitter match expected emitter + event signature + event values
        // vm.expectEmit(true, true, true, false, address(nodeRegistry));      
        // Generate input data
        bytes memory encodedData = abi.encode(NodeRegistration({
            userId: mockUserId,
            schema: mockSchema,
            regType: mockRegType,
            regBody: zeroBytes
        }));
        // Emit event we are expecting
        // emit NodeRegistry.RegisterNode(mockUserAccount, 2, zeroBytes);        
        // Perform call to emit event
        nodeRegistry.registerNode(encodedData);
        // Perform another call to test gas for second register node call in same txn
        nodeRegistry.registerNode(encodedData);
        require(nodeRegistry.nodeCount() == 3, "nodeCount not incremented correctly");
    }    

    /*
        Gas breakdown
        - 10 non-zero -> non-zero registrations w/ empty data for each = 
    */
    function test_batchRegisterNode() public {
        vm.prank(mockUserAccount);
        uint256 quantity = 10;
        nodeRegistry.registerNodeBatch(generateBatchRegisterData(quantity));
        require(nodeRegistry.nodeCount() == 11, "nodeCount not incremented correctly");
    }        

    /*
        Gas breakdown
        - first node registration (in setup, no data) = 
        - second node registration (mock data) = 
    */
    // function test_initialData_RegisterNode() public {
    //     vm.prank(mockUserAccount);
    //     nodeRegistry.registerNode(mockUserId, mockNodeSchema, generateRegisterData());
    //     require(nodeRegistry.nodeCount() == 2, "nodeCount not incremented correctly");
    // }        

    /*
        Gas breakdown
        - 10 non-zero -> non-zero registrations w/ mock data for each =
    */
    // function test_initialData_batchRegisterNode() public {
    //     vm.prank(mockUserAccount);
    //     uint256 quantity = 10;
    //     nodeRegistry.registerNodeBatch(mockUserId, generateNodeSchemas(quantity), generateBatchRegisterData(quantity));
    //     require(nodeRegistry.nodeCount() == 11, "nodeCount not incremented correctly");
    // }     

    //////////////////////////////////////////////////
    // MESSAGE NODE TESTS
    ////////////////////////////////////////////////// 

    /*
        NODE MESSAGING TESTS
        - test_messageNode
        - test_batchMessageNode
        - test_publicationData_messageNode
        - test_publicationData_batchMessageNode
        - test_pointerData_messageNodea
        - test_pointerData_batchMessageNode
    */

    /*
        Gas breakdown
        - first message (in setup, no data, cold access, zero -> non-zero messageCount) = 
        - second message (no data, cold access, non-zero -> non-zero messageCount) = 
        - third message (no data, warm access, non-zero -> non-zero messageCount) = 
    */
    function test_messageNode() public {
        vm.prank(mockUserAccount);
        // generate input data
        bytes memory encodedData = abi.encode(NodeMessage({
            userId: mockUserId,
            nodeId: mockNodeId,
            msgType: 1,
            msgBody: zeroBytes
        }));
        // Call messageNode x 2        
        nodeRegistry.messageNode(encodedData);
        nodeRegistry.messageNode(encodedData);
        require(nodeRegistry.messageCount() == 3, "messageCount not incremented correctly");
    }  

    /*
        Gas breakdown
        - 10 non-zero -> non-zero registrations w/ empty data for each = 
    */
    function test_batchMessageNode() public {
        vm.prank(mockUserAccount);
        nodeRegistry.messageNodeBatch(generateEmptyData(10));
        require(nodeRegistry.messageCount() == 11, "messageCount not incremented correctly");
    }    

    /*
        Gas breakdown
        - first message (in setup, no data) = 
        - second message (mock data) =
    */
    // function test_publicationData_messageNode() public {
    //     vm.prank(mockUserAccount);
    //     nodeRegistry.messageNode(generateMessageData());
    //     require(nodeRegistry.messageCount() == 2, "messageCount not incremented correctly");
    // }          

    /*
        Gas breakdown
        - 10 non-zero -> non-zero messages w/ mock pub uri data for each =
    */
    // function test_publicationData_batchMessageNode() public {
    //     vm.prank(mockUserAccount);
    //     nodeRegistry.messageNodeBatch(generateBatchMessageData(10));
    //     require(nodeRegistry.messageCount() == 11, "messageCount not incremented correctly");
    // }         
       
    /*
        Gas breakdown
        - first message (in setup, no data) = 
        - second message (mock pointer data) = 1
    */
    // function test_pointerData_messageNode() public {
    //     vm.prank(mockUserAccount);
    //     nodeRegistry.messageNode(generatePointerMessageData());
    //     require(nodeRegistry.messageCount() == 2, "messageCount not incremented correctly");
    // }      

    //////////////////////////////////////////////////
    // HELPERS
    //////////////////////////////////////////////////  

    function generateRegisterData() public view returns (bytes memory registerData) {
        address[] memory mockInitialAdmins = new address[](1);
        mockInitialAdmins[0] = mockUserAccount;
        registerData = abi.encode(mockInitialAdmins, mockMerkleRoot);        
    }

    function generateBatchRegisterData(uint256 quantity) public view returns (bytes[] memory batchRegisterData) {         
        address[] memory mockInitialAdmins = new address[](1);
        mockInitialAdmins[0] = mockUserAccount;                
        batchRegisterData = new bytes[](quantity);
        for (uint256 i; i < quantity; ++i) {
            // batchRegisterData[i] = zeroBytes;
            batchRegisterData[i] = abi.encode(mockInitialAdmins, mockMerkleRoot);
        }
    }    

    function generateMessageData() public view returns (bytes memory messageData) {
        messageData = abi.encode(mockUri);        
    }        
    
    function generateBatchMessageData(uint256 quantity) public view returns (bytes[] memory batchMessageData) {         
        batchMessageData = new bytes[](quantity);
        for (uint256 i; i < quantity; ++i) {
            batchMessageData[i] = abi.encode(mockUserId, mockNodeId, mockSchema, mockUri);
        }
    }

    function generateEmptyData(uint256 quantity) public pure returns (bytes[] memory batchData) {                   
        batchData = new bytes[](quantity);
        for (uint256 i; i < quantity; ++i) {
            batchData[i] = new bytes(0);
        }
    }          

    function generateNodeSchemas(uint256 quantity) public view returns (bytes32[] memory batchNodeSchemas) {                   
        batchNodeSchemas = new bytes32[](quantity);
        for (uint256 i; i < quantity; ++i) {
            batchNodeSchemas[i] = mockSchema;
        }
    }             

    function generatePointerArray() public pure returns (Pointer[] memory pointers) {
        pointers = new Pointer[](1);
        pointers[0] = Pointer({
            chainId: 10,
            tokenId: 1000229,
            target: address(0x923842384),
            hasTokenId: true
        });        
    }    

    function generatePointerMessageData() public pure returns (bytes memory messageData) {
        messageData = abi.encode(generatePointerArray());        
    }           
}