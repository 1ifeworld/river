// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

/**
 * @title StringRenderer
 * @author Lifeworld 
 */
contract StringRenderer {
    function render(bytes memory data) external pure returns (string memory uri) {
        uri = string(data);
    }
}