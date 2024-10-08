import React, { useState } from "react";
import { VoteOptions } from "./VoteOptions";
import { VoteSubmission } from "./VoteSubmission";
import Results from "../results/Results";
import { useVid } from "@/hooks/useVid";
import { useRouter } from "next/router";

export default function Vote() {
  const [selectedOption, setSelectedOption] = useState<null | {
    index: number;
    name: string;
  }>(null);

  const [submitted, setSubmitted] = useState(false);
  const { vid } = useVid();

  return (
    <div>
      {!submitted && (
        <>
          <VoteOptions
            onOptionSelect={setSelectedOption}
            selectedOptionIdx={selectedOption?.index ?? -1}
          />

          <div className="min-h-[120px] mt-12">
            {selectedOption && (
              <VoteSubmission
                selectedOption={selectedOption}
                onSubmitted={() => setSubmitted(true)}
              />
            )}
          </div>
        </>
      )}

      {!!submitted && (
        <div>
          Submitted {vid} (view on explorer)
          <Results />
        </div>
      )}
    </div>
  );
}
