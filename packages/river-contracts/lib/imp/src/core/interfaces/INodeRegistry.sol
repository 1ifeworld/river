// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

interface INodeRegistry {

    //////////////////////////////////////////////////
    // STORAGE
    //////////////////////////////////////////////////

    /**
     * @notice Provides entropy for nodeSchema registrations
     */
    function schemaCount() external view returns (uint256);    

    /**
     * @notice Tracks number of nodes registered
     */
    function nodeCount() external view returns (uint256);

    /**
     * @notice Tracks number of messages sent
     */
    function messageCount() external view returns (uint256);

    //////////////////////////////////////////////////
    // NODE SCHEMA REGISTRATION
    //////////////////////////////////////////////////    

    /**
     * @notice Register a new schema by incrementing the schemaCount and emitting a
     *         unique hash of it. These hashes can be used to anchor schemas for nodeIds
     * @dev Callable by anyone
     *
     * @param data          Data to associate with RegisterSchema event
     */
    function registerSchema(bytes calldata data) external returns (bytes32);    

    /**
     * @notice Register new schemas by incrementing the schemaCount and emitting a
     *         unique hashes of it. These hashes can be used to anchor schemas for nodeIds
     * @dev Callable by anyone
     *
     * @param datas         Data to associate with RegisterSchema events
     */
    function registerSchemaBatch(bytes[] calldata datas) external returns (bytes32[] memory);  

    //////////////////////////////////////////////////
    // NODE ID REGISTRATION
    //////////////////////////////////////////////////

    /**
     * @notice Register a new node by incrementing the nodeCount and emitting data
     *         in association with the registration event
     * @dev Callable by anyone
     *
     * @param data          Data to associate with RegisterNode event
     */
    function registerNode(bytes calldata data) external returns (uint256);

    /**
     * @notice Batch version of `registerNode`
     *
     * @param datas         Data to associate with RegisterNode events
     */
    function registerNodeBatch(bytes[] calldata datas) external returns (uint256[] memory);

    //////////////////////////////////////////////////
    // NODE MESSAGING
    //////////////////////////////////////////////////

    /**
     * @notice Message a node by incrementing the messageCount and emitting data
     * @dev Callable by anyone
     *
     * @param data          Data to associate with Message event
     */
    function messageNode(bytes calldata data) external returns (uint256);

    /**
     * @notice Batch version of `messageNode`
     *
     * @param datas         Data to associate with each Message event
     */
    function messageNodeBatch(bytes[] calldata datas) external returns (uint256[] memory);
}
