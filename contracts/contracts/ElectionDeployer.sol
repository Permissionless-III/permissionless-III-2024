// SPDX-License-Identifier: BUSL-1.1
pragma solidity =0.8.20;

import '../interfaces/IElectionDeployer.sol';

import './Election.sol';

contract ElectionDeployer is IElectionDeployer {
    struct Parameters {
        address _factory;
        string _uri;
        string _name;
        string _description;
        uint256 _kickoff;
        uint256 _deadline;
    }

    Parameters public parameters;

    function getParameters()
        public
        view
        returns (
            address _factory,
            string memory _uri,
            string memory _name,
            string memory _description,
            uint256 _kickoff,
            uint256 _deadline
        )
    {
        return (
            parameters._factory,
            parameters._uri,
            parameters._name,
            parameters._description,
            parameters._kickoff,
            parameters._deadline
        );
    }

    function deploy(
        address _factory,
        string memory _uri,
        string memory _name,
        string memory _description,
        uint256 _kickoff,
        uint256 _deadline
    ) internal returns (address election) {
        parameters = Parameters({
            _factory: _factory,
            _uri: _uri,
            _name: _name,
            _description: _description,
            _kickoff: _kickoff,
            _deadline: _deadline
        });
        election = address(new Election{salt: keccak256(abi.encode(_uri, _name, _description, _kickoff, _deadline))}());
        delete parameters;
    }
}
