export default {
  scalars: [2, 3, 4, 26],
  types: {
    Query: {
      user: [
        1,
        {
          id: [2, 'BigInt!'],
          timestamp: [4],
        },
      ],
      users: [
        1,
        {
          skip: [4],
          first: [4],
          orderBy: [3],
          orderDirection: [3],
          where: [5],
          timestamp: [4],
        },
      ],
      txn: [
        6,
        {
          id: [3, 'String!'],
          timestamp: [4],
        },
      ],
      txns: [
        6,
        {
          skip: [4],
          first: [4],
          orderBy: [3],
          orderDirection: [3],
          where: [7],
          timestamp: [4],
        },
      ],
      postCounter: [
        8,
        {
          id: [3, 'String!'],
          timestamp: [4],
        },
      ],
      postCounters: [
        8,
        {
          skip: [4],
          first: [4],
          orderBy: [3],
          orderDirection: [3],
          where: [9],
          timestamp: [4],
        },
      ],
      post: [
        10,
        {
          id: [3, 'String!'],
          timestamp: [4],
        },
      ],
      posts: [
        10,
        {
          skip: [4],
          first: [4],
          orderBy: [3],
          orderDirection: [3],
          where: [11],
          timestamp: [4],
        },
      ],
      message: [
        12,
        {
          id: [3, 'String!'],
          timestamp: [4],
        },
      ],
      messages: [
        12,
        {
          skip: [4],
          first: [4],
          orderBy: [3],
          orderDirection: [3],
          where: [13],
          timestamp: [4],
        },
      ],
      channelCounter: [
        14,
        {
          id: [3, 'String!'],
          timestamp: [4],
        },
      ],
      channelCounters: [
        14,
        {
          skip: [4],
          first: [4],
          orderBy: [3],
          orderDirection: [3],
          where: [15],
          timestamp: [4],
        },
      ],
      channel: [
        16,
        {
          id: [2, 'BigInt!'],
          timestamp: [4],
        },
      ],
      channels: [
        16,
        {
          skip: [4],
          first: [4],
          orderBy: [3],
          orderDirection: [3],
          where: [19],
          timestamp: [4],
        },
      ],
      publicationCounter: [
        20,
        {
          id: [3, 'String!'],
          timestamp: [4],
        },
      ],
      publicationCounters: [
        20,
        {
          skip: [4],
          first: [4],
          orderBy: [3],
          orderDirection: [3],
          where: [21],
          timestamp: [4],
        },
      ],
      publication: [
        18,
        {
          id: [2, 'BigInt!'],
          timestamp: [4],
        },
      ],
      publications: [
        18,
        {
          skip: [4],
          first: [4],
          orderBy: [3],
          orderDirection: [3],
          where: [22],
          timestamp: [4],
        },
      ],
      referenceCounter: [
        23,
        {
          id: [3, 'String!'],
          timestamp: [4],
        },
      ],
      referenceCounters: [
        23,
        {
          skip: [4],
          first: [4],
          orderBy: [3],
          orderDirection: [3],
          where: [24],
          timestamp: [4],
        },
      ],
      reference: [
        17,
        {
          id: [2, 'BigInt!'],
          timestamp: [4],
        },
      ],
      references: [
        17,
        {
          skip: [4],
          first: [4],
          orderBy: [3],
          orderDirection: [3],
          where: [25],
          timestamp: [4],
        },
      ],
      __typename: [3],
    },
    User: {
      id: [2],
      userId: [2],
      to: [3],
      backup: [3],
      from: [3],
      __typename: [3],
    },
    BigInt: {},
    String: {},
    Int: {},
    UserFilter: {
      id: [2],
      id_not: [2],
      id_in: [2],
      id_not_in: [2],
      id_gt: [2],
      id_lt: [2],
      id_gte: [2],
      id_lte: [2],
      userId: [2],
      userId_not: [2],
      userId_in: [2],
      userId_not_in: [2],
      userId_gt: [2],
      userId_lt: [2],
      userId_gte: [2],
      userId_lte: [2],
      to: [3],
      to_not: [3],
      to_in: [3],
      to_not_in: [3],
      to_contains: [3],
      to_not_contains: [3],
      to_starts_with: [3],
      to_ends_with: [3],
      to_not_starts_with: [3],
      to_not_ends_with: [3],
      backup: [3],
      backup_not: [3],
      backup_in: [3],
      backup_not_in: [3],
      backup_contains: [3],
      backup_not_contains: [3],
      backup_starts_with: [3],
      backup_ends_with: [3],
      backup_not_starts_with: [3],
      backup_not_ends_with: [3],
      from: [3],
      from_not: [3],
      from_in: [3],
      from_not_in: [3],
      from_contains: [3],
      from_not_contains: [3],
      from_starts_with: [3],
      from_ends_with: [3],
      from_not_starts_with: [3],
      from_not_ends_with: [3],
      __typename: [3],
    },
    Txn: {
      id: [3],
      __typename: [3],
    },
    TxnFilter: {
      id: [3],
      id_not: [3],
      id_in: [3],
      id_not_in: [3],
      id_contains: [3],
      id_not_contains: [3],
      id_starts_with: [3],
      id_ends_with: [3],
      id_not_starts_with: [3],
      id_not_ends_with: [3],
      __typename: [3],
    },
    PostCounter: {
      id: [3],
      counter: [2],
      lastUpdated: [2],
      __typename: [3],
    },
    PostCounterFilter: {
      id: [3],
      id_not: [3],
      id_in: [3],
      id_not_in: [3],
      id_contains: [3],
      id_not_contains: [3],
      id_starts_with: [3],
      id_ends_with: [3],
      id_not_starts_with: [3],
      id_not_ends_with: [3],
      counter: [2],
      counter_not: [2],
      counter_in: [2],
      counter_not_in: [2],
      counter_gt: [2],
      counter_lt: [2],
      counter_gte: [2],
      counter_lte: [2],
      lastUpdated: [2],
      lastUpdated_not: [2],
      lastUpdated_in: [2],
      lastUpdated_not_in: [2],
      lastUpdated_gt: [2],
      lastUpdated_lt: [2],
      lastUpdated_gte: [2],
      lastUpdated_lte: [2],
      __typename: [3],
    },
    Post: {
      id: [3],
      timestamp: [2],
      relayer: [3],
      data: [3],
      userId: [2],
      hashType: [2],
      hash: [3],
      sigType: [2],
      sig: [3],
      version: [2],
      expiration: [2],
      messageArray: [3],
      __typename: [3],
    },
    PostFilter: {
      id: [3],
      id_not: [3],
      id_in: [3],
      id_not_in: [3],
      id_contains: [3],
      id_not_contains: [3],
      id_starts_with: [3],
      id_ends_with: [3],
      id_not_starts_with: [3],
      id_not_ends_with: [3],
      timestamp: [2],
      timestamp_not: [2],
      timestamp_in: [2],
      timestamp_not_in: [2],
      timestamp_gt: [2],
      timestamp_lt: [2],
      timestamp_gte: [2],
      timestamp_lte: [2],
      relayer: [3],
      relayer_not: [3],
      relayer_in: [3],
      relayer_not_in: [3],
      relayer_contains: [3],
      relayer_not_contains: [3],
      relayer_starts_with: [3],
      relayer_ends_with: [3],
      relayer_not_starts_with: [3],
      relayer_not_ends_with: [3],
      data: [3],
      data_not: [3],
      data_in: [3],
      data_not_in: [3],
      data_contains: [3],
      data_not_contains: [3],
      data_starts_with: [3],
      data_ends_with: [3],
      data_not_starts_with: [3],
      data_not_ends_with: [3],
      userId: [2],
      userId_not: [2],
      userId_in: [2],
      userId_not_in: [2],
      userId_gt: [2],
      userId_lt: [2],
      userId_gte: [2],
      userId_lte: [2],
      hashType: [2],
      hashType_not: [2],
      hashType_in: [2],
      hashType_not_in: [2],
      hashType_gt: [2],
      hashType_lt: [2],
      hashType_gte: [2],
      hashType_lte: [2],
      hash: [3],
      hash_not: [3],
      hash_in: [3],
      hash_not_in: [3],
      hash_contains: [3],
      hash_not_contains: [3],
      hash_starts_with: [3],
      hash_ends_with: [3],
      hash_not_starts_with: [3],
      hash_not_ends_with: [3],
      sigType: [2],
      sigType_not: [2],
      sigType_in: [2],
      sigType_not_in: [2],
      sigType_gt: [2],
      sigType_lt: [2],
      sigType_gte: [2],
      sigType_lte: [2],
      sig: [3],
      sig_not: [3],
      sig_in: [3],
      sig_not_in: [3],
      sig_contains: [3],
      sig_not_contains: [3],
      sig_starts_with: [3],
      sig_ends_with: [3],
      sig_not_starts_with: [3],
      sig_not_ends_with: [3],
      version: [2],
      version_not: [2],
      version_in: [2],
      version_not_in: [2],
      version_gt: [2],
      version_lt: [2],
      version_gte: [2],
      version_lte: [2],
      expiration: [2],
      expiration_not: [2],
      expiration_in: [2],
      expiration_not_in: [2],
      expiration_gt: [2],
      expiration_lt: [2],
      expiration_gte: [2],
      expiration_lte: [2],
      messageArray: [3],
      messageArray_not: [3],
      messageArray_has: [3],
      messageArray_not_has: [3],
      __typename: [3],
    },
    Message: {
      id: [3],
      msgType: [2],
      msgBody: [3],
      __typename: [3],
    },
    MessageFilter: {
      id: [3],
      id_not: [3],
      id_in: [3],
      id_not_in: [3],
      id_contains: [3],
      id_not_contains: [3],
      id_starts_with: [3],
      id_ends_with: [3],
      id_not_starts_with: [3],
      id_not_ends_with: [3],
      msgType: [2],
      msgType_not: [2],
      msgType_in: [2],
      msgType_not_in: [2],
      msgType_gt: [2],
      msgType_lt: [2],
      msgType_gte: [2],
      msgType_lte: [2],
      msgBody: [3],
      msgBody_not: [3],
      msgBody_in: [3],
      msgBody_not_in: [3],
      msgBody_contains: [3],
      msgBody_not_contains: [3],
      msgBody_starts_with: [3],
      msgBody_ends_with: [3],
      msgBody_not_starts_with: [3],
      msgBody_not_ends_with: [3],
      __typename: [3],
    },
    ChannelCounter: {
      id: [3],
      counter: [2],
      lastUpdated: [2],
      __typename: [3],
    },
    ChannelCounterFilter: {
      id: [3],
      id_not: [3],
      id_in: [3],
      id_not_in: [3],
      id_contains: [3],
      id_not_contains: [3],
      id_starts_with: [3],
      id_ends_with: [3],
      id_not_starts_with: [3],
      id_not_ends_with: [3],
      counter: [2],
      counter_not: [2],
      counter_in: [2],
      counter_not_in: [2],
      counter_gt: [2],
      counter_lt: [2],
      counter_gte: [2],
      counter_lte: [2],
      lastUpdated: [2],
      lastUpdated_not: [2],
      lastUpdated_in: [2],
      lastUpdated_not_in: [2],
      lastUpdated_gt: [2],
      lastUpdated_lt: [2],
      lastUpdated_gte: [2],
      lastUpdated_lte: [2],
      __typename: [3],
    },
    Channel: {
      id: [2],
      createdTimestamp: [2],
      createdBy: [2],
      uri: [3],
      admins: [2],
      members: [2],
      references: [
        17,
        {
          skip: [4],
          first: [4],
          orderBy: [3],
          orderDirection: [3],
          timestamp: [4],
        },
      ],
      __typename: [3],
    },
    Reference: {
      id: [2],
      createdTimestamp: [2],
      createdBy: [2],
      channelId: [2],
      channel: [16],
      pubRefId: [2],
      pubRef: [18],
      chanRefId: [2],
      chanRef: [16],
      __typename: [3],
    },
    Publication: {
      id: [2],
      createdTimestamp: [2],
      createdBy: [2],
      uri: [3],
      __typename: [3],
    },
    ChannelFilter: {
      id: [2],
      id_not: [2],
      id_in: [2],
      id_not_in: [2],
      id_gt: [2],
      id_lt: [2],
      id_gte: [2],
      id_lte: [2],
      createdTimestamp: [2],
      createdTimestamp_not: [2],
      createdTimestamp_in: [2],
      createdTimestamp_not_in: [2],
      createdTimestamp_gt: [2],
      createdTimestamp_lt: [2],
      createdTimestamp_gte: [2],
      createdTimestamp_lte: [2],
      createdBy: [2],
      createdBy_not: [2],
      createdBy_in: [2],
      createdBy_not_in: [2],
      createdBy_gt: [2],
      createdBy_lt: [2],
      createdBy_gte: [2],
      createdBy_lte: [2],
      uri: [3],
      uri_not: [3],
      uri_in: [3],
      uri_not_in: [3],
      uri_contains: [3],
      uri_not_contains: [3],
      uri_starts_with: [3],
      uri_ends_with: [3],
      uri_not_starts_with: [3],
      uri_not_ends_with: [3],
      admins: [2],
      admins_not: [2],
      admins_has: [2],
      admins_not_has: [2],
      members: [2],
      members_not: [2],
      members_has: [2],
      members_not_has: [2],
      __typename: [3],
    },
    PublicationCounter: {
      id: [3],
      counter: [2],
      lastUpdated: [2],
      __typename: [3],
    },
    PublicationCounterFilter: {
      id: [3],
      id_not: [3],
      id_in: [3],
      id_not_in: [3],
      id_contains: [3],
      id_not_contains: [3],
      id_starts_with: [3],
      id_ends_with: [3],
      id_not_starts_with: [3],
      id_not_ends_with: [3],
      counter: [2],
      counter_not: [2],
      counter_in: [2],
      counter_not_in: [2],
      counter_gt: [2],
      counter_lt: [2],
      counter_gte: [2],
      counter_lte: [2],
      lastUpdated: [2],
      lastUpdated_not: [2],
      lastUpdated_in: [2],
      lastUpdated_not_in: [2],
      lastUpdated_gt: [2],
      lastUpdated_lt: [2],
      lastUpdated_gte: [2],
      lastUpdated_lte: [2],
      __typename: [3],
    },
    PublicationFilter: {
      id: [2],
      id_not: [2],
      id_in: [2],
      id_not_in: [2],
      id_gt: [2],
      id_lt: [2],
      id_gte: [2],
      id_lte: [2],
      createdTimestamp: [2],
      createdTimestamp_not: [2],
      createdTimestamp_in: [2],
      createdTimestamp_not_in: [2],
      createdTimestamp_gt: [2],
      createdTimestamp_lt: [2],
      createdTimestamp_gte: [2],
      createdTimestamp_lte: [2],
      createdBy: [2],
      createdBy_not: [2],
      createdBy_in: [2],
      createdBy_not_in: [2],
      createdBy_gt: [2],
      createdBy_lt: [2],
      createdBy_gte: [2],
      createdBy_lte: [2],
      uri: [3],
      uri_not: [3],
      uri_in: [3],
      uri_not_in: [3],
      uri_contains: [3],
      uri_not_contains: [3],
      uri_starts_with: [3],
      uri_ends_with: [3],
      uri_not_starts_with: [3],
      uri_not_ends_with: [3],
      __typename: [3],
    },
    ReferenceCounter: {
      id: [3],
      counter: [2],
      lastUpdated: [2],
      __typename: [3],
    },
    ReferenceCounterFilter: {
      id: [3],
      id_not: [3],
      id_in: [3],
      id_not_in: [3],
      id_contains: [3],
      id_not_contains: [3],
      id_starts_with: [3],
      id_ends_with: [3],
      id_not_starts_with: [3],
      id_not_ends_with: [3],
      counter: [2],
      counter_not: [2],
      counter_in: [2],
      counter_not_in: [2],
      counter_gt: [2],
      counter_lt: [2],
      counter_gte: [2],
      counter_lte: [2],
      lastUpdated: [2],
      lastUpdated_not: [2],
      lastUpdated_in: [2],
      lastUpdated_not_in: [2],
      lastUpdated_gt: [2],
      lastUpdated_lt: [2],
      lastUpdated_gte: [2],
      lastUpdated_lte: [2],
      __typename: [3],
    },
    ReferenceFilter: {
      id: [2],
      id_not: [2],
      id_in: [2],
      id_not_in: [2],
      id_gt: [2],
      id_lt: [2],
      id_gte: [2],
      id_lte: [2],
      createdTimestamp: [2],
      createdTimestamp_not: [2],
      createdTimestamp_in: [2],
      createdTimestamp_not_in: [2],
      createdTimestamp_gt: [2],
      createdTimestamp_lt: [2],
      createdTimestamp_gte: [2],
      createdTimestamp_lte: [2],
      createdBy: [2],
      createdBy_not: [2],
      createdBy_in: [2],
      createdBy_not_in: [2],
      createdBy_gt: [2],
      createdBy_lt: [2],
      createdBy_gte: [2],
      createdBy_lte: [2],
      channelId: [2],
      channelId_not: [2],
      channelId_in: [2],
      channelId_not_in: [2],
      channelId_gt: [2],
      channelId_lt: [2],
      channelId_gte: [2],
      channelId_lte: [2],
      pubRefId: [2],
      pubRefId_not: [2],
      pubRefId_in: [2],
      pubRefId_not_in: [2],
      pubRefId_gt: [2],
      pubRefId_lt: [2],
      pubRefId_gte: [2],
      pubRefId_lte: [2],
      chanRefId: [2],
      chanRefId_not: [2],
      chanRefId_in: [2],
      chanRefId_not_in: [2],
      chanRefId_gt: [2],
      chanRefId_lt: [2],
      chanRefId_gte: [2],
      chanRefId_lte: [2],
      __typename: [3],
    },
    Boolean: {},
  },
}
