// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {MetadataBuilder} from "micro-onchain-metadata-utils/MetadataBuilder.sol";
import {MetadataJSONKeys} from "micro-onchain-metadata-utils/MetadataJSONKeys.sol";
import {Strings} from "openzeppelin-contracts/utils/Strings.sol";

/**
 * @title NftRenderer
 * @author Lifeworld 
 */
contract NftRenderer {

    function render(bytes memory data) external pure returns (string memory uri) {
        // Fetch + decode data from pointer
        (
            uint256 chainId, 
            address tokenContract, 
            uint256 tokenId,
            bool hasId
        ) = abi.decode(data, (uint256, address, uint256, bool));
        // Initialize JSON fields
        MetadataBuilder.JSONItem[] memory items = new MetadataBuilder.JSONItem[](4);
        // Set JSON fields
        items[0].key = "chainId";
        items[0].value = Strings.toString(chainId);
        items[0].quote = true;
        items[1].key = "contract";
        items[1].value = Strings.toHexString(tokenContract);
        items[1].quote = true;
        items[2].key = "id";
        items[2].value = Strings.toString(tokenId);
        items[2].quote = true;        
        items[3].key = "hasId";
        items[3].value = _hasIdConverter(hasId);
        items[3].quote = true;        
        // Generate base64 encoded json and set to uri
        uri = MetadataBuilder.generateEncodedJSON(items);        
    }

    function _hasIdConverter(bool hasId) internal pure returns (string memory) {
        if (hasId) {
            return "true";
        }
        return "false";
    }    
}