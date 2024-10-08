import React, { useState } from "react";
import { VoteOptions } from "./VoteOptions";
import { VoteSubmission } from "./VoteSubmission";

export default function Vote() {
  const [selectedOption, setSelectedOption] = useState<null | {
    index: number;
    name: string;
  }>(null);

  return (
    <div>
      <VoteOptions onOptionSelect={setSelectedOption} />
      {selectedOption && <VoteSubmission selectedOption={selectedOption} />}
    </div>
  );
}
