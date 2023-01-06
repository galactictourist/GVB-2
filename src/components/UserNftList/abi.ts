export const marketAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'adminWallet_', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'nftContract',
            type: 'address',
          },
          { internalType: 'address', name: 'seller', type: 'address' },
          { internalType: 'bool', name: 'isMinted', type: 'bool' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'string', name: 'tokenURI', type: 'string' },
          { internalType: 'uint256', name: 'quantity', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'itemAmount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'charityAddress',
            type: 'address',
          },
          {
            internalType: 'uint96',
            name: 'charityShare',
            type: 'uint96',
          },
          { internalType: 'uint96', name: 'royaltyFee', type: 'uint96' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'uint256', name: 'salt', type: 'uint256' },
        ],
        indexed: false,
        internalType: 'struct OrderItem',
        name: 'item',
        type: 'tuple',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'additionalAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
    ],
    name: 'BoughtItem',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'SetAdminWallet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'SetNftContractAddress',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint96',
        name: 'platformFee',
        type: 'uint96',
      },
    ],
    name: 'SetPlatformFee',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'tokenURI',
        type: 'string',
      },
    ],
    name: 'UpdatedTokenURI',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'nftContract',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'seller',
                type: 'address',
              },
              { internalType: 'bool', name: 'isMinted', type: 'bool' },
              {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'tokenURI',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'quantity',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'itemAmount',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'charityAddress',
                type: 'address',
              },
              {
                internalType: 'uint96',
                name: 'charityShare',
                type: 'uint96',
              },
              {
                internalType: 'uint96',
                name: 'royaltyFee',
                type: 'uint96',
              },
              {
                internalType: 'uint256',
                name: 'deadline',
                type: 'uint256',
              },
              { internalType: 'uint256', name: 'salt', type: 'uint256' },
            ],
            internalType: 'struct OrderItem',
            name: 'orderItem',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'additionalAmount',
            type: 'uint256',
          },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
        ],
        internalType: 'struct Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
    ],
    name: 'buyItems',
    outputs: [
      { internalType: 'bool[]', name: 'ordersResult', type: 'bool[]' },
      {
        internalType: 'string[]',
        name: 'ordersStatus',
        type: 'string[]',
      },
      { internalType: 'bytes32[]', name: 'ordersHash', type: 'bytes32[]' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'nftContract',
            type: 'address',
          },
          { internalType: 'address', name: 'seller', type: 'address' },
          { internalType: 'bool', name: 'isMinted', type: 'bool' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'string', name: 'tokenURI', type: 'string' },
          { internalType: 'uint256', name: 'quantity', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'itemAmount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'charityAddress',
            type: 'address',
          },
          {
            internalType: 'uint96',
            name: 'charityShare',
            type: 'uint96',
          },
          { internalType: 'uint96', name: 'royaltyFee', type: 'uint96' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'uint256', name: 'salt', type: 'uint256' },
        ],
        internalType: 'struct OrderItem[]',
        name: 'orderItems',
        type: 'tuple[]',
      },
    ],
    name: 'cancelOrders',
    outputs: [
      { internalType: 'bool[]', name: 'cancelResults', type: 'bool[]' },
      { internalType: 'string[]', name: 'cancelStatus', type: 'string[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'gbNftContracts',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'orderCancelled',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'orderProcessed',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'platformFee',
    outputs: [{ internalType: 'uint96', name: '', type: 'uint96' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'adminWallet_', type: 'address' }],
    name: 'setAdminWallet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      { internalType: 'bool', name: 'isEnabled', type: 'bool' },
    ],
    name: 'setNftContractAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint96', name: 'platformFee_', type: 'uint96' }],
    name: 'setPlatformFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'string', name: 'tokenURI', type: 'string' },
    ],
    name: 'updateTokenURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
