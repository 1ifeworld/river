// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test, console2} from "forge-std/Test.sol";

import {IdRegistry} from "../src/IdRegistry.sol";
import {DelegateRegistry} from "../src/DelegateRegistry.sol";

contract DelegateRegistryTest is Test {       

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

    function test_assign_delegate() public {
        // prank into eoa that will call register and delegate functions
        vm.startPrank(eoa_owner.addr); 
        // call register on idRegistry
        idRegistry.register(mockRegisterBackup, zeroBytes);
        // expect emit
        vm.expectEmit(true, true, true, false, address(delegateRegistry));
        // emit what we expect
        emit DelegateRegistry.Delegate(1, eoa_delegate.addr, true);
        // call updateDelegate on delegateRegistry
        delegateRegistry.updateDelegate(eoa_delegate.addr, true);
        // check expected values
        require(delegateRegistry.isDelegate(1, eoa_delegate.addr) == true, "delegate set incorrectly");
    }           

    function test_remove_delegate() public {
        // prank into eoa that will call register and delegate functions
        vm.startPrank(eoa_owner.addr); 
        // call register on idRegistry
        idRegistry.register(mockRegisterBackup, zeroBytes);
        // call updateDelegate on delegateRegistry
        delegateRegistry.updateDelegate(eoa_delegate.addr, true);
        /*
            SHIFT TO DELEGATION REMOVAL
        */
        // expect emit
        vm.expectEmit(true, true, true, false, address(delegateRegistry));
        // emit what we expect
        emit DelegateRegistry.Delegate(1, eoa_delegate.addr, false);
        // call updateDelegate on delegateRegistry
        delegateRegistry.updateDelegate(eoa_delegate.addr, false);        
        // check expected values
        require(delegateRegistry.isDelegate(1, eoa_delegate.addr) == false, "delegate set incorrectly");        
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