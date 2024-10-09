// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.20;

import '../libraries/Types.sol';

interface IRegistry {
    function trustedSigner() external view returns (address);

    function totalRegistered() external view returns (uint256);

    function voter(string calldata _did) external view returns (Types.Voter memory);

    function register(string calldata _did) external returns (Types.Voter memory);
}
