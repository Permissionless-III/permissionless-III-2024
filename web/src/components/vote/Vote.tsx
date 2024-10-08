import React, { useState } from "react";
import { VoteOptions } from "./VoteOptions";
import { VoteSubmission } from "./VoteSubmission";
import Results from "../results/Results";

export default function Vote() {
  const [selectedOption, setSelectedOption] = useState<null | {
    index: number;
    name: string;
  }>(null);

  const [submittedVid, setSubmittedVid] = useState(false);

  return (
    <div>
      {!submittedVid && (
        <>
          <VoteOptions onOptionSelect={setSelectedOption} />

          <div className="min-h-[100px] mt-8">
            {selectedOption && (
              <VoteSubmission
                selectedOption={selectedOption}
                onSubmitted={(vid: string) => setSubmittedVid(vid)}
              />
            )}
          </div>
        </>
      )}

      {!!submittedVid && (
        <div>
          Submitted {submittedVid}
          <Results />
        </div>
      )}
    </div>
  );
}
