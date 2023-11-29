// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

// TODO: missing definitions for `changeBackup` and `backup`

interface IIdRegistry {
    
    //////////////////////////////////////////////////
    // TYPES
    //////////////////////////////////////////////////

    /**
     *  @notice State of id transfer
     *
     *  @param from     Address initiating transfer
     *  @param to       Address specified as transfer recipient
     */
    struct PendingTransfer {
        address from;
        address to;
    }

    //////////////////////////////////////////////////
    // STORAGE
    //////////////////////////////////////////////////

    /**
     * @notice Tracks number of ids registered
     */
    function idCount() external view returns (uint256);

    /**
     * @notice Tracks id registered to a given account
     */
    function idOwnedBy(address account) external view returns (uint256);

    /**
     * @notice Tracks backup address registered to a given id
     */
    function backupFor(uint256 id) external view returns (address);

    /**
     * @notice Tracks pendingTransfer info for given id
     */
    function transferPendingForId(uint256 id) external view returns (PendingTransfer memory);      

    //////////////////////////////////////////////////
    // ID REGISTRATION
    //////////////////////////////////////////////////

    /**
     * @notice Register a new id by incrementing the idCount. Callable by anyone.
     *
     * @param backup      Address to set as backup for id
     * @param data        Aribtary data to emit in Register event
     */
    function register(address backup, bytes memory data) external returns (uint256);

    //////////////////////////////////////////////////
    // ID TRANSFER
    //////////////////////////////////////////////////    

    /**
     * @notice Initate 2-step transfer process for an id
     *         Can only be called by `address idOwner`
     *         Doesnt include hasId check on recipient because
     *         check occurs on `acceptTranfser` side
     *         Invariant: address(0) cannot call `initiateTransfer`
     *
     * @param recipient     Address who can accept id transfer
     */
    function initiateTransfer(address recipient) external;    

    /**
     * @notice Complete 2-step transfer process for an id
     *         Can only be called by `address recipient` set during `initateTransfer`
     *         Doesnt include id exists check because only
     *         onwners of an id can call `initiateTransfer`
     *         Invariant: address(0) cannot call `acceptTransfer`
     *
     * @param id        Id to accept transfer for
     */
    function acceptTransfer(uint256 id) external;        

    /**
     * @notice Cancel pending transfer process for an id
     *         Can only be called by `address from` set during `initateTransfer`
     *
     * @param id        Id to cancel transfer for
     */
    function cancelTransfer(uint256 id) external;   

    //////////////////////////////////////////////////
    // ID RECOVERY
    //////////////////////////////////////////////////

    /// TODO: Missing recovery functionality
}
