// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import '@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';

contract Election is
    Initializable,
    ERC1155Upgradeable,
    ERC1155SupplyUpgradeable,
    AccessControlUpgradeable,
    UUPSUpgradeable
{
    /*///////////////////////////////////////////////////////////////
                                State
    //////////////////////////////////////////////////////////////*/
    bytes32 public constant UPGRADER_ROLE = keccak256('UPGRADER_ROLE');

    address public constant registry = IRegistry('0x0');

    struct Vote {
        address caster;
        Voter voter;
        bytes32 candidate_index;
        uint256 created_at;
    }

    struct Candidate {
        bytes32 name;
        bytes32 description;
    }

    bytes32 public name;
    bytes32 public description;
    uint256 public kickoff;
    uint256 public deadline;

    Candidate[] public candidates;
    Vote[] public votes;

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
        Candidate[] _candidates,
        uint256 _kickoff,
        uint256 _deadline
    ) public initializer {
        require(_deadline > _kickoff, 'deadline must be after kickoff');

        __ERC1155_init(uri);
        __ERC1155Supply_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        kickoff = _kickoff;
        deadline = _deadline;
        candidates = _candidates;

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(UPGRADER_ROLE, upgrader);
    }

    /*///////////////////////////////////////////////////////////////
                            View functions
    //////////////////////////////////////////////////////////////*/

    function metadata() public view returns (bytes32) {
        return (name);
    }

    function total_voters() public view returns (uint) {
        return votes.length;
    }

    function candidates() public view returns (Candidate[]) {
        return candidates;
    }

    /*///////////////////////////////////////////////////////////////
                            External/Public functions
    //////////////////////////////////////////////////////////////*/

    function update_metadata() public {}

    function vote(bytes32 _did, uint256 _candidate, bytes32 _signature) public {
        require(Utils.verify_signature(_signature) == true, 'invalid signature');

        Voter voter = registry().voter(_did);

        require(voter != 0, 'invalid voter');

        votes.push(Vote(msg.sender, voter, _candidate, block.timestamp));
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
