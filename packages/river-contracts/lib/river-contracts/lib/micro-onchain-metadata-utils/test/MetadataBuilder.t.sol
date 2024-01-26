// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/MetadataBuilder.sol";

contract CounterTest is Test {
    function testEncodeURI() public {
        assertEq(
            MetadataBuilder.encodeURI("application/json", '{"test": true}'),
            "data:application/json;base64,eyJ0ZXN0IjogdHJ1ZX0="
        );
        assertEq(
            MetadataBuilder.encodeURI("application/json", '{"test": "maing"}'),
            "data:application/json;base64,eyJ0ZXN0IjogIm1haW5nIn0="
        );
    }

    function testGenerateJSON() public {
        MetadataBuilder.JSONItem[]
            memory items = new MetadataBuilder.JSONItem[](1);
        items[0].key = "testing";
        items[0].value = "okay";
        items[0].quote = true;

        assertEq(
            MetadataBuilder.generateEncodedJSON(items),
            "data:application/json;base64,eyJ0ZXN0aW5nIjogIm9rYXkifQ=="
        );

        string memory jsonResult = MetadataBuilder.generateJSON(items);

        assertEq(jsonResult, '{"testing": "okay"}');
        vm.parseJson(jsonResult);
    }

    function testGenerateJSONArrayFull() public {
        MetadataBuilder.JSONItem[]
            memory array = new MetadataBuilder.JSONItem[](2);
        array[0].value = "testing";
        array[0].quote = true;
        array[1].value = '23';
        array[1].quote = false;

        string memory arrayResult = MetadataBuilder.generateJSONArray(array);
        assertEq(arrayResult, '["testing",23]');
    }

    function testGenerateJSONArraySingle() public {
        MetadataBuilder.JSONItem[]
            memory array = new MetadataBuilder.JSONItem[](1);
        array[0].value = "true";
        array[0].quote = false;
        string memory arrayResult = MetadataBuilder.generateJSONArray(array);
        assertEq(arrayResult, "[true]");
    }

    function testGenerateJSONArrayEmpty() public {
        MetadataBuilder.JSONItem[]
            memory emptyArray = new MetadataBuilder.JSONItem[](0);
        string memory arrayResult = MetadataBuilder.generateJSONArray(
            emptyArray
        );
        assertEq(arrayResult, "[]");
    }

    function testGenerateJSONEmptyObject() public {
        MetadataBuilder.JSONItem[]
            memory emptyItems = new MetadataBuilder.JSONItem[](0);
        string memory result = MetadataBuilder.generateJSON(emptyItems);
        assertEq(result, "{}");
    }

    function testGenerateJSONMoreItems() public {
        MetadataBuilder.JSONItem[]
            memory attributes = new MetadataBuilder.JSONItem[](1);
        attributes[0].key = "minted_at";
        attributes[0].value = "23004025925";
        attributes[0].quote = false;

        MetadataBuilder.JSONItem[]
            memory items = new MetadataBuilder.JSONItem[](2);
        items[0].key = "testing";
        items[0].value = "okay";
        items[0].quote = true;
        items[1].key = "attributes";
        items[1].value = MetadataBuilder.generateJSON(attributes);
        items[1].quote = false;

        assertEq(
            MetadataBuilder.generateEncodedJSON(items),
            "data:application/json;base64,eyJ0ZXN0aW5nIjogIm9rYXkiLCJhdHRyaWJ1dGVzIjogeyJtaW50ZWRfYXQiOiAyMzAwNDAyNTkyNX19"
        );

        string memory jsonResult = MetadataBuilder.generateJSON(items);
        assertEq(
            jsonResult,
            '{"testing": "okay","attributes": {"minted_at": 23004025925}}'
        );
        vm.parseJson(jsonResult);
    }
}
