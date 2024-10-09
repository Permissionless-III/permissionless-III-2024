// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

interface IElectionFactory {
    event ElectionCreated(address indexed creator, address election);

    function owner() external view returns (address);

    function registry() external view returns (address);

    function trustedSigner() external view returns (address);

    function electionCount() external view returns (uint256);

    function getElection(bytes32 electionId) external view returns (address election);

    function getAllElections() external view returns (bytes32[] memory elections);

    function createElection(
        string calldata _uri,
        string calldata _name,
        string calldata _description,
        uint256 _kickoff,
        uint256 _deadline
    ) external returns (address election);
}
