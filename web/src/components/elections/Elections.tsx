"use client";

import React, { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { Election } from "../types/types";
import { electionsData } from "@/app/data/elections";
import Link from "next/link";
import { ELECTION_FACTORY_CONTRACT_CONFIG } from "@/constants/config";

export default function Elections() {
  // const [elections, setElections] = useState<Election[]>([]);

  const { data: elections, error } = useReadContract({
    ...ELECTION_FACTORY_CONTRACT_CONFIG,
    functionName: "elections",
  });

  console.log("elections", elections);
  console.log("error", error);
  // if (isLoading) return <div>Loading results...</div>;
  // if (isError) return <div>Error loading results</div>;

  return (
    <div>
      {!elections || elections?.length === 0 ? (
        <p>No elections have been created yet.</p>
      ) : (
        <div className="flex flex-col gap-3 h-full">
          {elections.map((election: any) => (
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
