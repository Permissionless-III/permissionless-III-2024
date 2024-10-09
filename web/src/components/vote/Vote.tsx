import { useState } from "react";
import { VoteOptions } from "./VoteOptions";
import { VoteSubmission } from "./VoteSubmission";
import VoteSuccess from "./VoteSuccess";
import Kyc from "../Kyc";
import { useAuth } from "@/hooks/useAuth";

export default function Vote() {
  const [selectedOption, setSelectedOption] = useState<null | {
    index: number;
    name: string;
  }>(null);

  const { auth } = useAuth();

  const [submitted, setSubmitted] = useState(false);

  if (!auth.isVerified) return <Kyc />;

  if (!submitted)
    return (
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
    );

  if (submitted) {
    return <VoteSuccess />;
  }
}
