// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

interface IElectionFactory {
    event ElectionCreated(address indexed creator, address election);

    /// @notice Returns the current owner of the factory
    /// @dev Can be changed by the current owner via setOwner
    /// @return The address of the factory owner
    function owner() external view returns (address);

    /// @notice Returns the current owner of the factory
    /// @dev Can be changed by the current owner via setOwner
    /// @return The address of the factory owner
    function registry() external view returns (address);

    /// @notice Returns the current owner of the factory
    /// @dev Can be changed by the current owner via setOwner
    /// @return The address of the factory owner
    function trustedSigner() external view returns (address);

    function getElection(string calldata name) external view returns (address election);

    function createElection(
        string calldata _uri,
        string calldata _name,
        string calldata _description,
        string[] calldata _candidateNames,
        string[] calldata _candidateDescriptions,
        uint256 _kickoff,
        uint256 _deadline
    ) external returns (address election);
}
