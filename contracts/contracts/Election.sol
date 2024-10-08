// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';

// Libs
import '../libraries/Types.sol';
import '../libraries/SignatureVerifier.sol';
import '../interfaces/IElectionDeployer.sol';

import '../interfaces/IRegistry.sol';
import './NoDelegateCall.sol';
import '../interfaces/IElection.sol';

contract Election is IElection, ERC1155, ERC1155Supply, NoDelegateCall {
    /*///////////////////////////////////////////////////////////////
                                State
    //////////////////////////////////////////////////////////////*/

    string public name;
    string public description;
    uint256 public kickoff;
    uint256 public deadline;
    address private trustedSigner;

    Types.Candidate[] public candidates;

    //
    mapping(bytes => Types.Vote) public votes;

    event SubmitVote();

    /*///////////////////////////////////////////////////////////////
                    Constructor, Initializer, Modifiers
    //////////////////////////////////////////////////////////////*/

    constructor() ERC1155() {
        (_factory, name, description, kickoff, deadline, ) = IElectionDeployer(msg.sender).parameters();

        kickoff = _kickoff;
        deadline = _deadline;

        for (uint i = 0; i < _candidateNames.length; i++) {
            candidates.push(Types.Candidate({name: _candidateNames[i], description: _candidateDescriptions[i]}));
        }
    }

    modifier is_active() {
        require((block.timestamp <= kickoff && block.timestamp >= deadline) == true, 'election not active');
        _;
    }

    /*///////////////////////////////////////////////////////////////
                            View functions
    //////////////////////////////////////////////////////////////*/

    function totalVotes() {
        return votes.length;
    }

    /*///////////////////////////////////////////////////////////////
                            External/Public functions
    //////////////////////////////////////////////////////////////*/

    function vote(
        string calldata _did,
        uint256 _candidateIndex,
        string calldata _message,
        bytes calldata _signature
    ) external is_active {
        _vote(_did, _candidate, _message, _signature);
    }

    function registerAndVote(
        string calldata _did,
        uint256 _candidate,
        string calldata _message,
        bytes calldata _signature
    ) external is_active {
        IRegistry(registry).register(_did, _message, _signature);
        _vote(_did, _candidate, _message, _signature);
    }

    /*///////////////////////////////////////////////////////////////
                            Internal functions
    //////////////////////////////////////////////////////////////*/

    function _vote(
        string calldata _did,
        uint256 _candidate_index,
        string calldata _message,
        bytes memory _signature
    ) public noDelegateCall {
        require(SignatureVerifier.verify(_message, _signature, trusted_signer) == true, 'invalid signature');

        Types.Voter memory voter = IRegistry(registry).voter(_did);

        // require(voter != 0, 'invalid voter');

        votes[bytes(_did)] = Types.Vote(msg.sender, voter, _candidate_index, block.timestamp);

        // TODO: election_id
        // super._mint(msg.sender, 1, [uint256(1)], [uint256(1)]);

        emit SubmitVote();
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155Upgradeable, ERC1155SupplyUpgradeable) {
        super._update(from, to, ids, values);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155Upgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
