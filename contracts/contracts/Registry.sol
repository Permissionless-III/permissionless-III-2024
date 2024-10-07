// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';

// Libs
import '../libraries/Types.sol';
import '../libraries/SignatureVerifier.sol';

import '../interfaces/IRegistry.sol';

contract Registry is IRegistry, Initializable, AccessControlUpgradeable, UUPSUpgradeable {
    /*///////////////////////////////////////////////////////////////
                                State
    //////////////////////////////////////////////////////////////*/
    bytes32 public constant UPGRADER_ROLE = keccak256('UPGRADER_ROLE');

    address private trusted_signer;

    mapping(bytes => Types.Voter) public registered_voters;

    event VoterRegistration();

    /*///////////////////////////////////////////////////////////////
                    Constructor, Initializer, Modifiers
    //////////////////////////////////////////////////////////////*/

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address defaultAdmin, address upgrader, address _trusted_signer) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        trusted_signer = _trusted_signer;

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(UPGRADER_ROLE, upgrader);
    }

    /*///////////////////////////////////////////////////////////////
                            View functions
    //////////////////////////////////////////////////////////////*/

    function voter(string calldata _did) external view returns (Types.Voter memory) {
        return registered_voters[bytes(_did)];
    }

    // function total_registered() external view returns (uint) {
    //     return registered_voters.length;
    // }

    /*///////////////////////////////////////////////////////////////
                            External/Public functions
    //////////////////////////////////////////////////////////////*/

    function register(
        string calldata _did,
        string calldata _message,
        bytes calldata _signature
    ) external returns (Types.Voter memory) {
        require(SignatureVerifier.verify(_message, _signature, trusted_signer) == true, 'invalid signature');

        require(bytes(_did).length != 0, 'invalid did');
        // require(voter_exists[bytes(_did)] == false, 'voter exists');

        Types.Voter memory voter = Types.Voter(msg.sender, bytes(_did), block.timestamp);

        registered_voters[bytes(_did)] = voter;
        emit VoterRegistration();
        return voter;
    }

    /*///////////////////////////////////////////////////////////////
                            Internal functions
    //////////////////////////////////////////////////////////////*/

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
