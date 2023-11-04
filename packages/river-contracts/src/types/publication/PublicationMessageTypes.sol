// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

abstract contract PublicationlMessageTypes {    

    //////////////////////////////////////////////////
    // TYPE DECLARATION
    //////////////////////////////////////////////////  

    // "update publication uri" functionality 
    struct Uri_100 {
        string uri;
    }    

    //////////////////////////////////////////////////
    // TYPE EXPORT
    //////////////////////////////////////////////////  

    /// @notice This parameter will never be initialized
    /// @notice Only in use to allow for the type to be accessed by `exportTypes()`
    /// @dev Set as internal to avoid automatically generated getter functions
    Uri_100 internal _uri_100;

    /// @notice This function will never be called
    /// @notice Only in use to allow for types to be visible in contract ABI
    function exportTypes() external view returns (Uri_100 memory) {
        return (
            _uri_100
        );
    }     
}