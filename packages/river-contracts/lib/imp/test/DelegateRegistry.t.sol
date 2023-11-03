// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {Test, console2} from "forge-std/Test.sol";

import {IdRegistry} from "../src/core/IdRegistry.sol";
import {DelegateRegistry} from "../src/core/DelegateRegistry.sol";

// TODO: Add tests that confirm all delegates are cleared for a given id post id transfer

contract DelegateRegistryTest is Test {       

    //////////////////////////////////////////////////
    // EVENTS
    ////////////////////////////////////////////////// 

    event Delegate(uint256 indexed id, uint256 nonce, address indexed target, bool status); 

    //////////////////////////////////////////////////
    // CONSTANTS
    //////////////////////////////////////////////////   
    address public constant mockRegisterBackup = address(0x123);
    bytes public constant zeroBytes = new bytes(0);

    //////////////////////////////////////////////////
    // PARAMETERS
    //////////////////////////////////////////////////  

    /* Actors */
    Account public eoa_owner;
    Account public eoa_delegate;

    /* IMP infra */
    IdRegistry public idRegistry;
    DelegateRegistry public delegateRegistry;

    //////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////   

    // Set-up called before each test
    function setUp() public {
        eoa_owner = makeAccount("owner");
        eoa_delegate = makeAccount("delegate");

        idRegistry = new IdRegistry();
        delegateRegistry = new DelegateRegistry(address(idRegistry));
    }    

    //////////////////////////////////////////////////
    // UPDATE DELEGATE TESTS
    //////////////////////////////////////////////////   

    function test_updateDelegate() public {
        // prank into eoa that will call register and delegate functions
        vm.startPrank(eoa_owner.addr); 
        // call register on idRegistry
        idRegistry.register(mockRegisterBackup, zeroBytes);
        // expect emit
        vm.expectEmit(true, true, true, false, address(delegateRegistry));
        // emit what we expect
        emit Delegate(1, 1, eoa_delegate.addr, true);
        // call updateDelegate on delegateRegistry
        delegateRegistry.updateDelegate(eoa_delegate.addr, true);
        // check expected values
        require(delegateRegistry.isDelegate(1, eoa_delegate.addr) == true, "delegate set incorrectly");
        require(delegateRegistry.idDelegates(1, 1, eoa_delegate.addr) == true, "delegate set incorrectly");
    }           

    function test_Revert_HasNoId_updateDelegate() public {
        // prank into eoa that is the owner of light account
        vm.startPrank(eoa_owner.addr); 
        // Expect revert because eoa_owner doesnt own an id yet
        vm.expectRevert(abi.encodeWithSignature("Has_No_Id()"));
        // call updateDelegate on delegateRegistry
        delegateRegistry.updateDelegate(eoa_delegate.addr, true);
    }              
}