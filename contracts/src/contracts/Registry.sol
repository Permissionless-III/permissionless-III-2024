// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';

import '../interfaces/IRegistry.sol';

contract Registry is Initializable, AccessControlUpgradeable, UUPSUpgradeable, IRegistry {
    /*///////////////////////////////////////////////////////////////
                                State
    //////////////////////////////////////////////////////////////*/
    bytes32 public constant UPGRADER_ROLE = keccak256('UPGRADER_ROLE');

    struct Voter {
        address minter;
        bytes did;
        uint256 registered_at;
        address elections;
    }

    Voter[] public registered_voters;
    mapping(bytes => bool) private voter_exists;

    /*///////////////////////////////////////////////////////////////
                    Constructor, Initializer, Modifiers
    //////////////////////////////////////////////////////////////*/

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address defaultAdmin, address upgrader) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(UPGRADER_ROLE, upgrader);
    }

    /*///////////////////////////////////////////////////////////////
                            View functions
    //////////////////////////////////////////////////////////////*/

    function total_registered() public view returns (uint) {
        return registered_voters.length;
    }

    function is_registered(bytes _did) public view returns (bool) {
        return voter_exists[_did];
    }

    /*///////////////////////////////////////////////////////////////
                            External/Public functions
    //////////////////////////////////////////////////////////////*/

    function register(bytes _did) public {
        require(Utils.verify_signature(_signature) == true, 'invalid signature');

        require(_did != address(0), 'invalid did');
        require(voter_exists[_did] == false, 'voter exists');

        registered_voters.push(Voter(msg.sender, _did, block.timestamp, []));
    }

    /*///////////////////////////////////////////////////////////////
                            Internal functions
    //////////////////////////////////////////////////////////////*/

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
