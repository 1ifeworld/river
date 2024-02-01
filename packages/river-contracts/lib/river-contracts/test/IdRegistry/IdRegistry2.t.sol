// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {IdRegistry} from "../../src/IdRegistry.sol";
import {IIdRegistry} from "../../src/interfaces/IIdRegistry.sol";
import {IdRegistryTestSuite} from "./IdRegistryTestSuite.sol";

/*
    TODO: Missing event testing
*/

contract IdRegistryTest is IdRegistryTestSuite {       

    //////////////////////////////////////////////////
    // CONSTANTS
    //////////////////////////////////////////////////   

    //////////////////////////////////////////////////
    // STORAGE
    //////////////////////////////////////////////////   

    //////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////   

    //////////////////////////////////////////////////
    // CONSTRUCTOR + SETUP TESTS
    //////////////////////////////////////////////////      

    // initial owner
    // initial trusted caller
    // id count = 0

    //////////////////////////////////////////////////
    // REGISTER TESTS
    //////////////////////////////////////////////////  

    // success
    //      assert id count
    //      assert idOf
    //      assert custodyOf
    //      assert recoveryOf
    //      expectEmit IdRegistry.Register(to, id, recovery)

    // revert
    //      if paused
    //          no one can get thru?
    //      if trusted
    //          if caller not trusted address
    //          if caller owns id
    //      if not trusted
    //          if caller owns id

    //////////////////////////////////////////////////
    // REGISTER FOR TESTS
    //////////////////////////////////////////////////   

    // success
    //      assert id count
    //      assert idOf
    //      assert custodyOf
    //      assert recoveryOf
    //      expectEmit IdRegistry.Register(to, id, recovery)    

    // revert
    //      if paused
    //          no one can get thru?
    //      if trusted
    //          if caller not trusted address
    //          if target user id owns id
    //          if invalid sig
    //      if not trusted
    //          if target user id owns id
    //          if invalid sig (invalid deadline)
    //          if bad sig (bad deadline)
    
    /* generate a signature with an invalid parameter (invalid) */
    // bytes memory sig = _signRegister(recipientPk, recipient, recovery, deadline + 1);
    /* generate a signature with bad inputs */
    // bytes memory sig = abi.encodePacked(bytes32("bad sig"), bytes32(0), bytes1(0));    

    //////////////////////////////////////////////////
    // ERC1271 REGISTER FOR TESTS
    //////////////////////////////////////////////////       

    // yea

    //////////////////////////////////////////////////
    // TRANSFER TESTS
    //////////////////////////////////////////////////   

    // success
    //      assert idOf from
    //      assert idOf to
    //      assert custodyOf from
    //      assert custodyOf to
    //      assert recoveryOf from
    //      assert recoveryOf to
    //      expectEmit IdRegistry.Transfer(from, to, id)    
    //      assert recovery doesnt change
    //      assert can register again post transfer out

    // revert
    //      if paused
    //          no one can get thru
    //      if trusted
    //          if caller not trusted address
    //          if caller owns id
    //      if not trusted
    //          if caller id owns id

    //////////////////////////////////////////////////
    // TRANSFER FOR TESTS
    //////////////////////////////////////////////////   

    // success
    //      assert idOf from
    //      assert idOf to
    //      assert custodyOf from
    //      assert custodyOf to
    //      assert recoveryOf from
    //      assert recoveryOf to
    //      expectEmit IdRegistry.Transfer(from, to, id)    
    //      assert recovery doesnt change variant
    //      assert can register again post transfer out

    // revert
    //      if paused
    //          no one can get thru
    //      if trusted
    //          if caller not trusted address
    //          if target user id owns id
    //          if invalid sig
    //      if not trusted
    //          if target user id owns id
    //          if invalid sig        

    //////////////////////////////////////////////////
    // TRANSFER AND CHANGE RECOVERY TESTS
    //////////////////////////////////////////////////          

    // success
    //      assert idOf from
    //      assert idOf to
    //      assert custodyOf from
    //      assert custodyOf to
    //      assert recoveryOf from
    //      assert recoveryOf to
    //      expectEmit IdRegistry.Transfer(from, to, id)    
    //      assert recovery doesnt change if was same before
    //      assert recovery does change if was different
    //      assert can register again post transfer out

    // revert
    //      if paused
    //          no one can get thru
    //      if trusted
    //          if caller not trusted address
    //          if caller owns id
    //      if not trusted
    //          if caller id owns id    

    //////////////////////////////////////////////////
    // TRANSFER AND CHANGE RECOVERY FOR TESTS
    //////////////////////////////////////////////////        

    // vm.expectEmit(true, true, true, true);
    // emit Transfer(from, to, 1);

    // vm.expectEmit();
    // emit ChangeRecoveryAddress(fid, recovery);    

    // success
    //      assert idOf from
    //      assert idOf to
    //      assert custodyOf from
    //      assert custodyOf to
    //      assert recoveryOf from
    //      assert recoveryOf to
    //      expectEmit IdRegistry.Transfer(from, to, id)    
    //      expectEmit IdRegistry.ChangeRecoveryAddress(rid, recovery)    
    //      assert recovery doesnt change if was same before
    //      assert recovery does change if was different
    //      assert can register again post transfer out   

    // revert
    //      if paused
    //          no one can get thru
    //      if trusted
    //          if caller not trusted address
    //          if target user id owns id
    //          if invalid sig
    //      if not trusted
    //          if target user id owns id
    //          if invalid sig        

    //////////////////////////////////////////////////
    // CHANGE RECOVERY TESTS
    //////////////////////////////////////////////////      

    // success
    //      assert recoveryOf from
    //      expectEmit IdRegistry.ChangeRecoveryaddress(rid, recovery)    
    //      assert recovery doesnt change if was same before
    //      assert recovery does change if was different

    // revert
    //      if paused
    //          no one can get thru
    //      if trusted
    //          if caller not trusted address
    //          if caller doesnt own id
    //      if not trusted
    //          if caller doesnt own id            

    //////////////////////////////////////////////////
    // CHANGE RECOVERY FOR TESTS
    //////////////////////////////////////////////////          

    // success
    //      assert recoveryOf from
    //      expectEmit IdRegistry.ChangeRecoveryaddress(rid, recovery)    
    //      assert recovery doesnt change if was same before
    //      assert recovery does change if was different

    // revert
    //      if paused
    //          no one can get thru
    //      if trusted
    //          if caller not trusted address
    //          if target id doesnt own id
    //      if not trusted
    //          if target id doesnt own id  

    //////////////////////////////////////////////////
    // RECOVER TESTS
    //////////////////////////////////////////////////  

    // success
    //      assert recoveryOf from
    //      expectEmit IdRegistry.ChangeRecoveryaddress(rid, recovery)    
    //      assert recovery doesnt change if was same before
    //      assert recovery does change if was different

    // revert
    //      if paused
    //          no one can get thru
    //      if trusted
    //          if caller not trusted address
    //          if caller doesnt own id
    //      if not trusted
    //          if caller doesnt own id            


    //////////////////////////////////////////////////
    // RECOVER FOR TESTS
    //////////////////////////////////////////////////  

    //////////////////////////////////////////////////
    // OLD
    //////////////////////////////////////////////////    

    function test_sigBased_registerFor() public {
        // start prank as trusted caller
        vm.startPrank(trusted.addr);
        // generate registerfor signature
        bytes memory sig = _signRegister(
            user.key,
            user.addr,
            trusted.addr,
            _deadline()
        );
        // Set up event tests
        vm.expectEmit(true, false, false, false, address(idRegistry));    
        // Emit event with expected value
        emit IIdRegistry.Register(user.addr, 1, trusted.addr);            
        // register id to user
        uint256 rid = idRegistry.registerFor(user.addr, trusted.addr, _deadline(), sig);
        vm.stopPrank();
        // asserts
        assertEq(idRegistry.idCounter(), rid);
        assertEq(idRegistry.idOf(user.addr), rid);
        assertEq(idRegistry.custodyOf(rid), user.addr);
        assertEq(idRegistry.recoveryOf(rid), trusted.addr);
    }
}
