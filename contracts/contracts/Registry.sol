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

contract Registry is IRegistry {
    /*///////////////////////////////////////////////////////////////
                                State
    //////////////////////////////////////////////////////////////*/

    address private trustedSigner;

    mapping(bytes => Types.Voter) public registeredVoters;
    uint256 public totalRegistered;

    event VoterRegistration();

    /*///////////////////////////////////////////////////////////////
                    Constructor, Initializer, Modifiers
    //////////////////////////////////////////////////////////////*/

    constructor(address _trustedSigner) {
        trustedSigner = _trustedSigner;
    }

    /*///////////////////////////////////////////////////////////////
                            View functions
    //////////////////////////////////////////////////////////////*/

    function voter(string calldata _did) external view returns (Types.Voter memory) {
        return registeredVoters[bytes(_did)];
    }

    // function total_registered() external view returns (uint) {
    //     return registered_voters.length;
    // }

    /*///////////////////////////////////////////////////////////////
                            External/Public functions
    //////////////////////////////////////////////////////////////*/

    function register(string memory _did, bytes calldata _signature) external returns (Types.Voter memory) {
        string memory message = SignatureVerifier.formatMessage([_did, '']);
        require(SignatureVerifier.verify(message, _signature, trustedSigner) == true, 'invalid signature');

        require(bytes(_did).length != 0, 'invalid did');
        // require(voter_exists[bytes(_did)] == false, 'voter exists');

        Types.Voter memory voter = Types.Voter(msg.sender, _did, block.timestamp);

        registeredVoters[bytes(_did)] = voter;
        totalRegistered += 1;
        emit VoterRegistration();
        return voter;
    }

    /*///////////////////////////////////////////////////////////////
                            Internal functions
    //////////////////////////////////////////////////////////////*/
}
