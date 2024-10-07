import React, { useState } from "react";
import { VoteOptions } from "./VoteOptions";
import { VoteSubmission } from "./VoteSubmission";

export default function Vote() {
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <div>
      <h1>Voting System</h1>
      <VoteOptions onOptionSelect={setSelectedOption} />
      {selectedOption && <VoteSubmission selectedOption={selectedOption} />}
    </div>
  );
}
