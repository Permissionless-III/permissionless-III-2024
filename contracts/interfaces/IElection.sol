// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.20;

interface IElection {
    // function active() external view returns (bool);

    function factory() external view returns (address);

    function name() external view returns (string memory);

    function description() external view returns (string memory);

    function kickoff() external view returns (uint256);

    function deadline() external view returns (uint256);

    function totalVotes() external view returns (uint256);

    function vote(string calldata _did, uint256 _candidateIndex, bytes calldata _signature) external;
}
