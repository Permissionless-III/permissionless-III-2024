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
    uint256 public electionCount;

    /// @inheritdoc IElectionFactory
    mapping(bytes32 => address) public override getElection;

    bytes32[] public elections;

    constructor(address _registry, address _trustedSigner) {
        require(_registry != address(0), 'invalid registry');
        require(_trustedSigner != address(0), 'invalid trustedSigner');

        owner = msg.sender;
        registry = _registry;
        trustedSigner = _trustedSigner;
        electionCount = 0;
    }

    function getAllElections() public view returns (bytes32[] memory) {
        return elections;
    }

    /// @inheritdoc IElectionFactory
    function createElection(
        string calldata _uri,
        string calldata _name,
        string calldata _description,
        uint256 _kickoff,
        uint256 _deadline
    ) external override noDelegateCall returns (address election) {
        require(_deadline > _kickoff, 'deadline must be after kickoff');

        bytes32 electionId = keccak256(abi.encodePacked(_name));
        require(getElection[electionId] == address(0));

        election = deploy(address(this), _uri, _name, _description, _kickoff, _deadline);
        getElection[electionId] = election;
        emit ElectionCreated(msg.sender, election);

        electionCount += 1;
        elections.push(electionId);

        return election;
    }
}
