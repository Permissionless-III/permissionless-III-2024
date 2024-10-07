// SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.5.0;

/// @title Fund
/// @notice Positions represent an owner address' liquidity between a lower and upper tick boundary
/// @dev Positions store additional state for tracking fees owed to the position
library Types {
    // using Fund for State;
    // using ProtocolFeeLibrary for *;

    struct Voter {
        address minter;
        bytes did;
        uint256 registered_at;
        // address elections;
    }

    struct Vote {
        address caster;
        Voter voter;
        uint256 candidate_index;
        uint256 created_at;
    }

    struct Candidate {
        bytes32 name;
        bytes32 description;
    }
}
