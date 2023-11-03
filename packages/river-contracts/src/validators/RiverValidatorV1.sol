// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

/// TODO: bump to sol 0.8.22

/**
 * @title RiverValidatorV1
 * @author Lifeworld
 */
contract RiverValidatorV1 {

    //////////////////////////////////////////////////
    // ERRORS
    //////////////////////////////////////////////////   

    /// @dev Revert when the msg.sender is not riverOperator
    error Only_Operator();    

    /// @dev Revert when array input lengths do not match
    error Array_Length_Mismatch();       

    //////////////////////////////////////////////////
    // EVENTS
    //////////////////////////////////////////////////  

    /**
     * @dev Emit an event when riverOperator address changes
     *
     *      Address set as riverOperator has ability to call
     *      `updateOperator()` and `validate()` functions
     *
     * @param operator      Operator being assigned
     */
    event OperatorUpdated(address indexed operator);      

    /**
     * @dev Emit an event when validate is called
     *
     *      Delta listens to this event and sets the status
     *      for a given Id. Ids with a status of `true` will be able
     *      to produce valid events in the `NodeRegistry`.
     *      Only callable by riverOperator
     *
     * @param id            Id being validated
     */
    event Validate(uint256 indexed id, bool indexed status);

    //////////////////////////////////////////////////
    // STORAGE
    //////////////////////////////////////////////////        

    address public riverOperator;

    //////////////////////////////////////////////////
    // MODIFERS
    //////////////////////////////////////////////////      

    modifier onlyOperator() {
        if (msg.sender != riverOperator) revert Only_Operator(); 
        _;
    }

    //////////////////////////////////////////////////
    // CONSTRUCTOR
    //////////////////////////////////////////////////      

    constructor(address _riverOperator) {
        riverOperator = _riverOperator;
        emit OperatorUpdated(riverOperator);
    }

    //////////////////////////////////////////////////
    // RIVER OPERATOR CONTROLS
    //////////////////////////////////////////////////   

    /**
     * @notice Update operator address
     *
     * @param operator      Address to set as riverOperator
     */  
    function updateOperator(address operator) onlyOperator external {        
        // Assign new operator and emit for indexing     
        riverOperator = operator;
        emit OperatorUpdated(riverOperator);
    }

    //////////////////////////////////////////////////
    // ID VALIDATION
    //////////////////////////////////////////////////    

    /**
     * @notice Signal validation status for a given id
     *
     * @param id            Numeric id to validate
     * @param status        T/F status to assign to id
     */  
    function validate(uint256 id, bool status) onlyOperator external {
        // Emit validation event for target id
        emit Validate(id, status);      
    }

    /**
     * @notice Batch version of `validate()`
     *
     * @param ids           Numeric ids to validate
     * @param statuses      T/F statuses to assign to ids
     */  
    function validateBatch(uint256[] memory ids, bool[] calldata statuses) onlyOperator external {
        if (ids.length != statuses.length) revert Array_Length_Mismatch();
        for (uint256 i; i < ids.length; ++i) {
            // Emit validation event for target id
            emit Validate(ids[i], statuses[i]); 
        }
    }    
}