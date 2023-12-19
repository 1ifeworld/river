// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

interface IPostGateway {

    //////////////////////////////////////////////////
    // POST
    //////////////////////////////////////////////////

    /**
     * @notice Minimal function to transmit data onchain 
     *
     * @param input     Data to post
     */
    function post(bytes calldata input) external;

    /**
     * @notice Batch version of `post()`
     *
     * @param inputs    Data to post
     */
    function postBatch(bytes[] calldata inputs) external;
}
