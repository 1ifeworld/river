// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Ownable2Step} from "openzeppelin-contracts/access/Ownable2Step.sol";
import {Ownable} from "openzeppelin-contracts/access/Ownable.sol";

abstract contract Trust is Ownable2Step {
    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/

    /// @dev Revert when an unauthorized caller calls a trusted function.
    error Only_Trusted();

    /// @dev Revert when an invalid address is provided as input.
    error Invalid_Address();

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Emit an event when the trusted caller is modified.
     *
     * @param oldCaller The address of the old trusted caller.
     * @param newCaller The address of the new trusted caller.
     * @param owner     The address of the owner setting the new caller.
     */
    event SetTrustedCaller(address indexed oldCaller, address indexed newCaller, address owner);

    /**
     * @dev Emit an event when the trustedOnly state is disabled.
     */
    event DisableTrustedOnly();

    /*//////////////////////////////////////////////////////////////
                              STORAGE
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev The privileged address that is allowed to call trusted functions.
     */
    address public trustedCaller;

    /**
     * @dev Allows calling trusted functions when set 1, and disables trusted
     *      functions when set to 0. The value is set to 1 and can be changed to 0,
     *      but never back to 1.
     */
    uint256 public trustedOnly = 1;

    /*//////////////////////////////////////////////////////////////
                               MODIFIERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Allow only the trusted caller to call the modified function.
     */
    modifier trust() {
        if (trustedOnly == 1) {
            if (msg.sender != trustedCaller) revert Only_Trusted();
        }
        _;
    }

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    /**
     * @param _initialOwner Initial contract owner address.
     */
    constructor(address _initialOwner) Ownable(_initialOwner) {}

    /*//////////////////////////////////////////////////////////////
                         PERMISSIONED ACTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Change the trusted caller by calling this from the contract's owner.
     *
     * @param _trustedCaller The address of the new trusted caller
     */
    function setTrustedCaller(address _trustedCaller) public onlyOwner {
        _setTrustedCaller(_trustedCaller);
    }

    /**
     * @notice Disable trustedOnly mode. Must be called by the contract's owner.
     */
    function disableTrustedOnly() external onlyOwner {
        delete trustedOnly;
        emit DisableTrustedOnly();
    }

    /*//////////////////////////////////////////////////////////////
                         INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Internal helper to set trusted caller. Can be used internally
     *      to set the trusted caller at construction time.
     */
    function _setTrustedCaller(address _trustedCaller) internal {
        if (_trustedCaller == address(0)) revert Invalid_Address();

        emit SetTrustedCaller(trustedCaller, _trustedCaller, msg.sender);
        trustedCaller = _trustedCaller;
    }
}