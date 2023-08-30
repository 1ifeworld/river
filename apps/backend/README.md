## Introduction

This document outlines the schema used in the application, the relations between different entities, and the CRUD operations performed on the entities.

## Schema

The schema consists of four main entities: `Listing`, `Channel`, `Router`, and `LogicTransmitterMerkleAdmin`.

### Listing

A `Listing` represents an item listed on the platform. It has the following fields:

- `id`: A unique identifier for the listing.
- `chainId`: The blockchain chain ID associated with the listing.
- `tokenId`: The unique identifier of the token associated with the listing.
- `listingAddress`: The address of the listing.
- `hasTokenId`: A boolean indicating whether the listing has a token ID.
- `channel`: The channel associated with the listing.

### Channel

A `Channel` represents a communication channel on the platform. It has the following fields:

- `id`: A unique identifier for the channel.
- `listings`: A list of `Listing` entities associated with the channel.

### Router

A `Router` represents a router on the platform. It has the following fields:

- `id`: A unique identifier for the router.
- `press`: The press associated with the router.
- `sender`: The sender address associated with the router.
- `factory`: The factory address associated with the router.
- `pointer`: The pointer address associated with the router.
- `newPress`: The new press address associated with the router.
- `newPressData`: The new press data associated with the router.
- `createdAt`: The timestamp when the router was created.
- `transactionHash`: The transaction hash associated with the router.

### LogicTransmitterMerkleAdmin

A `LogicTransmitterMerkleAdmin` represents a logic transmitter merkle admin on the platform. It has the following fields:

- `id`: A unique identifier for the logic transmitter merkle admin.
- `press`: The press associated with the logic transmitter merkle admin.
- `merkleRoot`: The merkle root associated with the logic transmitter merkle admin.
- `accounts`: A list of accounts associated with the logic transmitter merkle admin.
- `roles`: A list of roles associated with the logic transmitter merkle admin.

## Relations

The core relationship in the application is between the Channel and Listing entities:

Channel: A Channel represents a collection on the platform. It has an id field, which is a unique identifier for the channel, and a listings field, which is a list of Listing entities associated with the channel.

Listing: A Listing represents an item listed on the platform. It has several fields, including an id field (a unique identifier for the listing), and a channel field, which is the id of the Channel entity associated with the listing.

A Channel can have multiple Listings associated with it. This association is represented by the listings field in the Channel entity, which is a list of Listing entities.

The Listing entity is linked to the Channel entity through the channel field in the Listing entity. This channel field contains the id of the associated Channel.

## CRUD Operations

The CRUD operations performed on the entities are as follows:

### Create

- A new `Channel` is created if it does not already exist in the `Router:DataSent` event handler. The `id` of the `Channel` is set to the `press` parameter from the event.
- A new `Listing` is created for each new listing in the `Router:DataSent` event handler. The `id` of the `Listing` is set to a combination of the `press` parameter and the `id` from the `newListings` array. The `data` of the `Listing` is set to the corresponding data from the `newListings` array.
- A new `Router` is created in the `Router:PressRegistered` event handler. The `id` of the `Router` is set to the `newPress` parameter from the event. The `data` of the `Router` is set to the corresponding data from the event parameters.
- A new `LogicTransmitterMerkleAdmin` is created or updated in the `LogicTransmitterMerkleAdmin:AccountRolesSet` and `LogicTransmitterMerkleAdmin:MerkleRootSet` event handlers. The `id` of the `LogicTransmitterMerkleAdmin` is set to the `press` parameter from the event. The `data` of the `LogicTransmitterMerkleAdmin` is set to the corresponding data from the event parameters.

### Read

The `read` operation is not explicitly performed in the code. However, the `findUnique` method is used to check if a `Channel` or `LogicTransmitterMerkleAdmin` already exists before creating a new one.

### Update

- The `LogicTransmitterMerkleAdmin` entity is updated in the `LogicTransmitterMerkleAdmin:AccountRolesSet` and `LogicTransmitterMerkleAdmin:MerkleRootSet` event handlers. The `accounts` and `roles` fields are updated in the `LogicTransmitterMerkleAdmin:AccountRolesSet` event handler. The `merkleRoot` field is updated in the `LogicTransmitterMerkleAdmin:MerkleRootSet` event handler.

### Delete

- The `Listing` entities associated with the `ids` parameter are deleted in the `Router:DataRemoved` event handler.

## Conclusion

This document provides an overview of the schema, relations between entities, and CRUD operations performed on the entities. It is intended to provide a quick context for anyone working with the backend code.

---

Please review the draft and let me know if there are any changes or additions you would like to make.