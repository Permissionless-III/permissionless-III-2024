"use client";

import React, { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import { Election } from "../types/types";
import { electionsData } from "@/app/data/elections";
import Link from "next/link";

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

  // if (isLoading) return <div>Loading results...</div>;
  // if (isError) return <div>Error loading results</div>;

  return (
    <div>
      {elections.length === 0 ? (
        <p>No elections have been created yet.</p>
      ) : (
        <div className="flex flex-col gap-3 h-full">
          {elections.map(election => (
            <Link
              className="bg-white shadow-md p-4 rounded-xl w-full block"
              key={election.id}
              href={`/vote/${election.id}`}
            >
              ID: {election.id}, Description: {election.description}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
