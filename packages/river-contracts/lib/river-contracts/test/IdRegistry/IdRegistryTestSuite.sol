// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {IdRegistry} from "../../src/IdRegistry.sol";
import {TestSuiteSetup} from "../TestSuiteSetup.sol";

/* solhint-disable state-visibility */

abstract contract IdRegistryTestSuite is TestSuiteSetup {
    IdRegistry public idRegistry;

    function setUp() public virtual override {
        super.setUp();
        vm.startPrank(trusted.addr);
        idRegistry = new IdRegistry(trusted.addr);
        idRegistry.setTrustedCaller(trusted.addr);
        vm.stopPrank();
    }

    /*//////////////////////////////////////////////////////////////
                              TEST HELPERS
    //////////////////////////////////////////////////////////////*/

    function _deadline() internal view returns (uint256 deadline) {
        deadline = block.timestamp + 1;
    }    

    function _register(address caller) internal returns (uint256 rid) {
        rid = _registerWithRecovery(caller, address(0));
    }

    function _registerWithRecovery(address caller, address recovery) internal returns (uint256 rid) {
        vm.prank(trusted.addr);
        idRegistry.disableTrustedOnly();

        vm.prank(caller);
        rid = idRegistry.register(recovery);
    }

    function _registerFor(uint256 callerPk, uint40 _deadline) internal {
        _registerForWithRecovery(callerPk, address(0), _deadline);
    }

    function _registerForWithRecovery(uint256 callerPk, address recovery, uint40 _deadline) internal {
        uint256 deadline = _boundDeadline(_deadline);
        callerPk = _boundPk(callerPk);

        address caller = vm.addr(callerPk);
        bytes memory sig = _signRegister(callerPk, caller, recovery, deadline);

        vm.prank(trusted.addr);
        idRegistry.disableTrustedOnly();

        vm.prank(caller);
        idRegistry.registerFor(caller, recovery, deadline, sig);
    }

    function _pause() public {
        vm.prank(trusted.addr);
        idRegistry.pause();
        assertEq(idRegistry.paused(), true);
    }

    function _signRegister(
        uint256 pk,
        address to,
        address recovery,
        uint256 deadline
    ) internal returns (bytes memory signature) {
        address signer = vm.addr(pk);
        bytes32 digest = idRegistry.hashTypedDataV4(
            keccak256(abi.encode(idRegistry.REGISTER_TYPEHASH(), to, recovery, idRegistry.nonces(signer), deadline))
        );
        signature = _sign(pk, digest);
    }

    function _signTransfer(
        uint256 pk,
        uint256 rid,
        address to,
        uint256 deadline
    ) internal returns (bytes memory signature) {
        address signer = vm.addr(pk);
        bytes32 digest = idRegistry.hashTypedDataV4(
            keccak256(abi.encode(idRegistry.TRANSFER_TYPEHASH(), rid, to, idRegistry.nonces(signer), deadline))
        );
        signature = _sign(pk, digest);
    }

    function _signChangeRecoveryAddress(
        uint256 pk,
        uint256 rid,
        address recovery,
        uint256 deadline
    ) internal returns (bytes memory signature) {
        address signer = vm.addr(pk);
        bytes32 digest = idRegistry.hashTypedDataV4(
            keccak256(
                abi.encode(
                    idRegistry.CHANGE_RECOVERY_ADDRESS_TYPEHASH(), rid, recovery, idRegistry.nonces(signer), deadline
                )
            )
        );
        signature = _sign(pk, digest);
    }
}