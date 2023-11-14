// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test, console2} from "forge-std/Test.sol";

import {ECDSA} from "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import {IERC1271} from "openzeppelin-contracts/interfaces/IERC1271.sol";
import {EntryPoint} from "light-account/lib/account-abstraction/contracts/core/EntryPoint.sol";
import {LightAccount} from "light-account/src/LightAccount.sol";
import {LightAccountFactory} from "light-account/src/LightAccountFactory.sol";

import {IdRegistry} from "../src/IdRegistry.sol";

// TODO: add transfer + backup REVERT pathways

contract IdRegistryTest is Test {       

    //////////////////////////////////////////////////
    // CONSTANTS
    //////////////////////////////////////////////////   

    address public constant MOCK_REGISTER_BACKUP = address(0x123);
    bytes public constant ZERO_BYTES = new bytes(0);

    //////////////////////////////////////////////////
    // PARAMETERS
    //////////////////////////////////////////////////  

    /* Actors */
    Account public eoaOwner;
    Account public eoaAttestor;
    Account public eoaMalicious;     

    /* IMP infra */
    IdRegistry public idRegistry;

    /* Smart account infra */
    EntryPoint public entryPoint;
    LightAccount public account;
    LightAccount public account2;
    LightAccount public contractOwnedAccount;
    uint256 public salt = 1;

    //////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////   

    // Set-up called before each test
    function setUp() public {
        eoaOwner = makeAccount("owner");
        eoaAttestor = makeAccount("attestor");
        eoaMalicious = makeAccount("malicious");

        idRegistry = new IdRegistry();

        entryPoint = new EntryPoint();
        LightAccountFactory factory = new LightAccountFactory(entryPoint);

        account = factory.createAccount(eoaOwner.addr, salt);
        account2 = factory.createAccount(eoaAttestor.addr, salt);
    }    

    //////////////////////////////////////////////////
    // REGISTER TESTS
    //////////////////////////////////////////////////   

    function test_register() public {
        // prank into eoa that is the owner of light account
        vm.startPrank(eoaOwner.addr); 
        // call `execute` on light account, passing in instructions to call `register` on idRegistry from light account 
        account.execute(address(idRegistry), 0, abi.encodeCall(IdRegistry.register, (MOCK_REGISTER_BACKUP, ZERO_BYTES)));
        require(idRegistry.idCount() == 1, "id count not incremented correctly");
        require(idRegistry.idOwnedBy(address(account)) == 1, "id 1 not registered correctly");
        require(idRegistry.backupFor(1) == MOCK_REGISTER_BACKUP, "id backup not set correctly");
    }

    function test_Revert_OneIdPerAddress_register() public {
        // prank into eoa that is the owner of light account
        vm.startPrank(eoaOwner.addr); 
        // call `execute` on light account, passing in instructions to call `register` on idRegistry from light account 
        account.execute(address(idRegistry), 0, abi.encodeCall(IdRegistry.register, (MOCK_REGISTER_BACKUP, ZERO_BYTES)));
        // expect revert because account can only have one id registered at a time
        vm.expectRevert(abi.encodeWithSignature("Has_Id()"));
        account.execute(address(idRegistry), 0, abi.encodeCall(IdRegistry.register, (MOCK_REGISTER_BACKUP, ZERO_BYTES)));
    }      

    //////////////////////////////////////////////////
    // TRANSFER TESTS
    //////////////////////////////////////////////////   

    function test_transfer() public {
        // prank into eoa that is the owner of light account
        vm.startPrank(eoaOwner.addr); 
        // call `execute` on light account, passing in instructions to call `register` on idRegistry from light account 
        account.execute(address(idRegistry), 0, abi.encodeCall(IdRegistry.register, (MOCK_REGISTER_BACKUP, ZERO_BYTES)));
        // expect emit
        vm.expectEmit(true, true, true, false, address(idRegistry));
        // emit what we expect
        emit IdRegistry.TransferInitiated(address(account), address(account2), 1);        
        // Call initiate transfer
        account.execute(address(idRegistry), 0, abi.encodeCall(IdRegistry.initiateTransfer, (address(account2))));
        vm.stopPrank();
        // prank into eoa that is the owner of light account 2
        vm.startPrank(eoaAttestor.addr);
        // expect emit
        vm.expectEmit(true, true, true, false, address(idRegistry));
        // emit what we expect
        emit IdRegistry.TransferComplete(address(account), address(account2), 1);            
        // Call initiate transfer
        account2.execute(address(idRegistry), 0, abi.encodeCall(IdRegistry.acceptTransfer, (1)));    
        // Check that id ownership has been updated correctly  
        assertEq(idRegistry.idOwnedBy(address(account2)), 1);  
        assertEq(idRegistry.idOwnedBy(address(account)), 0);  
    }

    function test_cancelTransfer() public {
        // prank into eoa that is the owner of light account
        vm.startPrank(eoaOwner.addr); 
        // call `execute` on light account, passing in instructions to call `register` on idRegistry from light account 
        account.execute(address(idRegistry), 0, abi.encodeCall(IdRegistry.register, (MOCK_REGISTER_BACKUP, ZERO_BYTES)));
        // Initate transfer
        account.execute(address(idRegistry), 0, abi.encodeCall(IdRegistry.initiateTransfer, (address(account2))));
        // expect emit
        vm.expectEmit(true, true, true, false, address(idRegistry));
        // emit what we expect
        emit IdRegistry.TransferCancelled(address(account), address(account2), 1);            
        // Call cancel transfer
        account.execute(address(idRegistry), 0, abi.encodeCall(IdRegistry.cancelTransfer, (1)));        
    }    

    //////////////////////////////////////////////////
    // BACKUP TESTS
    //////////////////////////////////////////////////   

    function test_backup() public {
        // Define backup destination address
        address backupDestination = address(0x555);
        // prank into eoa that is the owner of light account
        vm.prank(eoaOwner.addr); 
        // call `execute` on light account, passing in instructions to call `register` on idRegistry from light account 
        account.execute(address(idRegistry), 0, abi.encodeCall(IdRegistry.register, (MOCK_REGISTER_BACKUP, ZERO_BYTES)));
        // prank into backup address
        vm.prank(MOCK_REGISTER_BACKUP);
        // expect emit
        vm.expectEmit(true, true, true, false, address(idRegistry));
        // emit what we expect
        emit IdRegistry.Backup(address(account), backupDestination, 1);        
        // call backup
        idRegistry.backup(address(account), backupDestination);          
        // Check if storage updated as expected
        assertEq(idRegistry.idOwnedBy(backupDestination), 1);
        assertEq(idRegistry.backupFor(1), MOCK_REGISTER_BACKUP);
        assertEq(idRegistry.idOwnedBy(address(account)), 0);
    }   
}