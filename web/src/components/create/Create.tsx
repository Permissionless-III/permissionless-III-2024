"use client";

import React, { useState, useEffect } from "react";
import { Election } from "@/components/types/types";
import { ELECTION_FACTORY_CONTRACT_ABI, ELECTION_FACTORY_CONTRACT_CONFIG } from "@/constants/config";
import { useWriteContract } from "wagmi";

export default function Create() {
  const [uri, setUri] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  useState<string>("");
  const [kickoff, setKickoff] = useState<bigint>(BigInt(0));
  const [deadline, setDeadline] = useState<bigint>(BigInt(0));

  const { writeContract, isSuccess, isError, error } = useWriteContract();

  function handleCreateElection(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(name, description, kickoff, deadline);
    writeContract({
      abi: ELECTION_FACTORY_CONTRACT_ABI,
      functionName: "createElection",
      args: ["info", name, description, kickoff, deadline],
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    });
    console.log(isSuccess, isError, error);
    console.log("Election created");
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
          type="number"
          value={Number(kickoff)}
          onChange={e => setKickoff(BigInt(e.target.value))}
          placeholder="Kickoff"
        />
        <input
          type="number"
          value={Number(deadline)}
          onChange={e => setDeadline(BigInt(e.target.value))}
          placeholder="Deadline"
        />
      </>
      <form onSubmit={handleCreateElection}>
        <button type="submit" className="bg-blue-500 shadow-md p-4 rounded-xl w-full block">Create Election</button>
      </form>
    </div>
  );
}
