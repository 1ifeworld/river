// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {INodeRegistry} from "./interfaces/INodeRegistry.sol";

/// TODO: bump to sol 0.8.22

/**
 * @title NodeRegistry
 * @author Lifeworld
 */
contract NodeRegistry is INodeRegistry {

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////

    /**
     * @dev Emit an event when a new schema is registered
     *
     *      Schemas are unique hash identifiers that nodeIds anchor themselves on upon registration
     *      NodeIds that are reigstered without providing an existing schema will be considered invalid
     *
     * @param sender        Address of the account calling `registerSchema()`
     * @param schema        Hash value for the unique schema being registered
     * @param data          Data to associate with the registration of a new schema
     */
    event RegisterSchema(address indexed sender, bytes32 indexed schema, bytes data);

    /**
     * @dev Emit an event when a new node is registered
     *
     *      NodeIds provide targets for messaging schemes. It is recommended
     *      that all messaging schemes include nodeId as a field to provide
     *      affective filtering of the entire data set produced via the registry
     *
     * @param sender        Address of the account calling `registerNode()`
     * @param nodeId        NodeId being registered
     * @param data          Data to associate with the registration of a new nodeId
     */
    event RegisterNode(address indexed sender, uint256 indexed nodeId, bytes data);

    /**
     * @dev Emit an event when a new message is sent
     *
     *      Messages allow for the generic transmission of data. The sender field in the
     *      message event allows for filtering by accounts such as app level signers
     *      while the messageId field allows for a universal-id mechanism to identify
     *      given messages regardless of the nodeId they are targeting.
     *
     * @param sender        Address of the account calling `messageNode()`
     * @param messageId     The messageId being generated
     * @param data          Data to transmit in the message
     */
    event MessageNode(address indexed sender, uint256 indexed messageId, bytes data);

    //////////////////////////////////////////////////
    // STORAGE
    //////////////////////////////////////////////////

    /**
     * @inheritdoc INodeRegistry
     */
    uint256 public schemaCount;

    /**
     * @inheritdoc INodeRegistry
     */
    uint256 public nodeCount;

    /**
     * @inheritdoc INodeRegistry
     */
    uint256 public messageCount;

    //////////////////////////////////////////////////
    // NODE SCHEMA REGISTRATION
    //////////////////////////////////////////////////

    /**
     * @inheritdoc INodeRegistry
     */
    function registerSchema(bytes calldata data) external returns (bytes32 schema) {
        // Increments schemaCount before hash generation
        schema = keccak256(abi.encode(block.chainid, address(this), ++schemaCount));
        emit RegisterSchema(msg.sender, schema, data);
    }

    /**
     * @inheritdoc INodeRegistry
     */
    function registerSchemaBatch(bytes[] calldata datas) external returns (bytes32[] memory schemas) {
        // Cache msg.sender
        address sender = msg.sender;
        // Assign return data length
        schemas = new bytes32[](datas.length);
        for (uint256 i; i < datas.length; ++i) {
            // Increments schemaCount before hash generation
            schemas[i] = keccak256(abi.encode(block.chainid, address(this), ++schemaCount));
            // Emit for indexing
            emit RegisterSchema(sender, schemas[i], datas[i]);
        }
    }

    //////////////////////////////////////////////////
    // NODE REGISTRATION
    //////////////////////////////////////////////////

    /**
     * @inheritdoc INodeRegistry
     */
    function registerNode(bytes calldata data) external returns (uint256 nodeId) {
        // Increments nodeCount before event emission
        nodeId = ++nodeCount;
        emit RegisterNode(msg.sender, nodeId, data);
    }

    /**
     * @inheritdoc INodeRegistry
     */
    function registerNodeBatch(bytes[] calldata datas) external returns (uint256[] memory nodeIds) {
        // Cache msg.sender
        address sender = msg.sender;
        // Assign return data length
        nodeIds = new uint256[](datas.length);
        for (uint256 i; i < datas.length; ++i) {
            // Copy nodeId to return variable
            nodeIds[i] = ++nodeCount;
            // Increments nodeCount before event emission
            emit RegisterNode(sender, nodeIds[i], datas[i]);
        }
    }

    //////////////////////////////////////////////////
    // NODE MESSAGING
    //////////////////////////////////////////////////

    /**
     * @inheritdoc INodeRegistry
     */
    function messageNode(bytes calldata data) external returns (uint256 messageId) {
        // Increments messageCount before event emission
        messageId = ++messageCount;
        emit MessageNode(msg.sender, messageId, data);
    }

    /**
     * @inheritdoc INodeRegistry
     */
    function messageNodeBatch(bytes[] calldata datas) external returns (uint256[] memory messageIds) {
        // Cache msg.sender
        address sender = msg.sender;
        // Assign return data length
        messageIds = new uint256[](datas.length);
        for (uint256 i; i < datas.length; ++i) {
            // Increment messageCount and copy to return variable
            messageIds[i] = ++messageCount;
            // Emit Message event
            emit MessageNode(sender, messageIds[i], datas[i]);
        }
    }
}