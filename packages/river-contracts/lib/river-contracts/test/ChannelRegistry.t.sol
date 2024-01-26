// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test, console2} from "forge-std/Test.sol";

import {IdRegistry} from "../src/IdRegistry.sol";
import {DelegateRegistry} from "../src/DelegateRegistry.sol";
import {ChannelRegistry} from "../src/ChannelRegistry.sol";
import {ItemRegistry} from "../src/ItemRegistry.sol";

import {RoleBasedAccess} from "../src/logic/RoleBasedAccess.sol";
import {StringRenderer} from "../src/renderer/StringRenderer.sol";
import {NftRenderer} from "../src/renderer/NftRenderer.sol";

/*
    TODO: Missing event testing
*/

contract ChannelRegistryTest is Test {       

    //////////////////////////////////////////////////
    // CONSTANTS
    //////////////////////////////////////////////////   

    string public ipfsString = "ipfs://bafybeiczsscdsbs7ffqz55asqdf3smv6klcw3gofszvwlyarci47bgf354";
    bytes public ipfsBytes = bytes("ipfs://bafybeiczsscdsbs7ffqz55asqdf3smv6klcw3gofszvwlyarci47bgf354");
    uint256 public nftChain = 31938;
    address public nftContract = address(0x666);
    address public nftId = address(72);
    bool public nftHasUd = true;    

    //////////////////////////////////////////////////
    // STORAGE
    //////////////////////////////////////////////////   

    /* contracts + accounts */
    IdRegistry public idRegistry;
    DelegateRegistry public delegateRegistry;
    ChannelRegistry public channelRegistry;
    ItemRegistry public itemRegistry;
    StringRenderer public stringRenderer;
    RoleBasedAccess public roleBasedAccess;
    RoleBasedAccess public roleBasedAccess2;
    NftRenderer public nftRenderer;
    Account public trusted;
    Account public relayer;
    Account public user;     
    Account public malicious;     
    /* values */
    uint256 public registeredUserId;
    bytes32 public firstChannelHash;
    
    //////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////   

    // Set-up called before each test
    function setUp() public {
        // accounts
        trusted = makeAccount("trusted");
        relayer = makeAccount("relayer");
        user = makeAccount("user");
        malicious = makeAccount("malicious");      
        // Start prank as trusted address
        vm.startPrank(trusted.addr);          
        // contracts
        idRegistry = new IdRegistry(trusted.addr);  
        idRegistry.setTrustedCaller(trusted.addr);        
        delegateRegistry = new DelegateRegistry(address(idRegistry));          
        channelRegistry = new ChannelRegistry(address(idRegistry), address(delegateRegistry));  
        itemRegistry = new ItemRegistry(address(idRegistry), address(delegateRegistry), address(channelRegistry));  
        roleBasedAccess = new RoleBasedAccess(address(idRegistry), address(delegateRegistry));  
        roleBasedAccess2 = new RoleBasedAccess(address(idRegistry), address(delegateRegistry));  
        stringRenderer = new StringRenderer();  
        nftRenderer = new NftRenderer();  
        vm.startPrank(user.addr);        
        console2.log(user.addr);
        // register id to user
        // registeredUserId = idRegistry.register(address(0));
        // prep create channel for user
        // bytes memory channelData = abi.encodePacked(address(stringRenderer), ipfsBytes);
        // uint256[] memory userIds = new uint256[](1);
        // userIds[0] = registeredUserId;
        // IRoles.Roles[] memory roles = new IRoles.Roles[](1);
        // roles[0] = IRoles.Roles.ADMIN;
        // bytes memory logicInit = abi.encode(userIds, roles);
        // // create new channel
        // (firstChannelHash,) = channelRegistry.newChannel(
        //     registeredUserId,
        //     channelData,
        //     address(roleBasedAccess),
        //     logicInit
        // );        
        // end prank
        vm.stopPrank();
    }    

    //////////////////////////////////////////////////
    // SIGNATURE BASED WRITES
    //////////////////////////////////////////////////    

    // function test_sigBased_newChannelFor() public {
    //     // prank into relay -- not the user
    //     vm.startPrank(relayer.addr);
    //     // prep create channel for user
    //     bytes memory channelData = abi.encodePacked(address(stringRenderer), ipfsBytes);
    //     uint256[] memory userIds = new uint256[](1);
    //     userIds[0] = registeredUserId;
    //     IRoles.Roles[] memory roles = new IRoles.Roles[](1);
    //     roles[0] = IRoles.Roles.ADMIN;
    //     bytes memory logicInit = abi.encode(userIds, roles);
    //     // generate signature for newChannelFor call
    //     bytes memory signature = _signNewChannelFor(
    //         user.key,
    //         registeredUserId,
    //         address(roleBasedAccess),
    //         _deadline()
    //     );        
    //     // create new channel
    //     (bytes32 channelId, address pointer) = channelRegistry.newChannelFor(
    //         user.addr,
    //         registeredUserId,
    //         channelData,
    //         address(roleBasedAccess),
    //         logicInit,
    //         _deadline(),
    //         signature
    //     ); 
    //     // test new channel
    //     assertEq(channelRegistry.self(), address(channelRegistry));
    //     assertEq(channelRegistry.channelCountForUser(1), 2);
    //     assertEq(channelRegistry.dataForChannel(channelId), pointer);
    //     assertEq(channelRegistry.logicForChannel(channelId), address(roleBasedAccess));
    //     assertEq(channelRegistry.channelUri(channelId), ipfsString);        
    // }

    // function test_sigBased_updateChannelDataFor() public {
    //     // prank into relay -- not the user
    //     vm.startPrank(relayer.addr);
    //     // prep new channel data
    //     string memory gotem = "gotem";
    //     bytes memory channelData = abi.encodePacked(address(stringRenderer), bytes(gotem));
    //     // generate signature for updateChannelDataFor call
    //     bytes memory signature = _signUpdateChannelDataFor(
    //         user.key,
    //         registeredUserId,
    //         firstChannelHash,
    //         _deadline()
    //     );        
    //     // update channel data
    //     address pointer = channelRegistry.updateChannelDataFor(
    //         user.addr,
    //         registeredUserId,
    //         firstChannelHash,
    //         channelData,
    //         _deadline(),
    //         signature
    //     ); 
    //     // test updated channel data
    //     assertEq(channelRegistry.dataForChannel(firstChannelHash), pointer);
    //     assertEq(channelRegistry.channelUri(firstChannelHash), gotem);        
    // }    

    // function test_sigBased_updateChannelLogicFor() public {
    //     // prank into relay -- not the user
    //     vm.startPrank(relayer.addr);
    //     // prep new logic init
    //     uint256[] memory userIds = new uint256[](1);
    //     userIds[0] = registeredUserId;
    //     IRoles.Roles[] memory roles = new IRoles.Roles[](1);
    //     roles[0] = IRoles.Roles.MEMBER;
    //     bytes memory logicInit = abi.encode(userIds, roles);
    //     // generate signature for updateChannelLogicFor call
    //     bytes memory signature = _signUpdateChannelLogicFor(
    //         user.key,
    //         registeredUserId,
    //         firstChannelHash,
    //         address(roleBasedAccess2),
    //         _deadline()
    //     );    
    //     // update channel logic
    //     channelRegistry.updateChannelLogicFor(
    //         user.addr,
    //         registeredUserId,
    //         firstChannelHash,
    //         address(roleBasedAccess2),
    //         logicInit,
    //         _deadline(),
    //         signature
    //     ); 
    //     // test updated channel logic
    //     assertEq(channelRegistry.logicForChannel(firstChannelHash), address(roleBasedAccess2));
    //     assertEq(roleBasedAccess2.getAccess(address(channelRegistry), 1, firstChannelHash, 0), uint256(IRoles.Roles.MEMBER));
    // }             

    //////////////////////////////////////////////////
    // HELPERS
    //////////////////////////////////////////////////  

    function _deadline() internal view returns (uint256 deadline) {
        deadline = block.timestamp + 1;
    }

    function _sign(uint256 privateKey, bytes32 digest) internal returns (bytes memory sig) {
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
        sig = abi.encodePacked(r, s, v);
        assertEq(sig.length, 65);
    }                       

    function _signNewChannelFor(
        uint256 pk,
        uint256 userId,
        address logic,
        uint256 deadline
    ) internal returns (bytes memory signature) {
        bytes32 digest = channelRegistry.hashTypedDataV4(
            keccak256(abi.encode(channelRegistry.NEW_CHANNEL_TYPEHASH(), userId, logic, deadline))
        );
        signature = _sign(pk, digest);
    }          

    function _signUpdateChannelDataFor(
        uint256 pk,
        uint256 userId,
        bytes32 channelId,
        uint256 deadline
    ) internal returns (bytes memory signature) {
        bytes32 digest = channelRegistry.hashTypedDataV4(
            keccak256(abi.encode(channelRegistry.UPDATE_CHANNEL_DATA_TYPEHASH(), userId, channelId, deadline))
        );
        signature = _sign(pk, digest);
    }         

    function _signUpdateChannelLogicFor(
        uint256 pk,
        uint256 userId,
        bytes32 channelId,
        address logic,
        uint256 deadline
    ) internal returns (bytes memory signature) {
        bytes32 digest = channelRegistry.hashTypedDataV4(
            keccak256(abi.encode(channelRegistry.UPDATE_CHANNEL_LOGIC_TYPEHASH(), userId, channelId, logic, deadline))
        );
        signature = _sign(pk, digest);
    }            
}
