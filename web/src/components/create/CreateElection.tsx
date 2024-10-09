"use client";

import React, { useState } from "react";
import { Election } from "@/components/types/types";
import {
  ELECTION_CONTRACT_CONFIG,
  ELECTION_FACTORY_CONTRACT_CONFIG,
} from "@/constants/config";
import { useWriteContract } from "wagmi";
import Link from "next/link";
import Button from "../buttons/Button";
import { useAuth } from "@/hooks/useAuth";

export default function CreateElection() {
  const { auth } = useAuth();

  // Election
  const [uri, setUri] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [kickoff, setKickoff] = useState(BigInt(Date.now()));
  const [deadline, setDeadline] = useState(BigInt(Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60)));

  // Election - Candidates
  const [numCandidates, setNumCandidates] = useState(2);
  const [isSettingCandidates, setIsSettingCandidates] = useState(false);

  const [candidateNames, setCandidateNames] = useState<string[]>([]);
  const [candidateDescriptions, setCandidateDescriptions] = useState<string[]>(
    []
  );

  const {
    writeContract,
    data: electionContractAddress,
    isSuccess,
    isError,
    error,
  } = useWriteContract();

  // console.log(data);
  console.log(isSuccess, isError, error);

  const handleCreateElection = (): void => {
    console.log(name, description, kickoff, deadline);
    writeContract({
      ...ELECTION_FACTORY_CONTRACT_CONFIG,
      functionName: "createElection",
      args: [uri, name, description, kickoff, deadline],
    });
  };

  const handleSetCandidates = (): void => {
    if (!auth?.id || electionContractAddress == null) return;

    setIsSettingCandidates(true);

    writeContract({
      ...ELECTION_CONTRACT_CONFIG,
      functionName: "setCandidates",
      args: [candidateNames, candidateDescriptions],
      address: electionContractAddress,
    });
  };

  if (isSuccess)
    return (
      <div>
        {Array(numCandidates).map((x) => (
          <div key={x}>
            <input
              className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
              type="text"
              value={candidateNames[x]}
              onChange={(e) =>
                setCandidateNames([...candidateNames, e.target.value])
              }
            />
            <input
              className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
              type="text"
              value={candidateDescriptions[x]}
              onChange={(e) =>
                setCandidateDescriptions([
                  ...candidateDescriptions,
                  e.target.value,
                ])
              }
            />

            {numCandidates > 2 && (
              <Button
                onClick={() => {
                  setNumCandidates(numCandidates - 1);
                  setCandidateNames(candidateNames.slice(0, -1));
                  setCandidateDescriptions(candidateDescriptions.slice(0, -1));
                }}
                className="block w-full"
                size="base"
              >
                -
              </Button>
            )}
          </div>
        ))}

        <Button
          onClick={() => setNumCandidates(numCandidates + 1)}
          className="block w-full"
          size="base"
        >
          +
        </Button>

        <Button
          onClick={handleSetCandidates}
          isLoading={isSettingCandidates}
          disabled={isSettingCandidates}
          className="block w-full"
          size="base"
        >
          Set candidates
        </Button>
      </div>
    );

  return (
    <div>
      <h2>Create Election</h2>
      <>
        <input
          className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
          type="text"
          value={uri}
          onChange={(e) => setUri(e.target.value)}
          placeholder="URI"
        />
        <input
          className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Election Name"
        />
        <input
          className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Election Description"
        />
        <input
          className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
          type="number"
          value={Number(kickoff)}
          onChange={(e) => setKickoff(BigInt(e.target.value))}
          placeholder="Kickoff"
        />
        <input
          className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
          type="number"
          value={Number(deadline)}
          onChange={(e) => setDeadline(BigInt(e.target.value))}
          placeholder="Deadline"
        />
      </>
      <button
        type="submit"
        className="bg-primary-600 shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-white"
        onClick={handleCreateElection}
      >
        Submit
      </button>
      <Link href="/">
        <button
          type="submit"
          className="bg-primary-600 shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-white"
        >
          Back
        </button>
      </Link>
    </div>
  );
}
