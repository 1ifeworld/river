// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

abstract contract AdminWithMembers {    

    //////////////////////////////////////////////////
    // TYPE DECLARATION
    //////////////////////////////////////////////////  

    /// @notice custom type
    struct Initialize_100 {
        uint256 admin;
        uint256[] members;
    }

    /// @notice custom type
    /// @notice All updates to admin or members must be done through
    ///         this struct.
    /// @notice To update admin, pass in a non-zero id.
    /// @notice To update members, pass in a non empty members struct
    ///         message will be considered invalid if length of members 
    ///         and roles struct do not match
    struct Update_200 {
        uint256 admin;
        uint256[] members;
        uint8[] roles;
    }

    //////////////////////////////////////////////////
    // TYPE EXPORT
    //////////////////////////////////////////////////         

    /// @notice These parameters will never be initialized
    /// @notice Only in use to allow for the types to be accessed by `exportTypes()`
    /// @dev Set as internal to avoid automatically generated getter functions
    Initialize_100 internal _initialize_100;
    Update_200 internal _update_200;        

    /// @notice This function will never be called
    /// @notice Only in use to allow for types to be visible in contract ABI
    function exportTypes() external view returns (Initialize_100 memory, Update_200 memory) {
        return (
            _initialize_100, 
            _update_200
        );
    }     
}