// SPDX-License-Identifier: BUSL-1.1
pragma solidity =0.8.20;

import '../interfaces/IElectionDeployer.sol';

import './Election.sol';

contract ElectionDeployer is IElectionDeployer {
    struct Parameters {
        string _uri;
        string _name;
        string _description;
        string[] _candidateNames;
        string[] _candidateDescriptions;
        uint256 _kickoff;
        uint256 _deadline;
    }

    address public _registry;
    address public _trustedSigner;

    /// @inheritdoc IElectionDeployer
    Parameters public override parameters;

    function deploy(
        address _factory,
        string memory _uri,
        string memory _name,
        string memory _description,
        string[] memory _candidateNames,
        string[] memory _candidateDescriptions,
        uint256 _kickoff,
        uint256 _deadline
    ) internal returns (address election) {
        parameters = Parameters({
            factory: _factory,
            uri: _uri,
            name: _name,
            description: __description,
            candidateNames: _candidateNames,
            candidateDescriptions: _candidateDescriptions,
            kickoff: _kickoff,
            deadline: _deadline
        });
        election = address(
            new Election{
                salt: keccak256(
                    abi.encode(_ura, _name, _description, _candidateNames, _candidateDescriptions, _kickoff, _deadline)
                )
            }()
        );
        delete parameters;
    }
}
