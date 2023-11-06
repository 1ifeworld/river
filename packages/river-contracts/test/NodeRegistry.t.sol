// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {Test, console2} from "forge-std/Test.sol";

import {NodeRegistry} from "imp/core/NodeRegistry.sol";

import {NodeRegistryTypes} from "../src/types/general/NodeRegistryTypes.sol";
import {AdminWithMembers} from "../src/types/access/AdminWithMembers.sol";
import {ChannelMessageTypes} from "../src/types/channel/ChannelMessageTypes.sol";
import {PublicationMessageTypes} from "../src/types/publication/PublicationMessageTypes.sol";

contract NodeRegistryTest is Test {       

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////    

    event RegisterSchema(address indexed sender, bytes32 indexed schema, bytes data);
    event RegisterNode(address indexed sender, uint256 indexed nodeId, bytes data);
    event MessageNode(address indexed sender, uint256 indexed messageId, bytes data);       

    //////////////////////////////////////////////////
    // CONSTANTS
    //////////////////////////////////////////////////   

    // MSG VALUES
    uint256 constant mockUserId = 1;
    uint256 constant mockNodeId = 1;    
    bytes32 constant mockSchema = keccak256(abi.encode(1));
    uint256 constant mockMsgType = 1;
    string constant mockUri = "ipfs://bafybeihax3e3suai6qrnjrgletfaqfzriziokl7zozrq3nh42df7u74jyu";
    // HELPERS
    bytes public constant zeroBytes = new bytes(0);    

    //////////////////////////////////////////////////
    // PARAMETERS
    //////////////////////////////////////////////////  

    Account public eoa_operator;
    NodeRegistry public nodeRegistry;

    //////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////   

    // Set-up called before each test
    function setUp() public {
        eoa_operator = makeAccount("operator");
        nodeRegistry = new NodeRegistry();
        // Increment counters for each function to clear 0 -> 1 gas costs
        nodeRegistry.registerSchema(zeroBytes);
        nodeRegistry.registerNode(zeroBytes);
        nodeRegistry.messageNode(zeroBytes);        
    }    

    //////////////////////////////////////////////////
    // REGISTER SCHEMA TESTS
    //////////////////////////////////////////////////   

    /*
        Gas breakdown:
        * registerSchema (7,982) -- passing in no data along with call
    */

    function test_registerSchema() public {
        // prank into eoa that was set as operator for validator
        vm.startPrank(eoa_operator.addr); 
        // expect emit
        vm.expectEmit(true, true, false, false, address(nodeRegistry));
        // Calculate expected schemaHash
        bytes32 expectedHash = keccak256(abi.encode(block.chainid, address(nodeRegistry), 2));
        // emit what we expect
        emit RegisterSchema(eoa_operator.addr, expectedHash, zeroBytes);
        // call registerSchema on nodeRegistry
        nodeRegistry.registerSchema(zeroBytes);
    }                 


    //////////////////////////////////////////////////
    // REGISTER NODE TESTS
    //////////////////////////////////////////////////   

    /*
        Gas breakdown:
        * registerNode (11,205) -- passing in adminWithMembers data as msgBody
    */

    function test_registerNode() public {
        // prank into eoa that was set as operator for validator
        vm.startPrank(eoa_operator.addr); 
        // expect emit
        vm.expectEmit(true, true, false, true, address(nodeRegistry));
        // emit what we expect
        emit RegisterNode(eoa_operator.addr, 2, generateRegistrationData());
        // call registerNode on nodeRegistry
        nodeRegistry.registerNode(generateRegistrationData());
    }              

    //////////////////////////////////////////////////
    // CALL NODE TESTS
    //////////////////////////////////////////////////   

    /*
        Gas breakdown:
        * callNode (10,398) -- Channel: Passing in data representing an `addToChannel` message (encoded Pointer struct)
        * callNode (10,922) -- Publicaton: Passing in data representing an `updateUri` message (encoded uri)
    */

    function test_channel_callNode() public {
        // prank into eoa that was set as operator for validator
        vm.startPrank(eoa_operator.addr); 
        // expect emit
        vm.expectEmit(true, true, false, true, address(nodeRegistry));
        // emit what we expect
        // TODO: update to CallNode once that change is mode to node registry
        emit MessageNode(eoa_operator.addr, 2, generateCallData(0));
        // call registerNode on nodeRegistry
        nodeRegistry.messageNode(generateCallData(0));
    }              

    function test_publication_callNode() public {
        // prank into eoa that was set as operator for validator
        vm.startPrank(eoa_operator.addr); 
        // expect emit
        vm.expectEmit(true, true, false, true, address(nodeRegistry));
        // emit what we expect
        // TODO: update to CallNode once that change is mode to node registry
        emit MessageNode(eoa_operator.addr, 2, generateCallData(1));
        // call registerNode on nodeRegistry
        nodeRegistry.messageNode(generateCallData(1));
    }           

    //////////////////////////////////////////////////
    // HELPERS
    //////////////////////////////////////////////////  

    /*
        Register Node
    */

    function generateRegistrationMsgBody() public pure returns (bytes memory msgBody) {
        // generate members array input
        uint256[] memory mockMembers = new uint256[](3);
        mockMembers[0] = 2;
        mockMembers[1] = 3;
        mockMembers[2] = 4;
        // generate encoded access control struct
        msgBody = abi.encode(AdminWithMembers.Initialize_100({
            admin: mockUserId,
            members: mockMembers
        }));
    }

    function generateRegistrationData() public pure returns (bytes memory data) {
        data = abi.encode(NodeRegistryTypes.Registration({
            schema: mockSchema,
            userId: mockUserId,
            msgType: mockMsgType,
            msgBody: generateRegistrationMsgBody()
        }));
    }

    /*
        Call Node
    */    

    /// @notice Use bodyFlag = 0 to generate Channel data, 1 for Publication data
    function generateCallData(uint8 bodyFlag) public pure returns (bytes memory data) {
        data = abi.encode(NodeRegistryTypes.Call({
            nodeId: mockNodeId,
            userId: mockUserId,
            msgType: mockMsgType,
            msgBody: bodyFlag == 0 ? genereateAddToChannelData() : genereateUpdateUriData()
        }));
    }        

    /*
        Channel helpers
    */      

    function genereateAddToChannelData() public pure returns (bytes memory data) {
        data = abi.encode(ChannelMessageTypes.Add_110({
            pointer: ChannelMessageTypes.CustomParam_Pointer({
                chainId: 10,
                id: 1, // ex: this can represent a specific publication node, nft tokenId, etc
                target: address(0x123),
                hasId: true
            })
        }));
    }

    /*
        Publication helpers
    */      

    function genereateUpdateUriData() public pure returns (bytes memory data) {
        data = abi.encode(PublicationMessageTypes.Uri_100({
            uri: mockUri
        }));
    }     
}