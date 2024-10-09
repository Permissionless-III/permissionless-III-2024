// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';

// Libs
import '../libraries/Types.sol';
// import '../libraries/SignatureVerifier.sol';

import '../interfaces/IRegistry.sol';

contract Registry is IRegistry {
    /*///////////////////////////////////////////////////////////////
                                State
    //////////////////////////////////////////////////////////////*/

    /// @inheritdoc IRegistry
    address public trustedSigner;

    mapping(string => Types.Voter) public registeredVoters;

    /// @inheritdoc IRegistry
    uint256 public totalRegistered;

    event VoterRegistration(string did);

    /*///////////////////////////////////////////////////////////////
                    Constructor, Initializer, Modifiers
    //////////////////////////////////////////////////////////////*/

    constructor(address _trustedSigner) {
        require(_trustedSigner != address(0), 'invalid trusted signer');
        trustedSigner = _trustedSigner;
    }

    /*///////////////////////////////////////////////////////////////
                            View functions
    //////////////////////////////////////////////////////////////*/

    function voter(string calldata _did) external view returns (Types.Voter memory) {
        return registeredVoters[_did];
    }

    /*///////////////////////////////////////////////////////////////
                            External/Public functions
    //////////////////////////////////////////////////////////////*/

    function register(string memory _did) external returns (Types.Voter memory) {
        // string memory message = SignatureVerifier.formatMessage([_did, '']);
        // require(SignatureVerifier.verify(message, _signature, trustedSigner) == true, 'invalid signature');

        // require(_did.length != 0, 'invalid did');
        // require(voter_exists[bytes(_did)] == false, 'voter exists');

        Types.Voter memory voter = Types.Voter(msg.sender, _did, block.timestamp);

        registeredVoters[_did] = voter;
        totalRegistered += 1;
        emit VoterRegistration(_did);
        return voter;
    }

    /*///////////////////////////////////////////////////////////////
                            Internal functions
    //////////////////////////////////////////////////////////////*/
}
