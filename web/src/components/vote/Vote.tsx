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
      <div className="min-h-[100px] mt-8">
        {selectedOption && <VoteSubmission selectedOption={selectedOption} />}
      </div>
    </div>
  );
}
