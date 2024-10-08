// SPDX-License-Identifier: BUSL-1.1
pragma solidity =0.8.20;

import '../interfaces/IElectionFactory.sol';

import './ElectionDeployer.sol';
import './NoDelegateCall.sol';

import './Election.sol';

contract ElectionFactory is IElectionFactory, ElectionDeployer, NoDelegateCall {
    /// @inheritdoc IElectionFactory
    address public override owner;

    /// @inheritdoc IElectionFactory
    address public registry;

    /// @inheritdoc IElectionFactory
    address public trustedSigner;

    /// @inheritdoc IElectionFactory
    mapping(string => address) public override getElection;

    constructor(address _registry, address _trustedSigner) {
        require(_registry != address(0), 'invalid registry');
        require(_trustedSigner != address(0), 'invalid trustedSigner');

        owner = msg.sender;
        registry = _registry;
        trustedSigner = _trustedSigner;
    }

    /// @inheritdoc IElectionFactory
    function createElection(
        string calldata _uri,
        string calldata _name,
        string calldata _description,
        string[] calldata _candidateNames,
        string[] calldata _candidateDescriptions,
        uint256 _kickoff,
        uint256 _deadline
    ) external override noDelegateCall returns (address election) {
        require(_candidateNames.length >= 2, 'not enough candidates');
        require(_candidateNames.length == _candidateDescriptions.length, 'invalid candidates');
        require(_deadline > _kickoff, 'deadline must be after kickoff');

        require(getElection[_name] == address(0));
        election = deploy(
            address(this),
            _uri,
            _name,
            _description,
            _candidateNames,
            _candidateDescriptions,
            _kickoff,
            _deadline
        );
        getElection[_name] = election;
        emit ElectionCreated(msg.sender, election);
    }
}
