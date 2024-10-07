// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.20;

interface IElection {
    // function active() external view returns (bool);

    function vote(
        string calldata _did,
        uint256 _candidate,
        string calldata _message,
        bytes calldata _signature
    ) external;

    function register_and_vote(
        string calldata _did,
        uint256 _candidate_index,
        string calldata _message,
        bytes calldata _signature
    ) external;
}
