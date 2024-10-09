"use client";

import { ELECTION_CONTRACT_CONFIG, ELECTION_FACTORY_CONTRACT_ADDRESS } from "@/constants/config";
import { useState } from "react";
import { useWriteContract } from "wagmi";

export default function Candidates() {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [candidateDescriptions, setCandidateDescriptions] = useState<string[]>([]);

  const { writeContract } = useWriteContract();

  const addCandidatesAndDescriptions = () => {
    // writeContract({
    //   ...ELECTION_CONTRACT_CONFIG,
    //   functionName: "setCandidates",
    //   args: [candidates, candidateDescriptions],
    // address: "",
    // });
  }

  return (
    <div>
      <h2>Add Candidates</h2>
      <input
        className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
        type="text"
        value={candidates}
        onChange={e => setCandidates([e.target.value])}
        placeholder="Add candidates followed by a comma"
      />
      <input
        className="bg-white shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-lg"
        type="text"
        value={candidateDescriptions}
        onChange={e => setCandidateDescriptions([e.target.value])}
        placeholder="Add descriptions followed by a comma"
      />
      <button
        type="submit"
        className="bg-primary-600 shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-white"
        onClick={addCandidatesAndDescriptions}
      >
        Submit
      </button>
    </div >
  );
}
