"use client";

import React, { useState, useEffect } from "react";
import { Election } from "@/components/types/types";
import { ELECTION_FACTORY_CONTRACT_ABI, ELECTION_FACTORY_CONTRACT_CONFIG } from "@/constants/config";
import { useWriteContract } from "wagmi";
import Link from "next/link";

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

  const handleCreateElection = (): void => {
    console.log(name, description, kickoff, deadline);
    writeContract({
      ...ELECTION_FACTORY_CONTRACT_CONFIG,
      functionName: "createElection",
      args: [uri, name, description, kickoff, deadline],
    });
  }

  return (
    <div>
      <h2>Create Election</h2>
      <>
        <input
          className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
          type="text"
          value={uri}
          onChange={e => setUri(e.target.value)}
          placeholder="URI"
        />
        <input
          className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Election Name"
        />
        <input
          className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Election Description"
        />
        <input
          className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
          type="number"
          value={Number(kickoff)}
          onChange={e => setKickoff(BigInt(e.target.value))}
          placeholder="Kickoff"
        />
        <input
          className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
          type="number"
          value={Number(deadline)}
          onChange={e => setDeadline(BigInt(e.target.value))}
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
