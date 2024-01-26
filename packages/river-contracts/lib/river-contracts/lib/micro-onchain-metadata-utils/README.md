# µ on-chain metadata utils

### Features:

1. on-chain base-64 encoding for any content type
2. on-chain json builder (supports arrays, nested content).
3. re-exports openzeppelin strings support

this is the spiritual successor of `https://github.com/ourzora/nft-editions/blob/main/contracts/IPublicSharedMetadata.sol` the public shared metadata renderer libraries within `nft-editions`.

This project may be exported and deployed on-chain as a registry, but for now is being offered in library form.

### API:

1. `MetadataBuilder`: Main class for metadata methods
   1. `generateJSON(MetadataBuilder.JSONItem[] items)`: Takes a list of items and makes a key value json object from them. Objects with empty values will be removed.
   2. `generateEncodedJSON(MetadataBuilder.JSONItem[] items)`: Same as above but returns a data-uri instead of the raw JSON string.
   3. `generateSVG(string contents, string viewBox, string width, string height)`: Generates a SVG tag and content for an SVG image.
   4. `generateEncodedSVG(string contents, string viewBox, string width, string height)`: Same as above but generates a data-uri instead of the raw SVG.
   5. `generateJSONArray(MetadataBuilder.JSONItem[] itemsArray)`: Takes an array of items and using the `value` and `quote` flags generates a JSON array. Ignores the `key` value of the object and empty `values` will be removed from the array generated.
   6. `encodeURI(string contentType, string content)`: Encodes the given content string as a base-64 data-uri with the given contentType.
2. `MetadataMIMETypes`: List of common metadata mime type constants
   1. `mimeJSON = "application/json"`
   2. `mimeSVG = "image/svg+xml"`
   3. `mimeTextPlain = "text/plain"`
3. `MetadataJSONKeys`: List of common NFT Metadata JSON keys
   1. `keyName = "name"`
   2. `keyDescription = "description"`
   3. `keyImage = "image"`
   4. `keyAnimationURL = "animation_url"`
   5. `keyAttributes = "attributes"`
   6. `keyProperties = "properties";`

* All methods are views returning strings unless otherwise noted.


```
import {MetadataBuilder} from "micro-onchain-metadata-utils/MetadataBuilder.sol";
import {MetadataJSONKeys} from "micro-onchain-metadata-utils/MetadataJSONKeys.sol";

contract NFTObject {
  function contractURI() external view returns (string memory) {
    // Build JSON object
    MetadataBuilder.JSONItem[] memory items = new MetadataBuilder.JSONItem[](2);
    items[0].key = MetadataJSONKeys.keyName;
    items[0].value = "Contract Name";
    items[0].quote = true;
    items[1].key = MetadataJSONKeys.keyImage;
    // Build Embedded SVG
    items[1].value = MetadataBuilder.generateEncodedSVG({
      contents: "<rect width='10' height='10' style='fill: red' />",
      viewBox: '0 0 10 10',
      width: '10',
      height: '10',
    });
    items[1].quote = true;

    // Build JSON Array
    MetadataBuilder.JSONItem[] memory randomNumbersArray = MetadataBuilder.JSONItem[](2);
    properties[0].value = '2';
    properties[0].quote = false;
    properties[1].value = '42';
    properties[1].quote = false;
    
    items[2].key = 'randomNumbers';
    items[2].quote = false;
    items[2].value = MetadataBuilder.generateJSON(properties);

    return MetadataBuilder.generateEncodedJSON(items);
  }
}
```