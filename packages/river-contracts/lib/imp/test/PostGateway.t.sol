// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test, console2} from "forge-std/Test.sol";

import {PostGateway} from "../../src/PostGateway.sol";

contract PostGatewayTest is Test {       

    //////////////////////////////////////////////////
    // PARAMETERS
    //////////////////////////////////////////////////   

    PostGateway public postGateway;
    Account public relayer;  

    //////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////   

    // Set-up called before each test
    function setUp() public {
        postGateway = new PostGateway();  
        relayer = makeAccount("relayer");
    }    

    //////////////////////////////////////////////////
    // POST TESTS
    //////////////////////////////////////////////////  

    function test_post() public {
        // Prank into relayer account
        vm.startPrank(relayer.addr);
        // Set up event tests
        vm.expectEmit(true, false, false, false, address(postGateway));    
        // Emit event with expected value
        emit PostGateway.Post(relayer.addr);           
        // Call `post()`
        postGateway.post(new bytes(0));
    }
}