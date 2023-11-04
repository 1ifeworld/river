// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

abstract contract ChannelMessageTypes {    

    //////////////////////////////////////////////////
    // TYPE DECLARATION
    //////////////////////////////////////////////////  

    // "update channel Uri" functionality 
    struct Uri_100 {
        string uri;
    }    

    // "removeFromChannel" functionality
    // NOTE: this facilitates the removal of an existing
    //      item in a channel
    // how the fuck do people know whats in a channel???    
    struct Add_110 {
        CustomParam_Pointer pointer;
    }

    // "removeFromChannel" functionality
    // NOTE: this facilitates the removal of an existing
    //      item in a channel
    // how the fuck do people know whats in a channel???
    struct Remove_120 {
        uint256 channelIndex;
    }       

    //////////////////////////////////////////////////
    // TYPE EXPORT
    //////////////////////////////////////////////////  

    /// @notice These parameters will never be initialized
    /// @notice Only in use to allow for the types to be accessed by `exportTypes()`
    /// @dev Set as internal to avoid automatically generated getter functions
    Uri_100 internal _uri_100;
    Add_110 internal _add_110;        
    Remove_120 internal _remove_120;        

    /// @notice This function will never be called
    /// @notice Only in use to allow for types to be visible in contract ABI
    function exportTypes() external view returns (Uri_100 memory, Add_110 memory, Remove_120 memory) {
        return (
            _uri_100, 
            _add_110,
            _remove_120
        );
    }     

    //////////////////////////////////////////////////
    // CUSTOM PARAMETERS
    //////////////////////////////////////////////////  

    // Data type for referencing existing onchain information
    struct CustomParam_Pointer {
        uint256 chainId;
        uint256 id;
        address target;
        bool hasId;
    }               
}