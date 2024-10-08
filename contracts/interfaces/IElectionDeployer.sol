// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

interface IElectionDeployer {
    function parameters()
        external
        view
        returns (
            address _factory,
            string memory _uri,
            string memory _name,
            string memory _description,
            string[] memory _candidateNames,
            string[] memory _candidateDescriptions,
            uint256 _kickoff,
            uint256 _deadline
        );
}
