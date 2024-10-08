// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

interface IElectionFactory {
    /// @notice Emitted when the owner of the factory is changed
    /// @param oldOwner The owner before the owner was changed
    /// @param newOwner The owner after the owner was changed
    event OwnerChanged(address indexed oldOwner, address indexed newOwner);

    /// @notice Returns the current owner of the factory
    /// @dev Can be changed by the current owner via setOwner
    /// @return The address of the factory owner
    function owner() external view returns (address);


    function getElection(string calldata name) external view returns (address election);


    function createElection(address tokenA, address tokenB, uint24 fee) external returns (address election);

    function setOwner(address _owner) external;
}
