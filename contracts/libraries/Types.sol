// SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.5.0;

library Types {
    struct Election {
        string id;
        string name;
        string description;
        uint256 kickoff;
        uint256 deadline;
    }

    struct Voter {
        address minter;
        string did;
        bytes32 metadata;
        uint256 registered_at;
        uint256[] electionIds;
    }

    struct Vote {
        address caster;
        Voter voter;
        uint256 candidate_index;
        uint256 created_at;
    }

    struct Candidate {
        string name;
        string description;
    }
}
