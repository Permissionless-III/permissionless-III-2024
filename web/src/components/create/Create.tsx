"use client";

import React, { useState, useEffect } from "react";
import { Election } from "@/components/types/types";
import { ELECTION_FACTORY_CONTRACT_ABI, ELECTION_FACTORY_CONTRACT_CONFIG } from "@/constants/config";
import { useWriteContract } from "wagmi";

export default function Create() {
  const [uri, setUri] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  useState<string>("");
  const [kickoff, setKickoff] = useState<bigint>(BigInt(0));
  const [deadline, setDeadline] = useState<bigint>(BigInt(0));

  const { writeContract, data, isSuccess, isError, error } = useWriteContract();

  console.log(data);
  console.log(isSuccess, isError, error);

  function handleCreateElection(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(name, description, kickoff, deadline);
    writeContract({
      ...ELECTION_FACTORY_CONTRACT_CONFIG,
      functionName: "createElection",
      args: [uri, name, description, kickoff, deadline],
      address: "0x1Bd271E505DF4d5CA5A7cA9F780676c3edc7AF16",
    });
  }

  return (
    <div>
      <h2>Create Election</h2>
      <>
        <input
          type="text"
          value={uri}
          onChange={e => setUri(e.target.value)}
          placeholder="URI"
        />
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
