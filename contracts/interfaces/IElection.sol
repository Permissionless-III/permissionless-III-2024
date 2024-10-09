// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.20;

interface IElection {
    function factory() external view returns (address);

    function electionId() external view returns (bytes32);

    function name() external view returns (string memory);

    function description() external view returns (string memory);

    function kickoff() external view returns (uint256);

    function deadline() external view returns (uint256);

    function totalVotes() external view returns (uint256);

    function setCandidates(string[] calldata _candidateNames, string[] calldata _candidateDescriptions) external;

    function vote(string calldata _did, uint256 _candidateIndex) external;
}
