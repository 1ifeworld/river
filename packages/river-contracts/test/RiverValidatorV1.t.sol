// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {Test, console2} from "forge-std/Test.sol";

import {RiverValidatorV1} from "../src/validators/RiverValidatorV1.sol";

// TODO: add in update operator tests

contract RiverValidatorV1Test is Test {       

    //////////////////////////////////////////////////
    // EVENTS
    ////////////////////////////////////////////////// 

    event OperatorUpdated(address indexed operator); 
    event Validate(uint256 indexed id, bool indexed status);

    //////////////////////////////////////////////////
    // CONSTANTS
    //////////////////////////////////////////////////   
    
    bytes public constant zeroBytes = new bytes(0);

    //////////////////////////////////////////////////
    // PARAMETERS
    //////////////////////////////////////////////////  

    /* Actors */
    Account public eoa_operator;
    Account public eoa_malicious;

    /* River infra */
    RiverValidatorV1 public riverValidator;

    //////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////   

    // Set-up called before each test
    function setUp() public {
        eoa_operator = makeAccount("operator");
        eoa_malicious = makeAccount("malicious");
        riverValidator = new RiverValidatorV1(eoa_operator.addr);
    }    

    //////////////////////////////////////////////////
    // VALIDATE TESTS
    //////////////////////////////////////////////////   

    function test_validate() public {
        // prank into eoa that was set as operator for validator
        vm.startPrank(eoa_operator.addr); 
        // expect emit
        vm.expectEmit(true, true, true, false, address(riverValidator));
        // emit what we expect
        emit Validate(1, true);
        // call validate on riverValidator
        riverValidator.validate(1, true);
    }           

    function test_Revert_OnlyOperator_validate() public {
        // prank into eoa that was set as operator for validator
        vm.startPrank(eoa_malicious.addr); 
        // Expect revert because validate being called by non operator
        vm.expectRevert(abi.encodeWithSignature("Only_Operator()"));
        // call validate on riverValidator
        riverValidator.validate(1, true);
    }          

    //////////////////////////////////////////////////
    // UPDATE OPERATOR TESTS
    //////////////////////////////////////////////////       
}