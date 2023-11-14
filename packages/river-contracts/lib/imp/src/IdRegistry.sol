// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {IIdRegistry} from "./interfaces/IIdRegistry.sol";

/**
 * @title IdRegistry
 * @author Lifeworld
 */
contract IdRegistry is IIdRegistry {

    //////////////////////////////////////////////////
    // ERRORS
    //////////////////////////////////////////////////   

    /// @dev Revert when the destination must be empty but has an id
    error Has_Id();    

    /// @dev Revert when the caller must have an id but does not have one
    error Has_No_Id();

    /// @dev Revert when caller is not designated transfer recipient
    error Not_Transfer_Recipient();

    /// @dev Revert when caller is not designated transfer initiator
    error Not_Transfer_Initiator();

    /// @dev Revert when caller is not a designated backup addrss
    error Unauthorized_Backup();

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////    

    /**
     * @dev Emit an event when a new id is registered
     *
     *      Ids are unique identifiers that can be registered to an account an never repeat
     *
     * @param to            Account calling `register()`
     * @param id            The id being registered
     * @param backup        Account assigned as a backup for the given id
     * @param data          Data to be associated with registration of id (optional)
     */
    event Register(address indexed to, uint256 indexed id, address backup, bytes data);

    /**
     * @dev Emit an event when an id transfer is initiated
     *
     * @param from      Where the id is being transfered from
     * @param to        The destination of id if transfer is completed
     * @param id        The id being transfered
     */
    event TransferInitiated(address indexed from, address indexed to, uint256 indexed id);    

    /**
     * @dev Emit an event when an id transfer is cancelled
     *
     * @param from      Where the id is being transfered from
     * @param to        The destination of id if transfer is completed
     * @param id        The id being transfered
     */
    event TransferCancelled(address indexed from, address indexed to, uint256 indexed id);     

    /**
     * @dev Emit an event when an id is transferred
     *
     * @param from      Where the id is being transfered from
     * @param to        The destination of id if transfer is completed
     * @param id        The id being transfered
     */
    event TransferComplete(address indexed from, address indexed to, uint256 indexed id);

    /**
     * @dev Emit an event when an id's backup address processs a transfer
     *
     * @param from The custody address that previously owned the id
     * @param to   The custody address that now owns the id
     * @param id   The id
     */
    event Backup(address indexed from, address indexed to, uint256 indexed id);    

    /**
     * @dev Emit an event when a id's backup address changes. It is possible for this
     *      event to emit a backup address that is the same as the previously set value
     *
     * @param id       The id whose backup address was changed
     * @param backup   The new backup address
     */
    event ChangeBackupAddress(uint256 indexed id, address indexed backup);    

    //////////////////////////////////////////////////
    // STORAGE
    //////////////////////////////////////////////////        

    /**
     * @inheritdoc IIdRegistry
     */
    uint256 public idCount;

    /**
     * @inheritdoc IIdRegistry
     */
    mapping(address => uint256) public idOwnedBy;

    /**
     * @inheritdoc IIdRegistry
     */    
    mapping(uint256 => address) public backupFor;    

    /**
     * @dev Stores pendingTransfers info for all ids
     *
     * @custom:param id     Numeric id
     */
    mapping(uint256 => PendingTransfer) public pendingTransfers;

    //////////////////////////////////////////////////
    // VIEWS
    //////////////////////////////////////////////////    

    /**
     * @inheritdoc IIdRegistry
     */  
    function transferPendingForId(uint256 id) external view returns (PendingTransfer memory) {
        return pendingTransfers[id];
    }    

    //////////////////////////////////////////////////
    // ID REGISTRATION
    //////////////////////////////////////////////////    

    /**
     * @inheritdoc IIdRegistry
     */
    function register(address backupAddress, bytes calldata data) external returns (uint256 id) {
        // Cache msg.sender
        address sender = msg.sender;        
        // Revert if the sender already has an id
        if (idOwnedBy[sender] != 0) revert Has_Id();    
        // Increment idCount
        id = ++idCount;
        // Assign id to owner
        idOwnedBy[sender] = id;
        // Assign backup to id
        backupFor[id] = backupAddress;
        emit Register(sender, id, backupAddress, data);        
    }

    //////////////////////////////////////////////////
    // ID TRANSFER
    //////////////////////////////////////////////////       

    /**
     * @inheritdoc IIdRegistry
     */    
    function initiateTransfer(address recipient) external {
        // Cache msg.sender
        address sender = msg.sender;
        // Retrieve id for given sender
        uint256 fromId = idOwnedBy[sender];        
        // Check if sender has an id
        if (fromId == 0) revert Has_No_Id();
        // Update pendingTransfers storage
        pendingTransfers[fromId] = PendingTransfer({
            from: sender,
            to: recipient
        });
        emit TransferInitiated({from: sender, to: recipient, id: fromId});
    }

    /**
     * @inheritdoc IIdRegistry
     */    
    function acceptTransfer(uint256 id) external {
        // Reterieve pendingTransfer info for givenId
        PendingTransfer memory pendingTransfer = pendingTransfers[id];
        // Check if msg.sender is recipient address
        if (msg.sender != pendingTransfer.to) revert Not_Transfer_Recipient();
        // Check that pendingTransfer.to doesn't already own id
        if (idOwnedBy[pendingTransfer.to] != 0) revert Has_Id();
        // Execute transfer process
        _unsafeTransfer(id, pendingTransfer.from, pendingTransfer.to);
        // Clear pendingTransfer storage for given id
        delete pendingTransfers[id];
        // Emit event for indexing
        emit TransferComplete(pendingTransfer.from, pendingTransfer.to, id);        
    }

    /**
     * @inheritdoc IIdRegistry
     */ 
    function cancelTransfer(uint256 id) external {
        // Reterieve pendingTransfer info for givenId
        PendingTransfer memory pendingTransfer = pendingTransfers[id];
        // Check if msg.sender is "from" address
        if (msg.sender != pendingTransfer.from) revert Not_Transfer_Initiator();        
        // Clear pendingTransfer for given id
        delete pendingTransfers[id];
        // Emit event for indexing
        emit TransferCancelled({from: pendingTransfer.from, to: pendingTransfer.to, id: id});
    }

    /**
     * @dev Transfer id without checking invariants
     */    
    function _unsafeTransfer(uint256 id, address from, address to) internal {
        // Delete ownership of designated id from "from" address
        delete idOwnedBy[from];        
        // Assign ownership of designated id to "to" address
        idOwnedBy[to] = id;
    }

    //////////////////////////////////////////////////
    // ID RECOVERY
    //////////////////////////////////////////////////   

    function changeBackupAddress(address backupAddress) external {
        // Retrieve id for msg.sender
        uint256 id = idOwnedBy[msg.sender];
        // Revert if sender does not own id
        if (id == 0) revert Has_No_Id();
        // Update backup address
        backupFor[id] = backupAddress;
        // Emit for indexing
        emit ChangeBackupAddress(id, backupAddress);
    }       

    function backup(address from, address to) external {
        // Retrieve id for 
        uint256 id = idOwnedBy[from];
        // Revert if from address does not own id
        if (id == 0) revert Has_No_Id();        
        // Cache sender address
        address sender = msg.sender;
        // Check if sender is recovery address for id
        if (backupFor[id] != sender) revert Unauthorized_Backup();
        // Check if designated to address already owns id
        if (idOwnedBy[to] != 0) revert Has_Id();
        // Process backup transfer
        _unsafeTransfer(id, from, to);
        // Emit for indexing
        emit Backup(from, to, id);
    }
}
