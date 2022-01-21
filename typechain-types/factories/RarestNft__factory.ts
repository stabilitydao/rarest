/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { RarestNft, RarestNftInterface } from "../RarestNft";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "marketAddress_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "hashes",
        type: "string[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "address[]",
        name: "royaltyRecipients",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "royaltyPercents",
        type: "uint256[]",
      },
    ],
    name: "creatNFTBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "hash",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "royaltyRecipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "royaltyPercent",
        type: "uint256",
      },
    ],
    name: "createNFT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "marketAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_salePrice",
        type: "uint256",
      },
    ],
    name: "royaltyInfo",
    outputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "royaltyAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526040518060600160405280602281526020016200390e602291396006908051906020019062000035929190620000ef565b503480156200004357600080fd5b506040516200393038038062003930833981810160405281019062000069919062000209565b604051806020016040528060008152506200008a81620000d360201b60201c565b5080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050620002a0565b8060029080519060200190620000eb929190620000ef565b5050565b828054620000fd906200026a565b90600052602060002090601f0160209004810192826200012157600085556200016d565b82601f106200013c57805160ff19168380011785556200016d565b828001600101855582156200016d579182015b828111156200016c5782518255916020019190600101906200014f565b5b5090506200017c919062000180565b5090565b5b808211156200019b57600081600090555060010162000181565b5090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001d182620001a4565b9050919050565b620001e381620001c4565b8114620001ef57600080fd5b50565b6000815190506200020381620001d8565b92915050565b6000602082840312156200022257620002216200019f565b5b60006200023284828501620001f2565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200028357607f821691505b602082108114156200029a57620002996200023b565b5b50919050565b61365e80620002b06000396000f3fe608060405234801561001057600080fd5b50600436106100ce5760003560e01c80636c0360eb1161008c578063e985e9c511610066578063e985e9c514610238578063ead415cc14610268578063f242432a14610298578063fe27db02146102b4576100ce565b80636c0360eb146101e057806395623641146101fe578063a22cb4651461021c576100ce565b8062fdd58e146100d357806301ffc9a7146101035780630e89341c146101335780632a55205a146101635780632eb2c2d6146101945780634e1273f4146101b0575b600080fd5b6100ed60048036038101906100e89190611d87565b6102e4565b6040516100fa9190611dd6565b60405180910390f35b61011d60048036038101906101189190611e49565b6103ad565b60405161012a9190611e91565b60405180910390f35b61014d60048036038101906101489190611eac565b61048f565b60405161015a9190611f72565b60405180910390f35b61017d60048036038101906101789190611f94565b6104cd565b60405161018b929190611fe3565b60405180910390f35b6101ae60048036038101906101a99190612209565b610580565b005b6101ca60048036038101906101c5919061239b565b610621565b6040516101d791906124d1565b60405180910390f35b6101e861073a565b6040516101f59190611f72565b60405180910390f35b6102066107c8565b60405161021391906124f3565b60405180910390f35b6102366004803603810190610231919061253a565b6107ee565b005b610252600480360381019061024d919061257a565b610804565b60405161025f9190611e91565b60405180910390f35b610282600480360381019061027d919061273c565b610898565b60405161028f91906124d1565b60405180910390f35b6102b260048036038101906102ad9190612855565b610a71565b005b6102ce60048036038101906102c991906128ec565b610b12565b6040516102db9190611dd6565b60405180910390f35b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610355576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161034c90612a23565b60405180910390fd5b60008083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061047857507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610488575061048782610bb0565b5b9050919050565b60606006600760008481526020019081526020016000206040516020016104b7929190612b43565b6040516020818303038152906040529050919050565b6000806000600360008681526020019081526020016000206040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815250509050806000015161271082602001518661056a9190612b96565b6105749190612c1f565b92509250509250929050565b610588610c1a565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614806105ce57506105cd856105c8610c1a565b610804565b5b61060d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060490612cc2565b60405180910390fd5b61061a8585858585610c22565b5050505050565b60608151835114610667576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161065e90612d54565b60405180910390fd5b6000835167ffffffffffffffff81111561068457610683612011565b5b6040519080825280602002602001820160405280156106b25781602001602082028036833780820191505090505b50905060005b845181101561072f576106ff8582815181106106d7576106d6612d74565b5b60200260200101518583815181106106f2576106f1612d74565b5b60200260200101516102e4565b82828151811061071257610711612d74565b5b6020026020010181815250508061072890612da3565b90506106b8565b508091505092915050565b6006805461074790612a72565b80601f016020809104026020016040519081016040528092919081815260200182805461077390612a72565b80156107c05780601f10610795576101008083540402835291602001916107c0565b820191906000526020600020905b8154815290600101906020018083116107a357829003601f168201915b505050505081565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6108006107f9610c1a565b8383610f36565b5050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b606084518651146108de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d590612e38565b60405180910390fd5b6000865167ffffffffffffffff8111156108fb576108fa612011565b5b6040519080825280602002602001820160405280156109295781602001602082028036833780820191505090505b50905060005b8751811015610a295761094260046110a3565b600061094e60046110b9565b905087828151811061096357610962612d74565b5b6020026020010151600760008381526020019081526020016000209080519060200190610991929190611c3c565b50808383815181106109a6576109a5612d74565b5b60200260200101818152505060008583815181106109c7576109c6612d74565b5b60200260200101511115610a1557610a14818784815181106109ec576109eb612d74565b5b6020026020010151878581518110610a0757610a06612d74565b5b60200260200101516110c7565b5b508080610a2190612da3565b91505061092f565b50610a36888289886111a3565b610a63600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660016107ee565b809150509695505050505050565b610a79610c1a565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161480610abf5750610abe85610ab9610c1a565b610804565b5b610afe576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610af590612eca565b60405180910390fd5b610b0b85858585856113c1565b5050505050565b6000610b1e60046110a3565b6000610b2a60046110b9565b9050610b3888828988611643565b85600760008381526020019081526020016000209080519060200190610b5f929190611c3c565b50610b8d600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660016107ee565b6000831115610ba257610ba18185856110c7565b5b809150509695505050505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b8151835114610c66576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c5d90612f5c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610cd6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ccd90612fee565b60405180910390fd5b6000610ce0610c1a565b9050610cf08187878787876117d9565b60005b8451811015610ea1576000858281518110610d1157610d10612d74565b5b602002602001015190506000858381518110610d3057610d2f612d74565b5b60200260200101519050600080600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610dd1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dc890613080565b60405180910390fd5b81810360008085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e8691906130a0565b9250508190555050505080610e9a90612da3565b9050610cf3565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610f189291906130f6565b60405180910390a4610f2e8187878787876117e1565b505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610fa5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f9c9061319f565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516110969190611e91565b60405180910390a3505050565b6001816000016000828254019250508190555050565b600081600001549050919050565b61271081111561110c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111039061320b565b60405180910390fd5b60405180604001604052808373ffffffffffffffffffffffffffffffffffffffff168152602001828152506003600085815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155905050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415611213576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161120a9061329d565b60405180910390fd5b8151835114611257576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161124e90612f5c565b60405180910390fd5b6000611261610c1a565b9050611272816000878787876117d9565b60005b845181101561132b5783818151811061129157611290612d74565b5b60200260200101516000808784815181106112af576112ae612d74565b5b6020026020010151815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461131191906130a0565b92505081905550808061132390612da3565b915050611275565b508473ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb87876040516113a39291906130f6565b60405180910390a46113ba816000878787876117e1565b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415611431576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161142890612fee565b60405180910390fd5b600061143b610c1a565b905061145b81878761144c886119c8565b611455886119c8565b876117d9565b600080600086815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050838110156114f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114e990613080565b60405180910390fd5b83810360008087815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508360008087815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546115a791906130a0565b925050819055508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6288886040516116249291906132bd565b60405180910390a461163a828888888888611a42565b50505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614156116b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116aa9061329d565b60405180910390fd5b60006116bd610c1a565b90506116de816000876116cf886119c8565b6116d8886119c8565b876117d9565b8260008086815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461173d91906130a0565b925050819055508473ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6287876040516117bb9291906132bd565b60405180910390a46117d281600087878787611a42565b5050505050565b505050505050565b6118008473ffffffffffffffffffffffffffffffffffffffff16611c29565b156119c0578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b815260040161184695949392919061333b565b602060405180830381600087803b15801561186057600080fd5b505af192505050801561189157506040513d601f19601f8201168201806040525081019061188e91906133b8565b60015b6119375761189d6133f2565b806308c379a014156118fa57506118b2613414565b806118bd57506118fc565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118f19190611f72565b60405180910390fd5b505b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161192e9061351c565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146119be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119b5906135ae565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff8111156119e7576119e6612011565b5b604051908082528060200260200182016040528015611a155781602001602082028036833780820191505090505b5090508281600081518110611a2d57611a2c612d74565b5b60200260200101818152505080915050919050565b611a618473ffffffffffffffffffffffffffffffffffffffff16611c29565b15611c21578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b8152600401611aa79594939291906135ce565b602060405180830381600087803b158015611ac157600080fd5b505af1925050508015611af257506040513d601f19601f82011682018060405250810190611aef91906133b8565b60015b611b9857611afe6133f2565b806308c379a01415611b5b5750611b13613414565b80611b1e5750611b5d565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b529190611f72565b60405180910390fd5b505b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b8f9061351c565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611c1f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c16906135ae565b60405180910390fd5b505b505050505050565b600080823b905060008111915050919050565b828054611c4890612a72565b90600052602060002090601f016020900481019282611c6a5760008555611cb1565b82601f10611c8357805160ff1916838001178555611cb1565b82800160010185558215611cb1579182015b82811115611cb0578251825591602001919060010190611c95565b5b509050611cbe9190611cc2565b5090565b5b80821115611cdb576000816000905550600101611cc3565b5090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611d1e82611cf3565b9050919050565b611d2e81611d13565b8114611d3957600080fd5b50565b600081359050611d4b81611d25565b92915050565b6000819050919050565b611d6481611d51565b8114611d6f57600080fd5b50565b600081359050611d8181611d5b565b92915050565b60008060408385031215611d9e57611d9d611ce9565b5b6000611dac85828601611d3c565b9250506020611dbd85828601611d72565b9150509250929050565b611dd081611d51565b82525050565b6000602082019050611deb6000830184611dc7565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611e2681611df1565b8114611e3157600080fd5b50565b600081359050611e4381611e1d565b92915050565b600060208284031215611e5f57611e5e611ce9565b5b6000611e6d84828501611e34565b91505092915050565b60008115159050919050565b611e8b81611e76565b82525050565b6000602082019050611ea66000830184611e82565b92915050565b600060208284031215611ec257611ec1611ce9565b5b6000611ed084828501611d72565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611f13578082015181840152602081019050611ef8565b83811115611f22576000848401525b50505050565b6000601f19601f8301169050919050565b6000611f4482611ed9565b611f4e8185611ee4565b9350611f5e818560208601611ef5565b611f6781611f28565b840191505092915050565b60006020820190508181036000830152611f8c8184611f39565b905092915050565b60008060408385031215611fab57611faa611ce9565b5b6000611fb985828601611d72565b9250506020611fca85828601611d72565b9150509250929050565b611fdd81611d13565b82525050565b6000604082019050611ff86000830185611fd4565b6120056020830184611dc7565b9392505050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61204982611f28565b810181811067ffffffffffffffff8211171561206857612067612011565b5b80604052505050565b600061207b611cdf565b90506120878282612040565b919050565b600067ffffffffffffffff8211156120a7576120a6612011565b5b602082029050602081019050919050565b600080fd5b60006120d06120cb8461208c565b612071565b905080838252602082019050602084028301858111156120f3576120f26120b8565b5b835b8181101561211c57806121088882611d72565b8452602084019350506020810190506120f5565b5050509392505050565b600082601f83011261213b5761213a61200c565b5b813561214b8482602086016120bd565b91505092915050565b600080fd5b600067ffffffffffffffff82111561217457612173612011565b5b61217d82611f28565b9050602081019050919050565b82818337600083830152505050565b60006121ac6121a784612159565b612071565b9050828152602081018484840111156121c8576121c7612154565b5b6121d384828561218a565b509392505050565b600082601f8301126121f0576121ef61200c565b5b8135612200848260208601612199565b91505092915050565b600080600080600060a0868803121561222557612224611ce9565b5b600061223388828901611d3c565b955050602061224488828901611d3c565b945050604086013567ffffffffffffffff81111561226557612264611cee565b5b61227188828901612126565b935050606086013567ffffffffffffffff81111561229257612291611cee565b5b61229e88828901612126565b925050608086013567ffffffffffffffff8111156122bf576122be611cee565b5b6122cb888289016121db565b9150509295509295909350565b600067ffffffffffffffff8211156122f3576122f2612011565b5b602082029050602081019050919050565b6000612317612312846122d8565b612071565b9050808382526020820190506020840283018581111561233a576123396120b8565b5b835b81811015612363578061234f8882611d3c565b84526020840193505060208101905061233c565b5050509392505050565b600082601f8301126123825761238161200c565b5b8135612392848260208601612304565b91505092915050565b600080604083850312156123b2576123b1611ce9565b5b600083013567ffffffffffffffff8111156123d0576123cf611cee565b5b6123dc8582860161236d565b925050602083013567ffffffffffffffff8111156123fd576123fc611cee565b5b61240985828601612126565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61244881611d51565b82525050565b600061245a838361243f565b60208301905092915050565b6000602082019050919050565b600061247e82612413565b612488818561241e565b93506124938361242f565b8060005b838110156124c45781516124ab888261244e565b97506124b683612466565b925050600181019050612497565b5085935050505092915050565b600060208201905081810360008301526124eb8184612473565b905092915050565b60006020820190506125086000830184611fd4565b92915050565b61251781611e76565b811461252257600080fd5b50565b6000813590506125348161250e565b92915050565b6000806040838503121561255157612550611ce9565b5b600061255f85828601611d3c565b925050602061257085828601612525565b9150509250929050565b6000806040838503121561259157612590611ce9565b5b600061259f85828601611d3c565b92505060206125b085828601611d3c565b9150509250929050565b600067ffffffffffffffff8211156125d5576125d4612011565b5b602082029050602081019050919050565b600067ffffffffffffffff82111561260157612600612011565b5b61260a82611f28565b9050602081019050919050565b600061262a612625846125e6565b612071565b90508281526020810184848401111561264657612645612154565b5b61265184828561218a565b509392505050565b600082601f83011261266e5761266d61200c565b5b813561267e848260208601612617565b91505092915050565b600061269a612695846125ba565b612071565b905080838252602082019050602084028301858111156126bd576126bc6120b8565b5b835b8181101561270457803567ffffffffffffffff8111156126e2576126e161200c565b5b8086016126ef8982612659565b855260208501945050506020810190506126bf565b5050509392505050565b600082601f8301126127235761272261200c565b5b8135612733848260208601612687565b91505092915050565b60008060008060008060c0878903121561275957612758611ce9565b5b600061276789828a01611d3c565b965050602087013567ffffffffffffffff81111561278857612787611cee565b5b61279489828a01612126565b955050604087013567ffffffffffffffff8111156127b5576127b4611cee565b5b6127c189828a0161270e565b945050606087013567ffffffffffffffff8111156127e2576127e1611cee565b5b6127ee89828a016121db565b935050608087013567ffffffffffffffff81111561280f5761280e611cee565b5b61281b89828a0161236d565b92505060a087013567ffffffffffffffff81111561283c5761283b611cee565b5b61284889828a01612126565b9150509295509295509295565b600080600080600060a0868803121561287157612870611ce9565b5b600061287f88828901611d3c565b955050602061289088828901611d3c565b94505060406128a188828901611d72565b93505060606128b288828901611d72565b925050608086013567ffffffffffffffff8111156128d3576128d2611cee565b5b6128df888289016121db565b9150509295509295909350565b60008060008060008060c0878903121561290957612908611ce9565b5b600061291789828a01611d3c565b965050602061292889828a01611d72565b955050604087013567ffffffffffffffff81111561294957612948611cee565b5b61295589828a01612659565b945050606087013567ffffffffffffffff81111561297657612975611cee565b5b61298289828a016121db565b935050608061299389828a01611d3c565b92505060a06129a489828a01611d72565b9150509295509295509295565b7f455243313135353a2062616c616e636520717565727920666f7220746865207a60008201527f65726f2061646472657373000000000000000000000000000000000000000000602082015250565b6000612a0d602b83611ee4565b9150612a18826129b1565b604082019050919050565b60006020820190508181036000830152612a3c81612a00565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680612a8a57607f821691505b60208210811415612a9e57612a9d612a43565b5b50919050565b600081905092915050565b60008190508160005260206000209050919050565b60008154612ad181612a72565b612adb8186612aa4565b94506001821660008114612af65760018114612b0757612b3a565b60ff19831686528186019350612b3a565b612b1085612aaf565b60005b83811015612b3257815481890152600182019150602081019050612b13565b838801955050505b50505092915050565b6000612b4f8285612ac4565b9150612b5b8284612ac4565b91508190509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612ba182611d51565b9150612bac83611d51565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612be557612be4612b67565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000612c2a82611d51565b9150612c3583611d51565b925082612c4557612c44612bf0565b5b828204905092915050565b7f455243313135353a207472616e736665722063616c6c6572206973206e6f742060008201527f6f776e6572206e6f7220617070726f7665640000000000000000000000000000602082015250565b6000612cac603283611ee4565b9150612cb782612c50565b604082019050919050565b60006020820190508181036000830152612cdb81612c9f565b9050919050565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b6000612d3e602983611ee4565b9150612d4982612ce2565b604082019050919050565b60006020820190508181036000830152612d6d81612d31565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000612dae82611d51565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612de157612de0612b67565b5b600182019050919050565b7f616d6f756e74206d75737420626520657175616c20746f206861736800000000600082015250565b6000612e22601c83611ee4565b9150612e2d82612dec565b602082019050919050565b60006020820190508181036000830152612e5181612e15565b9050919050565b7f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260008201527f20617070726f7665640000000000000000000000000000000000000000000000602082015250565b6000612eb4602983611ee4565b9150612ebf82612e58565b604082019050919050565b60006020820190508181036000830152612ee381612ea7565b9050919050565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b6000612f46602883611ee4565b9150612f5182612eea565b604082019050919050565b60006020820190508181036000830152612f7581612f39565b9050919050565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000612fd8602583611ee4565b9150612fe382612f7c565b604082019050919050565b6000602082019050818103600083015261300781612fcb565b9050919050565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b600061306a602a83611ee4565b91506130758261300e565b604082019050919050565b600060208201905081810360008301526130998161305d565b9050919050565b60006130ab82611d51565b91506130b683611d51565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156130eb576130ea612b67565b5b828201905092915050565b600060408201905081810360008301526131108185612473565b905081810360208301526131248184612473565b90509392505050565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b6000613189602983611ee4565b91506131948261312d565b604082019050919050565b600060208201905081810360008301526131b88161317c565b9050919050565b7f45524332393831526f79616c746965733a2076616c756520746f6f2068696768600082015250565b60006131f5602083611ee4565b9150613200826131bf565b602082019050919050565b60006020820190508181036000830152613224816131e8565b9050919050565b7f455243313135353a206d696e7420746f20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b6000613287602183611ee4565b91506132928261322b565b604082019050919050565b600060208201905081810360008301526132b68161327a565b9050919050565b60006040820190506132d26000830185611dc7565b6132df6020830184611dc7565b9392505050565b600081519050919050565b600082825260208201905092915050565b600061330d826132e6565b61331781856132f1565b9350613327818560208601611ef5565b61333081611f28565b840191505092915050565b600060a0820190506133506000830188611fd4565b61335d6020830187611fd4565b818103604083015261336f8186612473565b905081810360608301526133838185612473565b905081810360808301526133978184613302565b90509695505050505050565b6000815190506133b281611e1d565b92915050565b6000602082840312156133ce576133cd611ce9565b5b60006133dc848285016133a3565b91505092915050565b60008160e01c9050919050565b600060033d11156134115760046000803e61340e6000516133e5565b90505b90565b600060443d1015613424576134a7565b61342c611cdf565b60043d036004823e80513d602482011167ffffffffffffffff821117156134545750506134a7565b808201805167ffffffffffffffff81111561347257505050506134a7565b80602083010160043d03850181111561348f5750505050506134a7565b61349e82602001850186612040565b82955050505050505b90565b7f455243313135353a207472616e7366657220746f206e6f6e204552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b6000613506603483611ee4565b9150613511826134aa565b604082019050919050565b60006020820190508181036000830152613535816134f9565b9050919050565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b6000613598602883611ee4565b91506135a38261353c565b604082019050919050565b600060208201905081810360008301526135c78161358b565b9050919050565b600060a0820190506135e36000830188611fd4565b6135f06020830187611fd4565b6135fd6040830186611dc7565b61360a6060830185611dc7565b818103608083015261361c8184613302565b9050969550505050505056fea2646970667358221220386672344c80fef725f42d14817b2911a790adce2b9504fcee56d0bccaf92bb764736f6c6343000809003368747470733a2f2f676174657761792e70696e6174612e636c6f75642f697066732f";

type RarestNftConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RarestNftConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RarestNft__factory extends ContractFactory {
  constructor(...args: RarestNftConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "RarestNft";
  }

  deploy(
    marketAddress_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<RarestNft> {
    return super.deploy(marketAddress_, overrides || {}) as Promise<RarestNft>;
  }
  getDeployTransaction(
    marketAddress_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(marketAddress_, overrides || {});
  }
  attach(address: string): RarestNft {
    return super.attach(address) as RarestNft;
  }
  connect(signer: Signer): RarestNft__factory {
    return super.connect(signer) as RarestNft__factory;
  }
  static readonly contractName: "RarestNft";
  public readonly contractName: "RarestNft";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RarestNftInterface {
    return new utils.Interface(_abi) as RarestNftInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RarestNft {
    return new Contract(address, _abi, signerOrProvider) as RarestNft;
  }
}
