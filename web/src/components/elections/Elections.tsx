"use client";

import React, { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import { Election } from "../types/types";
import { electionsData } from "@/app/data/elections";

// Replace with your actual contract ABI and address
const contractABI = [
  /* Your contract ABI here */
];
const contractAddress = "0x..."; // Your contract address


const ulStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'Arial, sans-serif'
};

const divStyle = {
  background: '#f4f4f4',
  margin: '5px 0',
  padding: '10px',
  borderRadius: '5px',
  transition: 'background 0.3s',
  cursor: 'pointer'
};

const liHoverStyle = {
  background: '#e2e2e2'
};

export default function Elections() {
  const [elections, setElections] = useState<Election[]>([]);

  // const { data, isError, isLoading } = useContractRead({
  //   address: contractAddress,
  //   abi: contractABI,
  //   functionName: "getVoteResults",
  // });

  useEffect(() => {
    if (electionsData) {
      // Assuming the contract returns an array of objects with option and votes
      setElections(electionsData);
    }
  }, [elections]);

  const handleElectionClick = (election: Election) => {
    console.log(election);
    window.location.href = `/vote/${election.id}`;
  }

  // if (isLoading) return <div>Loading results...</div>;
  // if (isError) return <div>Error loading results</div>;

  return (
    <div>
      <h2>Elections</h2>
      {elections.length === 0 ? (
        <p>No elections have been created yet.</p>
      ) : (
        <ul style={ulStyle}>
          {elections.map((election) => (
            <div key={election.id}
              onClick={(e) => handleElectionClick(election)}
              style={divStyle}>
              <li>{election.results}</li>
              <li>{election.description}</li>
              <li>{election.kickoff.toDateString()}</li>
              <li>{election.deadline.toDateString()}</li>
              <li>{election.candidates.join(", ")}</li>
            </div>
          ))}
        </ul>
      )
      }
    </div >
  );
}
