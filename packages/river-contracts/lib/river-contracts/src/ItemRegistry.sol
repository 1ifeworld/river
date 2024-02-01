// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "sstore2/SSTORE2.sol";
import "solidity-bytes-utils/BytesLib.sol";
import {IdRegistry} from "./IdRegistry.sol";
import {DelegateRegistry} from "./DelegateRegistry.sol";
import {ChannelRegistry} from "./ChannelRegistry.sol";
import {IItemRegistry} from "./interfaces/IItemRegistry.sol";
import {IRoles} from "./interfaces/IRoles.sol";
import {IRenderer} from "./interfaces/IRenderer.sol";
import {Auth} from "./abstract/Auth.sol";
import {Hash} from "./abstract/Hash.sol";
import {Salt} from "./abstract/Salt.sol";
import {EIP712} from "./abstract/EIP712.sol";
import {Signatures} from "./abstract/Signatures.sol";
// import {Nonces} from "./abstract/Nonces.sol";

/*
    TODO:
    BETTER UNDERSTAND IF NEED TO ADD NONCE CHECKS
    BACK INTO SIGNATURE FUNCTIONS. ESP FOR UPDATE ADMINS?
*/

/**
 * @title ItemRegistry
 * @author Lifeworld
 */
contract ItemRegistry is IItemRegistry, IRoles, EIP712, Signatures, Auth, Hash, Salt {
    //////////////////////////////////////////////////
    // TYPES
    //////////////////////////////////////////////////

    struct Target {
        uint256 userId;
        uint256 itemId;
    }
    
    enum Actions {
        ADD,
        REMOVE
    }

    //////////////////////////////////////////////////
    // ERRORS
    //////////////////////////////////////////////////

    error No_Add_Access();
    error No_Remove_Access();
    error No_Edit_Access();
    error Input_Length_Mismatch();
    error Only_Admin();

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////

    // event New(address sender, uint256 userId, bytes32[] itemIds, address[] pointers);
    event New(address sender, uint256 userId, bytes32 itemId, address pointer);
    event Add(address sender, uint256 userId, bytes32 itemId, bytes32 channelId);
    event Remove(address sender, uint256 userId, bytes32 itemId, bytes32 channelId);
    event Edit(address sender, uint256 userId, bytes32 itemId, address pointer);
    event UpdateAdmins(address sender, uint256 userId, bytes32 itemId, uint256[] userIds, bool[] statuses);

    //////////////////////////////////////////////////
    // CONSTANTS
    //////////////////////////////////////////////////

    bytes32 public constant NEW_ITEMS_TYPEHASH = 
        keccak256("NewItems(uint256 userId,Init[] inits,uint256 deadline)");

    bytes32 public constant ADD_TYPEHASH =
        keccak256("Add(uint256 userId,bytes32 itemId,bytes32 channelId,uint256 deadline)");

    bytes32 public constant ADD_BATCH_TYPEHASH =
        keccak256("Add(uint256 userId,bytes32 itemId,bytes32[] channelIds,uint256 deadline)");        

    bytes32 public constant REMOVE_TYPEHASH =
        keccak256("Remove(uint256 userId,bytes32 itemId,bytes32 channelId,uint256 deadline)");

    bytes32 public constant EDIT_TYPEHASH =
        keccak256("Edit(uint256 userId,bytes32 itemId,bytes data,uint256 deadline)");

    bytes32 public constant UPDATE_ADMINS_TYPEHASH =
        keccak256("UpdateAdmins(uint256 userId,bytes32 itemId,uint256[] userIds,bool[] statuses,uint256 deadline)");

    //////////////////////////////////////////////////
    // STORAGE
    //////////////////////////////////////////////////

    address public immutable self;
    IdRegistry public idRegistry;
    DelegateRegistry public delegateRegistry;
    ChannelRegistry public channelRegistry;
    mapping(uint256 userId => uint256 itemCount) public itemCountForUser;
    mapping(bytes32 itemId => address pointer) public dataForItem;
    mapping(bytes32 itemId => mapping(uint256 userId => bool status)) public isAdminForItem;
    mapping(bytes32 itemId => mapping(bytes32 channelId => uint256 userId)) public addedItemToChannel;
    // mapping(uint256 userId => mapping(bytes32 itemId => address pointer)) public dataForItem;
    // mapping(uint256 userId => mapping(uint256 itemId => mapping(uint256 userId => bool status))) public isAdminForItem;
    // mapping(uint256 userId => mapping(bytes32 itemId => mapping(bytes32 channelId => uint256 targetUserId))) public addedItemToChannel;    

    //////////////////////////////////////////////////
    // CONSTRUCTOR
    //////////////////////////////////////////////////

    constructor(address _idRegistry, address _delegateRegistry, address _channelRegistry) EIP712("ItemRegistry", "1") {
        self = address(this);
        idRegistry = IdRegistry(_idRegistry);
        delegateRegistry = DelegateRegistry(_delegateRegistry);
        channelRegistry = ChannelRegistry(_channelRegistry);
    }

    //////////////////////////////////////////////////
    // DIRECT WRITES
    //////////////////////////////////////////////////

    // rename "newItems" to "create"?
    // TODO: batch remove funciton?
    // TODO: batch edit function?
    // TODO: batch update admins function?
    // TODO: make function(s) external for gas?

    // NOTE: consider adding arbitrary data field to inits to enable signature based access control for channels
    function newItems(uint256 userId, Init[] memory inits)
        public
        returns (bytes32[] memory itemIds, address[] memory pointers)
    {
        // Check authorization status for msg.sender    
        address sender = _auth(userId, msg.sender, this.newItems.selector);
        // Create new items
        (itemIds, pointers) = _unsafeNewItems(sender, userId, inits);
    }

    // NOTE: consider adding arbitrary data field here to enable signature based access control
    // Adds existing item to an existing channel
    function add(uint256 userId, bytes32 itemId, bytes32 channelId) public {
        // Check authorization status for msg.sender    
        address sender = _auth(userId, msg.sender, this.add.selector);
        // Check user for add access + process add
        _unsafeAdd(sender, userId, itemId, channelId);
    }

    // NOTE: consider adding arbitrary data field here to enable signature based access control
    // Adds existing item to an existing channel
    function addBatch(uint256 userId, bytes32 itemId, bytes32[] calldata channelIds) public {
        // Check authorization status for msg.sender    
        address sender = _auth(userId, msg.sender, this.add.selector);
        // Check user for add access + process add
        for (uint256 i; i < channelIds.length; ++i) {
            _unsafeAdd(sender, userId, itemId, channelIds[i]);
        }
    }

    function remove(uint256 userId, bytes32 itemId, bytes32 channelId) public {
        // Check authorization status for msg.sender    
        address sender = _auth(userId, msg.sender, this.remove.selector);
        // Check user for remove access + process remove
        _unsafeRemove(sender, userId, itemId, channelId);
    }

    // Passing in bytes(0) for data effectively "deletes" the contents of the item
    function edit(uint256 userId, bytes32 itemId, bytes calldata data) public returns (address pointer) {
        // Check authorization status for msg.sender    
        address sender = _auth(userId, msg.sender, this.edit.selector);
        // Check user for edit access + process edit
        pointer = _unsafeEdit(sender, userId, itemId, data);
    }

    function updateAdmins(uint256 userId, bytes32 itemId, uint256[] memory userIds, bool[] memory statuses) public {
        // Check authorization status for msg.sender    
        address sender = _auth(userId, msg.sender, this.updateAdmins.selector);
        // Check user for updateAdmins access + process updateAdmins
        _unsafeUpdateAdmins(sender, userId, itemId, userIds, statuses);
    }

    //////////////////////////////////////////////////
    // SIGNATURE BASED WRITES
    //////////////////////////////////////////////////

    // NOTE: consider adding arbitrary data field to inits to enable signature based access control for channels
    function newItemsFor(address signer, uint256 userId, Init[] memory inits, uint256 deadline, bytes calldata sig)
        public
        returns (bytes32[] memory itemIds, address[] memory pointers)
    {
        // Verify valid transaction being generated on behalf of signer
        _verifyNewItemsSig(userId, inits, signer, deadline, sig);
        // Check authorization status for signer   
        address authorizedSigner = _auth(userId, signer, this.newItems.selector);
        // Create new items
        (itemIds, pointers) = _unsafeNewItems(authorizedSigner, userId, inits);
    }

    function addFor(
        address signer,
        uint256 userId,
        bytes32 itemId,
        bytes32 channelId,
        uint256 deadline,
        bytes calldata sig
    ) public {
        // Verify valid transaction being generated on behalf of signer
        _verifyAddSig(userId, itemId, channelId, signer, deadline, sig);
        // Check authorization status for signer   
        address authorizedSigner = _auth(userId, signer, this.add.selector);
        // Check user for add access + process add
        _unsafeAdd(authorizedSigner, userId, itemId, channelId);
    }

    function addBatchFor(
        address signer,
        uint256 userId,
        bytes32 itemId,
        bytes32[] calldata channelIds,
        uint256 deadline,
        bytes calldata sig
    ) public {
        // Verify valid transaction being generated on behalf of signer
        _verifyAddBatchSig(userId, itemId, channelIds, signer, deadline, sig);
        // Check authorization status for signer   
        address authorizedSigner = _auth(userId, signer, this.add.selector);
        // Check user for add access + process add
        for (uint256 i; i < channelIds.length; ++i) {
            _unsafeAdd(authorizedSigner, userId, itemId, channelIds[i]);
        }
    }

    function removeFor(
        address signer,
        uint256 userId,
        bytes32 itemId,
        bytes32 channelId,
        uint256 deadline,
        bytes calldata sig
    ) public {
        // Verify valid transaction being generated on behalf of signer
        _verifyRemoveSig(userId, itemId, channelId, signer, deadline, sig);
        // Check authorization status for signer   
        address authorizedSigner = _auth(userId, signer, this.remove.selector);
        // Check user for remove access + process remove
        _unsafeRemove(authorizedSigner, userId, itemId, channelId);
    }

    // Passing in bytes(0) for data effectively "deletes" the contents of the item
    function editFor(
        address signer,
        uint256 userId,
        bytes32 itemId,
        bytes calldata data,
        uint256 deadline,
        bytes calldata sig
    ) external returns (address pointer) {
        // Verify valid transaction being generated on behalf of signer
        _verifyEditSig(userId, itemId, data, signer, deadline, sig);
        // Check authorization status for signer   
        address authorizedSigner = _auth(userId, signer, this.edit.selector);
        // Check user for edit access + process edit
        pointer = _unsafeEdit(authorizedSigner, userId, itemId, data);
    }

    function updateAdminsFor(
        address signer,
        uint256 userId,
        bytes32 itemId,
        uint256[] memory userIds,
        bool[] memory statuses,
        uint256 deadline,
        bytes calldata sig
    ) public {
        // Verify valid transaction being generated on behalf of signer
        _verifyUpdateAdminsSig(userId, itemId, userIds, statuses, signer, deadline, sig);
        // Check authorization status for signer   
        address authorizedSigner = _auth(userId, signer, this.updateAdmins.selector);
        // Check user for updateAdmins access + process updateAdmins
        _unsafeUpdateAdmins(authorizedSigner, userId, itemId, userIds, statuses);
    }

    //////////////////////////////////////////////////
    // READS
    //////////////////////////////////////////////////

    function itemUri(bytes32 itemId) public view returns (string memory uri) {
        bytes memory encodedBytes = SSTORE2.read(dataForItem[itemId]);
        address renderer = BytesLib.toAddress(encodedBytes, 0);
        bytes memory data = BytesLib.slice(encodedBytes, 20, (encodedBytes.length - 20));
        uri = IRenderer(renderer).render(data);
    }

    function generateItemHash(uint256 userId, uint256 itemId) external pure returns (bytes32) {
        return _generateHash(userId, itemId, ITEM_SALT);
    }

    //////////////////////////////////////////////////
    // INTERNAL
    //////////////////////////////////////////////////

    function _unsafeNewItems(address sender, uint256 userId, Init[] memory inits)
        internal
        returns (bytes32[] memory itemIds, address[] memory pointers)
    {
        // Setup memory arrays to return
        itemIds = new bytes32[](inits.length);
        pointers = new address[](inits.length);
        // Set for loop
        for (uint256 i; i < inits.length; ++i) {
            // Increment user item count + generate itemId
            itemIds[i] = _generateHash(userId, ++itemCountForUser[userId], ITEM_SALT);
            // Store item data
            pointers[i] = dataForItem[itemIds[i]] = SSTORE2.write(inits[i].data);
            // Set item admin
            isAdminForItem[itemIds[i]][userId] = true;
            // Emit `new` data for indexing
            emit New(sender, userId, itemIds[i], pointers[i]);
            // Check for user add access + process add to channel(s)
            for (uint256 j; j < inits[i].channels.length; ++j) {
                _unsafeAdd(sender, userId, itemIds[i], inits[i].channels[j]);
            }
        }
    }

    function _unsafeAdd(address sender, uint256 userId, bytes32 itemId, bytes32 channelId) internal {
        if (channelRegistry.getAccess(userId, channelId, uint256(Actions.ADD)) < uint256(Roles.MEMBER)) {
            revert No_Add_Access();
        }
        addedItemToChannel[itemId][channelId] = userId;
        emit Add(sender, userId, itemId, channelId);
    }

    function _unsafeRemove(address sender, uint256 userId, bytes32 itemId, bytes32 channelId) internal {
        if (userId != addedItemToChannel[itemId][channelId]) {
            if (channelRegistry.getAccess(userId, channelId, uint256(Actions.REMOVE)) < uint256(Roles.ADMIN)) {
                revert No_Remove_Access();
            }
        }
        delete addedItemToChannel[itemId][channelId];
        emit Remove(sender, userId, itemId, channelId);
    }

    // item specific
    function _unsafeEdit(address sender, uint256 userId, bytes32 itemId, bytes calldata data)
        internal
        returns (address pointer)
    {
        if (!isAdminForItem[itemId][userId]) revert No_Edit_Access();
        pointer = dataForItem[itemId] = SSTORE2.write(data);
        emit Edit(sender, userId, itemId, pointer);
    }

    // item specific access control
    function _unsafeUpdateAdmins(
        address sender,
        uint256 userId,
        bytes32 itemId,
        uint256[] memory userIds,
        bool[] memory statuses
    ) internal {
        // Check for valid inputs
        if (userIds.length != statuses.length) revert Input_Length_Mismatch();
        // Check if userId is admin
        if (!isAdminForItem[itemId][userId]) revert Only_Admin();
        // Update admin statuses for specified userIds
        for (uint256 i; i < userIds.length; ++i) {
            isAdminForItem[itemId][userIds[i]] = statuses[i];
        }
        // Emit for indexing
        emit UpdateAdmins(sender, userId, itemId, userIds, statuses);
    }

    ////////////////////////////////////////////////////////////////
    // SIGNATURE VERIFICATION HELPERS
    ////////////////////////////////////////////////////////////////

    function _verifyNewItemsSig(         
        uint256 userId, 
        IItemRegistry.Init[] memory inits, 
        address signer,
        uint256 deadline, 
        bytes memory sig
    ) internal view {
        _verifySig(
            _hashTypedDataV4(keccak256(abi.encode(NEW_ITEMS_TYPEHASH, userId, inits, deadline))),
            signer,
            deadline,
            sig
        );
    }          

    function _verifyAddSig(        
        uint256 userId, 
        bytes32 itemHash,
        bytes32 channelHash,
        address signer, 
        uint256 deadline, 
        bytes memory sig
    ) internal view {
        _verifySig(
            _hashTypedDataV4(keccak256(abi.encode(ADD_TYPEHASH, userId, itemHash, channelHash, deadline))),
            signer,
            deadline,
            sig
        );
    }  

    function _verifyAddBatchSig(
        uint256 userId, 
        bytes32 itemHash,
        bytes32[] calldata channelHashes,
        address signer, 
        uint256 deadline, 
        bytes memory sig
    ) internal view {
        _verifySig(
            _hashTypedDataV4(keccak256(abi.encode(ADD_BATCH_TYPEHASH, userId, itemHash, channelHashes, deadline))),
            signer,
            deadline,
            sig
        );
    }             

    function _verifyRemoveSig(        
        uint256 userId, 
        bytes32 itemHash,
        bytes32 channelHash,
        address signer, 
        uint256 deadline, 
        bytes memory sig
    ) internal view {
        _verifySig(
            _hashTypedDataV4(keccak256(abi.encode(REMOVE_TYPEHASH, userId, itemHash, channelHash, deadline))),
            signer,
            deadline,
            sig
        );
    }      

    function _verifyEditSig(        
        uint256 userId, 
        bytes32 itemHash,
        bytes calldata data,
        address signer, 
        uint256 deadline, 
        bytes memory sig
    ) internal view {
        _verifySig(
            _hashTypedDataV4(keccak256(abi.encode(EDIT_TYPEHASH, userId, itemHash, data, deadline))),
            signer,
            deadline,
            sig
        );
    }     

    function _verifyUpdateAdminsSig(
        uint256 userId, 
        bytes32 itemHash,
        uint256[] memory userIds,
        bool[] memory stauses,
        address signer, 
        uint256 deadline, 
        bytes memory sig
    ) internal view {
        _verifySig(
            _hashTypedDataV4(keccak256(abi.encode(
                UPDATE_ADMINS_TYPEHASH, 
                userId, 
                itemHash, 
                userIds, 
                stauses, 
                deadline
            ))),
            signer,
            deadline,
            sig
        );
    }          

    //////////////////////////////////////////////////
    // AUTH HELPER
    //////////////////////////////////////////////////    

    function _auth(uint256 userId, address signer, bytes4 selector) internal view returns (address) {
        return _authorizationCheck(
            idRegistry, 
            delegateRegistry, 
            userId, 
            signer, 
            self, 
            selector
        );
    } 
}
