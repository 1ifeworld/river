// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

abstract contract NodeRegistryTypes {

    //////////////////////////////////////////////////
    // TYPE DECLARATION
    //////////////////////////////////////////////////  

    struct Registration {
        bytes32 schema;
        uint256 userId;
        uint256 msgType;
        bytes msgBody;
    }        

    struct Call {
        uint256 nodeId;
        uint256 userId;
        uint256 msgType;
        bytes msgBody;
    }         

    //////////////////////////////////////////////////
    // TYPE EXPORT
    //////////////////////////////////////////////////    

    /// @notice These parameters will never be initialized
    /// @notice Only in use to allow for the types to be accessed by `exportTypes()`
    /// @dev Set as internal to avoid automatically generated getter functions
    Registration internal _registration;
    Call internal _call;     

    /// @notice This function will never be called
    /// @notice Only in use to allow for types to be visible in contract ABI
    function exportRegistrationType() external view returns (Registration memory) {
        return _registration;
    } 

    /// @notice This function will never be called
    /// @notice Only in use to allow for types to be visible in contract ABI
    function exportCallType() external view returns (Call memory) {
        return _call;
    }
}