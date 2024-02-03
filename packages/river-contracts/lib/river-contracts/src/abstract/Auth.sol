// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {IdRegistry} from "../IdRegistry.sol";
import {DelegateRegistry} from "../DelegateRegistry.sol";

/**
 * @title Auth
 * @author Lifeworld
 */
abstract contract Auth {
    
    error Unauthorized_Signer_For_User(uint256 userId);

    function _authorizationCheck(
        IdRegistry idRegistry,
        DelegateRegistry delegateRegistry,
        uint256 userId,
        address account,
        address target,
        bytes4 selector
    ) internal view returns (address) {
        // Check that account is custody address or is delegate of userId
        if (account != idRegistry.custodyOf(userId)) {
            if (!delegateRegistry.isDelegate(userId, account, target, selector)) {
                revert Unauthorized_Signer_For_User(userId);
            }
        }
        // Return account address as authorized sender
        return account;
    }
}
