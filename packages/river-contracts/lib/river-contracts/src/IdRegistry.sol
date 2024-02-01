// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {SignatureChecker} from "openzeppelin-contracts/utils/cryptography/SignatureChecker.sol";
import {Pausable} from "openzeppelin-contracts/utils/Pausable.sol";
import {IIdRegistry} from "./interfaces/IIdRegistry.sol";
import {Auth} from "./abstract/Auth.sol";
import {Hash} from "./abstract/Hash.sol";
import {Salt} from "./abstract/Salt.sol";
import {Signatures} from "./abstract/Signatures.sol";
import {EIP712} from "./abstract/EIP712.sol";
import {Nonces} from "./abstract/Nonces.sol";
import {Trust} from "./abstract/Trust.sol";

/**
 * @title IdRegistry
 * @author Lifeworld
 */
contract IdRegistry is IIdRegistry, Trust, Pausable, Signatures, EIP712, Nonces {
    ////////////////////////////////////////////////////////////////
    // CONSTANTS
    ////////////////////////////////////////////////////////////////

    string public constant NAME = "River ID";

    string public constant VERSION = "2024.01.24";

    bytes32 public constant REGISTER_TYPEHASH =
        keccak256("Register(address to,address recovery,uint256 nonce,uint256 deadline)");          

    bytes32 public constant TRANSFER_TYPEHASH =
        keccak256("Transfer(uint256 rid,address to,uint256 nonce,uint256 deadline)");

    bytes32 public constant TRANSFER_AND_CHANGE_RECOVERY_TYPEHASH =
        keccak256("TransferAndChangeRecovery(uint256 rid,address to,address recovery,uint256 nonce,uint256 deadline)");

    bytes32 public constant CHANGE_RECOVERY_ADDRESS_TYPEHASH =
        keccak256("ChangeRecoveryAddress(uint256 rid,address from,address to,uint256 nonce,uint256 deadline)");

    ////////////////////////////////////////////////////////////////
    // STORAGE
    ////////////////////////////////////////////////////////////////

    uint256 public idCounter;
    mapping(address owner => uint256 rid) public idOf;
    mapping(uint256 rid => address owner) public custodyOf;
    mapping(uint256 rid => address recovery) public recoveryOf;

    ////////////////////////////////////////////////////////////////
    // CONSTRUCTOR
    ////////////////////////////////////////////////////////////////

    /**
     * @notice Set the owner of the contract to the provided _initialOwner.
     *
     * @param _initialOwner Initial owner address.
     *
     */
    // solhint-disable-next-line no-empty-blocks
    constructor(address _initialOwner) Trust(_initialOwner) EIP712("River IdRegistry", "1") {}

    ////////////////////////////////////////////////////////////////
    // REGISTER LOGIC
    ////////////////////////////////////////////////////////////////

    function register(address recovery) external returns (uint256 rid) {
        return _register(msg.sender, recovery);
    }

    function registerFor(
        address to, 
        address recovery, 
        uint256 deadline, 
        bytes calldata sig
    ) external trust returns (uint256 rid) {
        // Revert if signature is invalid
        _verifyRegisterSig({to: to, recovery: recovery, deadline: deadline, sig: sig});
        return _register(to, recovery);
    }

    // NOTE: will revert if msg.sender != Trust.trustedCaller
    function _register(address to, address recovery) internal trust returns (uint256 rid) {
        rid = _unsafeRegister(to, recovery);
        emit Register(to, idCounter, recovery);
    }

    // NOTE: will revert if contract is PAUSED
    function _unsafeRegister(address to, address recovery) internal whenNotPaused returns (uint256 rid) {
        /* Revert if the target(to) has an rid */
        if (idOf[to] != 0) revert Has_Id();
        /* Incrementing before assignment ensures that no one gets the 0 rid. */
        rid = ++idCounter;
        /* Register id */
        idOf[to] = rid;
        custodyOf[rid] = to;
        recoveryOf[rid] = recovery;
    }

    ////////////////////////////////////////////////////////////////
    // TRANSFER LOGIC
    ////////////////////////////////////////////////////////////////

    function transfer(address to, uint256 deadline, bytes calldata toSig) external {
        uint256 fromId = _validateTransfer(msg.sender, to);

        /* Revert if signature is invalid */
        _verifyTransferSig({rid: fromId, to: to, deadline: deadline, signer: to, sig: toSig});

        _unsafeTransfer(fromId, msg.sender, to);
    }

    function transferFor(
        address from,
        address to,
        uint256 fromDeadline,
        bytes calldata fromSig,
        uint256 toDeadline,
        bytes calldata toSig
    ) external {
        uint256 fromId = _validateTransfer(from, to);

        /* Revert if either signature is invalid */
        _verifyTransferSig({rid: fromId, to: to, deadline: fromDeadline, signer: from, sig: fromSig});
        _verifyTransferSig({rid: fromId, to: to, deadline: toDeadline, signer: to, sig: toSig});

        _unsafeTransfer(fromId, from, to);
    }

    function transferAndChangeRecovery(address to, address recovery, uint256 deadline, bytes calldata sig) external {
        uint256 fromId = _validateTransfer(msg.sender, to);

        /* Revert if signature is invalid */
        _verifyTransferAndChangeRecoverySig({
            rid: fromId,
            to: to,
            recovery: recovery,
            deadline: deadline,
            signer: to,
            sig: sig
        });

        _unsafeTransfer(fromId, msg.sender, to);
        _unsafeChangeRecovery(fromId, recovery);
    }

    function transferAndChangeRecoveryFor(
        address from,
        address to,
        address recovery,
        uint256 fromDeadline,
        bytes calldata fromSig,
        uint256 toDeadline,
        bytes calldata toSig
    ) external {
        uint256 fromId = _validateTransfer(from, to);

        /* Revert if either signature is invalid */
        _verifyTransferAndChangeRecoverySig({
            rid: fromId,
            to: to,
            recovery: recovery,
            deadline: fromDeadline,
            signer: from,
            sig: fromSig
        });
        _verifyTransferAndChangeRecoverySig({
            rid: fromId,
            to: to,
            recovery: recovery,
            deadline: toDeadline,
            signer: to,
            sig: toSig
        });

        _unsafeTransfer(fromId, from, to);
        _unsafeChangeRecovery(fromId, recovery);
    }    

    /**
     * @dev Retrieve rid and validate sender/recipient
     */
    function _validateTransfer(address from, address to) internal view returns (uint256 fromId) {
        fromId = idOf[from];

        /* Revert if the sender has no id */
        if (fromId == 0) revert Has_No_Id();
        /* Revert if recipient has an id */
        if (idOf[to] != 0) revert Has_Id();
    }

    /**
     * @dev Transfer the rid to another address without checking invariants.
     */
    function _unsafeTransfer(uint256 id, address from, address to) internal whenNotPaused {
        idOf[to] = id;
        custodyOf[id] = to;
        delete idOf[from];

        emit Transfer(from, to, id);
    }

    ////////////////////////////////////////////////////////////////
    // RECOVERY LOGIC
    ////////////////////////////////////////////////////////////////

    function changeRecoveryAddress(address recovery) external whenNotPaused {
        /* Revert if the caller does not own an rid */
        uint256 ownerId = idOf[msg.sender];
        if (ownerId == 0) revert Has_No_Id();

        _unsafeChangeRecovery(ownerId, recovery);
    }    

    function changeRecoveryAddressFor(
        address owner,
        address recovery,
        uint256 deadline,
        bytes calldata sig
    ) external whenNotPaused {
        /* Revert if the caller does not own an rid */
        uint256 ownerId = idOf[owner];
        if (ownerId == 0) revert Has_No_Id();

        _verifyChangeRecoveryAddressSig({
            rid: ownerId,
            from: recoveryOf[ownerId],
            to: recovery,
            deadline: deadline,
            signer: owner,
            sig: sig
        });

        _unsafeChangeRecovery(ownerId, recovery);
    }    

    /**
     * @dev Change recovery address without checking invariants.
     */
    function _unsafeChangeRecovery(uint256 id, address recovery) internal whenNotPaused {
        /* Change the recovery address */
        recoveryOf[id] = recovery;

        emit ChangeRecoveryAddress(id, recovery);
    }

    function recover(address from, address to, uint256 deadline, bytes calldata toSig) external {
        /* Revert if from does not own an rid */
        uint256 fromId = idOf[from];
        if (fromId == 0) revert Has_No_Id();

        /* Revert if the caller is not the recovery address */
        address caller = msg.sender;
        if (recoveryOf[fromId] != caller) revert Unauthorized();

        /* Revert if destination(to) already has an rid */
        if (idOf[to] != 0) revert Has_Id();

        /* Revert if signature is invalid */
        _verifyTransferSig({rid: fromId, to: to, deadline: deadline, signer: to, sig: toSig});

        emit Recover(from, to, fromId);
        _unsafeTransfer(fromId, from, to);
    }    

    function recoverFor(
        address from,
        address to,
        uint256 recoveryDeadline,
        bytes calldata recoverySig,
        uint256 toDeadline,
        bytes calldata toSig
    ) external {
        /* Revert if from does not own an rid */
        uint256 fromId = idOf[from];
        if (fromId == 0) revert Has_No_Id();

        /* Revert if destination(to) already has an rid */
        if (idOf[to] != 0) revert Has_Id();

        /* Revert if either signature is invalid */
        _verifyTransferSig({
            rid: fromId,
            to: to,
            deadline: recoveryDeadline,
            signer: recoveryOf[fromId],
            sig: recoverySig
        });
        _verifyTransferSig({rid: fromId, to: to, deadline: toDeadline, signer: to, sig: toSig});

        emit Recover(from, to, fromId);
        _unsafeTransfer(fromId, from, to);
    }    

    ////////////////////////////////////////////////////////////////
    // PERMISSIONED ACTIONS
    ////////////////////////////////////////////////////////////////

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    ////////////////////////////////////////////////////////////////
    // VIEWS
    ////////////////////////////////////////////////////////////////

    function verifyRidSignature(
        address custodyAddress,
        uint256 rid,
        bytes32 digest,
        bytes calldata sig
    ) external view returns (bool isValid) {
        isValid = idOf[custodyAddress] == rid && SignatureChecker.isValidSignatureNow(custodyAddress, digest, sig);
    }    

    ////////////////////////////////////////////////////////////////
    // SIGNATURE VERIFICATION HELPERS
    ////////////////////////////////////////////////////////////////

    function _verifyRegisterSig(address to, address recovery, uint256 deadline, bytes memory sig) internal {
        _verifySig(
            _hashTypedDataV4(keccak256(abi.encode(REGISTER_TYPEHASH, to, recovery, _useNonce(to), deadline))),
            to,
            deadline,
            sig
        );
    }    

    function _verifyTransferSig(uint256 rid, address to, uint256 deadline, address signer, bytes memory sig) internal {
        _verifySig(
            _hashTypedDataV4(keccak256(abi.encode(TRANSFER_TYPEHASH, rid, to, _useNonce(signer), deadline))),
            signer,
            deadline,
            sig
        );
    }    

    function _verifyTransferAndChangeRecoverySig(
        uint256 rid,
        address to,
        address recovery,
        uint256 deadline,
        address signer,
        bytes memory sig
    ) internal {
        _verifySig(
            _hashTypedDataV4(
                keccak256(
                    abi.encode(TRANSFER_AND_CHANGE_RECOVERY_TYPEHASH, rid, to, recovery, _useNonce(signer), deadline)
                )
            ),
            signer,
            deadline,
            sig
        );
    }    

    function _verifyChangeRecoveryAddressSig(
        uint256 rid,
        address from,
        address to,
        uint256 deadline,
        address signer,
        bytes memory sig
    ) internal {
        _verifySig(
            _hashTypedDataV4(
                keccak256(abi.encode(CHANGE_RECOVERY_ADDRESS_TYPEHASH, rid, from, to, _useNonce(signer), deadline))
            ),
            signer,
            deadline,
            sig
        );
    }    
}