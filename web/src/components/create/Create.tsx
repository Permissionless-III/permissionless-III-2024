"use client";

import React, { useState, useEffect } from "react";
import { Election } from "@/components/types/types";
import { ELECTION_FACTORY_CONTRACT_CONFIG } from "@/constants/config";
import { useWriteContract } from "wagmi";

export default function Create() {
  const [uri, setUri] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [candidateNames, setCandidateNames] = useState<string>("");
  const [candidateDescriptions, setCandidateDescriptions] =
    useState<string>("");
  const [kickoff, setKickoff] = useState<number>(0);
  const [deadline, setDeadline] = useState<number>(0);

  const { writeContract, data: hash } = useWriteContract({
    ...ELECTION_FACTORY_CONTRACT_CONFIG,
    functionName: "createElection",
  });

  function handleCreateElection(event: any): void {
    event.preventDefault();
    console.log(name, description, kickoff, deadline);
    writeContract({ args: ["info", name, description, kickoff, deadline] })
  }

  return (
    <div>
      <h2>Create Election</h2>
      <>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Election Name"
        />
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Election Description"
        />
        <input
          type="text"
          value={kickoff}
          onChange={e => setKickoff(parseInt(e.target.value))}
          placeholder="Kickoff"
        />
        <input
          type="text"
          value={deadline}
          onChange={e => setDeadline(parseInt(e.target.value))}
          placeholder="Deadline"
        />
      </>
      <button className="bg-blue-500 shadow-md p-4 rounded-xl w-full block" onClick={handleCreateElection}>Create Election</button>
    </div>
  );
}
