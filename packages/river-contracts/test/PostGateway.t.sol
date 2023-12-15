// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test, console2} from "forge-std/Test.sol";

import {PostGateway} from "imp/PostGateway.sol";
import {ECDSA} from "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import {SignatureChecker} from "openzeppelin-contracts/utils/cryptography/SignatureChecker.sol";

import {PostDecoder, BytesHelper} from "./lib/PostDecoder.sol";

contract PostGatewayTest is Test {       
    using ECDSA for bytes32;

    //////////////////////////////////////////////////
    // CONSTANTS
    //////////////////////////////////////////////////   

    // // IMP TYPES
    // uint256 constant ACCESS_101 = 101;    // adminsWithMembers setup
    // uint256 constant PUB_201 = 201;       // setUri
    // uint256 constant CHAN_301 = 301;      // setUri
    // uint256 constant CHAN_302 = 302;      // addItem
    // uint256 constant CHAN_303 = 303;      // removeItem

    //////////////////////////////////////////////////
    // PARAMETERS
    //////////////////////////////////////////////////   

    PostGateway public postGateway;
    Account public relayer;
    Account public user;     
    
    uint256 userId = 1;
    uint96 expiration = 2;
    uint96 version = 0;
    uint16 sigType = 0;
    uint96 msgType = 201;
    bytes msgBody = bytes("ipfs://bafybeiczsscdsbs7ffqz55asqdf3smv6klcw3gofszvwlyarci47bgf354");

    //////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////   

    // Set-up called before each test
    function setUp() public {
        postGateway = new PostGateway();  
        relayer = makeAccount("relayer");
        user = makeAccount("user");
    }    

    //////////////////////////////////////////////////
    // POST MESSAGE TESTS
    //////////////////////////////////////////////////  

    function test_postExampleMessage() public {
        // Prank into relayer account
        vm.startPrank(relayer.addr);
        // Form message array contents
        bytes[] memory msgArray = new bytes[](1);
        msgArray[0] = abi.encodePacked(msgType, msgBody);
        // Create signature -- signed hash of encodePacked expiration + messages
        (bytes32 hash, bytes memory sig) = signPost(user.key, version, expiration, msgArray);
        // Generate inputs for post call
        bytes memory postInputs = abi.encodePacked(
            userId,
            sigType,
            sig,
            version,
            expiration,
            abi.encode(msgArray)
        ); 
        // Call `post()`
        postGateway.post(postInputs);        
        // Run sig tests
        assertEq(SignatureChecker.isValidSignatureNow(user.addr, hash, sig), true);        
        // Test creatation of all of the data from post inputs
        (            
            uint256 reconstructedUserId,
            uint16 reconstructedSigType,
            bytes memory reconstructedSig,
            uint96 reconstructedVersion,
            uint96 reconstructedExpiration,
            bytes[] memory reconstructedMessageArray
        ) = PostDecoder.decodePostInputs(postInputs);
        // Test recreation
        assertEq(reconstructedUserId, userId);
        assertEq(reconstructedSigType, sigType);
        assertEq(reconstructedSig, sig);
        assertEq(reconstructedVersion, version);
        assertEq(reconstructedExpiration, expiration);
        assertEq(keccak256(abi.encode(reconstructedMessageArray)), keccak256(abi.encode(msgArray)));
        {
            bytes memory reconstructedMessageIndex0 = reconstructedMessageArray[0];
            bytes memory reconstructedRawMsgType = BytesHelper.sliceMemoryBytesEnd(reconstructedMessageIndex0, 12);
            bytes memory reconstructedMsgBody = BytesHelper.sliceMemoryBytesStart(reconstructedMessageIndex0, 12);   
            assertEq(uint96(bytes12(reconstructedRawMsgType)), msgType);
            assertEq(reconstructedMsgBody, msgBody);         
        }
    }        

    //////////////////////////////////////////////////
    // HELPERS
    //////////////////////////////////////////////////  


    function _sign(uint256 privateKey, bytes32 digest) internal pure returns (bytes memory) {
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
        return abi.encodePacked(r, s, v);
    }                       

    function signPost(
        uint256 privateKey, 
        uint96 vers, 
        uint96 exp, 
        bytes[] memory msgArray
    ) public pure returns (bytes32 hash, bytes memory signedPost) {
        hash = keccak256(abi.encode(vers, exp, msgArray)).toEthSignedMessageHash();
        signedPost = _sign(privateKey, hash);
    }    
}

