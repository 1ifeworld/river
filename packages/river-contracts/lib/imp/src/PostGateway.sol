// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {IPostGateway} from "./interfaces/IPostGateway.sol";

/**
 * @title PostGateway
 * @author Lifeworld
 */
contract PostGateway is IPostGateway {

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////    

    /**
     * @dev Emit an event when `post()` is called
     *
     * @param sender    Address of the account calling `post()`
     */
    event Post(address indexed sender);    

    //////////////////////////////////////////////////
    // POST
    //////////////////////////////////////////////////

    /**
     * @inheritdoc IPostGateway
     */
    function post(bytes calldata input) external {
        emit Post(msg.sender);
    }    

    /**
     * @inheritdoc IPostGateway
     */
    function postBatch(bytes[] calldata inputs) external {
        address sender = msg.sender;
        for (uint256 i; i < inputs.length; ++i) {
            emit Post(sender);
        }        
    }        
}