import React, { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { VoteOptions } from "./VoteOptions";
import { VoteSubmission } from "./VoteSubmission";
import Results from "../results/Results";
import { useVid } from "@/hooks/useVid";

export default function Vote() {
  const [selectedOption, setSelectedOption] = useState<null | {
    index: number;
    name: string;
  }>(null);

  const [submitted, setSubmitted] = useState(false);
  const { vid } = useVid();

  return (
    <>
      {!submitted && (
        <div className="flex flex-col h-full">
          <div className="flex-none">
            <VoteOptions
              onOptionSelect={setSelectedOption}
              selectedOptionIdx={selectedOption?.index ?? -1}
            />
          </div>
          <div className="flex-1 " />

          <div className="min-h-[120px] mt-12 flex-none">
            {selectedOption && (
              <VoteSubmission
                selectedOption={selectedOption}
                onSubmitted={() => setSubmitted(true)}
              />
            )}
          </div>
        </div>
      )}

      {!!submitted && (
        <div className="flex-none">
          <div className="mb-12 ">
            <div className="mb-2">Your vote has been cast!</div>
            <Link
              className="font-medium text-primary-500 inline-flex items-center"
              href={`https://sepolia.etherscan.io/tx/${vid}`}
            >
              View on Block Explorer
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          <Results />
        </div>
      )}
    </>
  );
}
