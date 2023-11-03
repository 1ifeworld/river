
// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

interface INodeRegistryTypes {
    struct SchemaRegistration {
        uint256 userId;
        uint256 regType;
        bytes regBody;
    }    

    struct NodeRegistration {
        uint256 userId;
        bytes32 schema;
        uint256 regType;
        bytes regBody;
    }        

    struct NodeMessage {
        uint256 userId;
        uint256 nodeId;
        uint256 msgType;
        bytes msgBody;
    }         

    struct Pointer {
        uint256 chainId;
        uint256 tokenId;
        address target;
        bool hasTokenId;
    }          
}