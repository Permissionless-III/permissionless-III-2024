// SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.5.0;

library Types {
    struct Election {
        string id;
        string name;
        string description;
        uint256 kickoff;
        uint256 deadline;
        uint256 totalVotes;
    }

    struct Voter {
        address minter;
        string did;
        // bytes32 metadata;
        uint256 registeredAt;
        // uint256[] electionIds;
    }

    struct Vote {
        address caster;
        Voter voter;
        uint256 candidateIndex;
        uint256 createdAt;
    }

    struct Candidate {
        string name;
        string description;
        uint256 totalVotes;
    }
}
