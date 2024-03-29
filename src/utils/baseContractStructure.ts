export const getBaseContractStructure = (contractName: string) => ({
  import: [
    {
      id: "import-1",
      value: `// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "../core/BasePaymaster.sol";
import "@openzeppelin/contracts/utils/Address.sol";

`,
    },
  ],
  contractName: [
    {
      id: "contract-name-1",
      value: `contract ${contractName} is BasePaymaster {
    using Address for address payable;`,
    },
  ],
  receive: [],
  vars: [],
  constructorParamsStart: [
    {
      id: "constructor-params-start-1",
      value: `  constructor(
      IEntryPoint _entryPoint,`,
    },
  ],
  constructorParamsEnd: [
    {
      id: "constructor-params-end-1",
      value: `  ) BasePaymaster(_entryPoint) {`,
    },
  ],
  constructorBody: [],
  constructorEnd: [{ id: "constructor-end-1", value: `  }\n` }],
  validatePaymasterUsOpParamsStart: [
    {
      id: "validate-paymaster-usop-params-start-1",
      value: `\n  function _validatePaymasterUserOp(
        UserOperation calldata userOp,
        bytes32 /*userOpHash*/,
        uint256 requiredPreFund`,
    },
  ],
  validatePaymasterUsOpParamsEnd: [
    {
      id: "validate-paymaster-usop-params-end-1",
      value: `  ) internal override returns (bytes memory context, uint256 validationData) {`,
    },
  ],
  validatePaymasterUsOpBody: [
    {
      id: "validate-paymaster-usop-body-1",
      value: `      // Check that the user operation is a valid operation`,
    },
  ],
  validatePaymasterUsOpEnd: [
    {
      id: "validate-paymaster-usop-end-1",
      value: `      return ("", 0);
  }`,
    },
  ],
  functions: [],
  postOpStart: [
    {
      id: "post-op-params-start-1",
      value: `\n  function _postOp(PostOpMode /*mode*/, bytes calldata /*context*/, uint256 /*actualGasCost*/) internal override {`,
    },
  ],
  postOpBody: [],
  postOpEnd: [
    {
      id: "post-op-end-1",
      value: `  }`,
    },
  ],
  contractEnd: [
    {
      id: "contract-end-1",
      value: `}`,
    },
  ],
});

export const getBaseContract = async () => {
  const response = await fetch(
    `https://bafybeigh6h2mbmjsf7nkgtibdnzlrjmdc3prj4msm6sya5hi4i77likizq.ipfs.w3s.link/contract.json`
  );

  const contract = await response.json();

  return contract;
};
