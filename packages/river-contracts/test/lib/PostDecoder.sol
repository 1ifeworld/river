// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

library PostDecoder {
    function decodePostInputs(bytes calldata inputs) external pure
        returns (   
            uint256,        // user id
            uint16,         // sig type
            bytes memory,   // sig
            uint96,         // post version
            uint96,         // post expiration
            bytes[] memory  // message array
        )
    {
        bytes memory rawUserId = inputs[0:32];
        bytes memory rawSigType = inputs[32:34];
        bytes memory rawSig = inputs[34:99];
        bytes memory rawVersion = inputs[99:111];
        bytes memory rawExpiration = inputs[111:123];
        bytes[] memory messageArray = abi.decode(inputs[123:], (bytes[]));

        return (
            uint256(bytes32(rawUserId)),
            uint16(bytes2(rawSigType)),
            rawSig,
            uint96(bytes12(rawVersion)),
            uint96(bytes12(rawExpiration)),
            messageArray
        );
    }    
}

library BytesHelper {
    function sliceMemoryBytesEnd(bytes calldata inputs, uint256 end) external pure returns (bytes memory) {
        return inputs[0:end];
    }
    function sliceMemoryBytesStart(bytes calldata inputs, uint256 start) external pure returns (bytes memory) {
        return inputs[start:];
    }        
}