// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.20;

import '../libraries/Types.sol';

interface IRegistry {
    function voter(string calldata _did) external view returns (Types.Voter memory);

    // function total_registered() external view returns (uint);

    // function is_registered(bytes calldata _did) external view returns (bool);

    function register(string calldata _did, bytes calldata _signature) external returns (Types.Voter memory);
}
