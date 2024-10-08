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
    mapping(string => address) public override getElection;

    constructor() {
        owner = msg.sender;
        emit OwnerChanged(address(0), msg.sender);
    }

    /// @inheritdoc IElectionFactory
    function createElection(
        string _uri,
        string _name,
        string _description,
        string[] _candidateNames,
        string[] _candidateDescriptions,
        uint256 _kickoff,
        uint256 _deadline
    ) external override noDelegateCall returns (address election) {
        require(_candidateNames.length >= 2, 'not enough candidates');
        require(_candidateNames.length == _candidateDescriptions.length, 'invalid candidates');
        require(_deadline > _kickoff, 'deadline must be after kickoff');

        require(getElection[_name] == address(0));
        election = deploy(address(this), token0, token1, fee, tickSpacing);
        getElection[_name] = election;
        emit ElectionCreated(_name, election);
    }

    /// @inheritdoc IElectionFactory
    function setOwner(address _owner) external override {
        require(msg.sender == owner);
        emit OwnerChanged(owner, _owner);
        owner = _owner;
    }
}
