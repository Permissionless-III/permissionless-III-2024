"use client";

import React, { useState, useEffect } from "react";
import { Election } from "@/components/types/types";

export default function Create() {
  const [uri, setUri] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [candidateNames, setCandidateNames] = useState<string>('');
  const [candidateDescriptions, setCandidateDescriptions] = useState<string>('');
  const [kickoff, setKickoff] = useState<number>(0);
  const [deadline, setDeadline] = useState<number>(0);

  return (
    <div>
      <h2>Create Election</h2>
      <input type="text" value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Election Name" />
      <input type="text" value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Election Description" />
      <input type="text" value={candidateNames}
        style={{
          height: '100px',
        }}
        onChange={(e) => setCandidateNames(e.target.value)}
        placeholder="Candidate Names" />
      <input type="text" value={candidateDescriptions}
        style={{
          height: '100px',
        }}
        onChange={(e) => setCandidateDescriptions(e.target.value)}
        placeholder="Candidate Descriptions" />
      <input type="text" value={kickoff}
        onChange={(e) => setKickoff(parseInt(e.target.value))}
        placeholder="Kickoff" />
      <input type="text" value={deadline}
        onChange={(e) => setDeadline(parseInt(e.target.value))}
        placeholder="Deadline" />
    </div >
  );
}
