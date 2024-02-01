// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

/**
 * @title IRenderer
 * @author Lifeworld
 */
interface IRenderer {
    function render(bytes memory data) external view returns (string memory uri);
}