// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import '@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';

// Libs
import '../libraries/Types.sol';
import '../libraries/SignatureVerifier.sol';

import '../interfaces/IRegistry.sol';
import './NoDelegateCall.sol';
import '../interfaces/IElection.sol';

contract Election is
    IElection,
    Initializable,
    ERC1155Upgradeable,
    ERC1155SupplyUpgradeable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    NoDelegateCall
{
    /*///////////////////////////////////////////////////////////////
                                State
    //////////////////////////////////////////////////////////////*/
    bytes32 public constant UPGRADER_ROLE = keccak256('UPGRADER_ROLE');

    address public registry;
    address private trusted_signer;

    bytes32 public name;
    bytes32 public description;
    uint256 public kickoff;
    uint256 public deadline;

    Types.Candidate[] public candidates;
    // Types.Vote[] public votes;
    mapping(bytes => Types.Vote) public votes;

    event SubmitVote();

    /*///////////////////////////////////////////////////////////////
                    Constructor, Initializer, Modifiers
    //////////////////////////////////////////////////////////////*/

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address upgrader,
        string memory uri,
        address _registry,
        // Types.Candidate[] calldata _candidates,
        uint256 _kickoff,
        uint256 _deadline,
        address _trusted_signer
    ) public initializer {
        require(_deadline > _kickoff, 'deadline must be after kickoff');

        __ERC1155_init(uri);
        __ERC1155Supply_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        registry = _registry;
        trusted_signer = _trusted_signer;
        kickoff = _kickoff;
        deadline = _deadline;
        // candidates = _candidates;

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(UPGRADER_ROLE, upgrader);
    }

    modifier is_active() {
        require((block.timestamp <= kickoff && block.timestamp >= deadline) == true, 'election not active');
        _;
    }

    /*///////////////////////////////////////////////////////////////
                            View functions
    //////////////////////////////////////////////////////////////*/

    /*///////////////////////////////////////////////////////////////
                            External/Public functions
    //////////////////////////////////////////////////////////////*/

    function vote(
        string calldata _did,
        uint256 _candidate,
        string calldata _message,
        bytes calldata _signature
    ) external is_active {
        _vote(_did, _candidate, _message, _signature);
    }

    function register_and_vote(
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
