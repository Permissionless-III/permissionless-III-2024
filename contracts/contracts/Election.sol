// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

// Libs
import '../libraries/Types.sol';
import '../libraries/SignatureVerifier.sol';
import '../interfaces/IElectionDeployer.sol';
import '../interfaces/IElectionFactory.sol';

import '../interfaces/IRegistry.sol';
import './NoDelegateCall.sol';
import '../interfaces/IElection.sol';

contract Election is IElection, ERC1155, ERC1155Supply, NoDelegateCall {
    /*///////////////////////////////////////////////////////////////
                                State
    //////////////////////////////////////////////////////////////*/

    /// @inheritdoc IElection
    address public immutable override factory;
    /// @inheritdoc IElection
    string public override name;
    /// @inheritdoc IElection
    string public override description;
    /// @inheritdoc IElection
    uint256 public immutable override kickoff;
    /// @inheritdoc IElection
    uint256 public immutable override deadline;
    /// @inheritdoc IElection
    uint256 public override totalVotes;

    Types.Candidate[] public candidates;

    // did > Vote
    mapping(string => Types.Vote) public votes;

    event SubmitVote();

    /*///////////////////////////////////////////////////////////////
                    Constructor, Initializer, Modifiers
    //////////////////////////////////////////////////////////////*/

    modifier onlyFactoryOwner() {
        require(msg.sender == IElectionFactory(factory).owner());
        _;
    }

    constructor() ERC1155('') {
        string[] memory _candidateNames;
        string[] memory _candidateDescriptions;
        string memory _uri;
        (
            factory,
            _uri,
            name,
            description,
            _candidateNames,
            _candidateDescriptions,
            kickoff,
            deadline
        ) = IElectionDeployer(msg.sender).getParameters();

        _setURI(_uri);

        for (uint i = 0; i < _candidateNames.length; i++) {
            candidates.push(
                Types.Candidate({name: _candidateNames[i], description: _candidateDescriptions[i], totalVotes: 0})
            );
        }

        totalVotes = 0;
    }

    modifier isActive() {
        require((block.timestamp <= kickoff && block.timestamp >= deadline) == true, 'election not active');
        _;
    }

    /*///////////////////////////////////////////////////////////////
                            View functions
    //////////////////////////////////////////////////////////////*/

    function totalVotesByCandidate(uint256 _candidateIndex) external view returns (uint256) {
        return candidates[_candidateIndex].totalVotes;
    }

    /*///////////////////////////////////////////////////////////////
                            External/Public functions
    //////////////////////////////////////////////////////////////*/

    function vote(
        string memory _did,
        uint256 _candidateIndex,
        bytes calldata _signature
    ) external noDelegateCall isActive {
        string memory message = SignatureVerifier.formatMessage([_did, Strings.toString(_candidateIndex)]);
        address trustedSigner = IElectionFactory(factory).trustedSigner();
        address registry = IElectionFactory(factory).registry();

        require(SignatureVerifier.verify(message, _signature, trustedSigner) == true, 'invalid signature');

        Types.Voter memory voter = IRegistry(registry).voter(_did);

        // require(voter != 0, 'invalid voter');

        totalVotes += 1;
        candidates[_candidateIndex].totalVotes += 1;

        votes[_did] = Types.Vote(msg.sender, voter, _candidateIndex, block.timestamp);

        super._mint(msg.sender, 1, uint256(1), bytes('hello'));

        emit SubmitVote();
    }

    /*///////////////////////////////////////////////////////////////
                            Internal functions
    //////////////////////////////////////////////////////////////*/

    // The following functions are overrides required by Solidity.

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }
}
