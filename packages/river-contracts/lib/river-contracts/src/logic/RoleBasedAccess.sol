// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {IdRegistry} from "../IdRegistry.sol";
import {DelegateRegistry} from "../DelegateRegistry.sol";
import {Auth} from "../abstract/Auth.sol";
import {IRoles} from "../interfaces/IRoles.sol";

/**
 * @title RoleBasedAccess
 * @author Lifeworld
 */
contract RoleBasedAccess is Auth, IRoles {
    //////////////////////////////////////////////////
    // ERRORS
    //////////////////////////////////////////////////

    error Input_Length_Mismatch();
    error Only_Admin();

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////

    event RolesSet(address sender, uint256 userId, uint256[] userIds, bytes32 channelHash, Roles[] roles);

    //////////////////////////////////////////////////
    // STORAGE
    //////////////////////////////////////////////////

    IdRegistry public idRegistry;
    DelegateRegistry public delegateRegistry;
    mapping(address target => mapping(uint256 userId => mapping(bytes32 channelHash => Roles))) public userRoleForChannel;

    //////////////////////////////////////////////////
    // CONSTRUCTOR
    //////////////////////////////////////////////////

    constructor(address _idRegistry, address _delegateRegistry) {
        idRegistry = IdRegistry(_idRegistry);
        delegateRegistry = DelegateRegistry(_delegateRegistry);
    }

    //////////////////////////////////////////////////
    // WRITES
    //////////////////////////////////////////////////

    function initializeWithData(uint256 userId, bytes32 channelHash, bytes memory data) external {
        // Cache msg.sender
        address sender = msg.sender;
        // Decode incoming data
        (uint256[] memory userIds, Roles[] memory roles) = abi.decode(data, (uint256[], Roles[]));
        // Check for valid inputs
        if (userIds.length != roles.length) revert Input_Length_Mismatch();
        // Set roles
        for (uint256 i; i < userIds.length; ++i) {
            userRoleForChannel[sender][userIds[i]][channelHash] = roles[i];
        }
        // Emit for indexing
        emit RolesSet(sender, userId, userIds, channelHash, roles);
    }

    // NOTE: have weird thing where you need to specify target since initializeWithData route
    //       means setting that as base variable for mapping
    function editRoles(
        address target,
        uint256 userId,
        uint256[] memory userIds,
        bytes32 channelHash,
        Roles[] memory roles
    ) external {
        // Check authorization status for msg.sender
        address sender = _authorizationCheck(
            idRegistry, delegateRegistry, userId, msg.sender, address(this), this.editRoles.selector
        );
        // Check for valid inputs
        if (userIds.length != roles.length) revert Input_Length_Mismatch();
        // Set roles
        for (uint256 i; i < userIds.length; ++i) {
            if (userRoleForChannel[target][userIds[i]][channelHash] < Roles.ADMIN) revert Only_Admin();
            userRoleForChannel[target][userIds[i]][channelHash] = roles[i];
        }
        // Emit for indexing
        emit RolesSet(sender, userId, userIds, channelHash, roles);
    }

    //////////////////////////////////////////////////
    // READS
    //////////////////////////////////////////////////

    // NOTE: Uses role based access for all `access` returns
    function access(uint256 userId, bytes32 channelId, uint256 /*access*/) external view returns (uint256) {
        return uint256(userRoleForChannel[msg.sender][userId][channelId]);
    }

    // NOTE: Uses role based access for all `access` returns
    function getAccess(address target, uint256 userId, bytes32 channelId, uint256 /*access*/)
        external
        view
        returns (uint256)
    {
        return uint256(userRoleForChannel[target][userId][channelId]);
    }
}
