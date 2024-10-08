import React, { useWriteContract, useWaitForTransaction } from "wagmi";
import { useState } from "react";
import { CONTRACT_CONFIG } from "@/constants/config";
import Button from "@/components/buttons/Button";

export function VoteSubmission({
  selectedOption,
  onSubmitted,
}: {
  selectedOption: {
    index: number;
    name: string;
  };
  onSubmitted: () => void;
}) {
  const [isVoting, setIsVoting] = useState(false);

  // const { writeContract, data: hash } = useWriteContract({
  //   ...CONTRACT_CONFIG,
  //   functionName: "vote",
  //   args: [selectedOption.index, selectedOption.name],
  // });

  // const { isLoading: isTransactionLoading, isSuccess } = useWaitForTransaction({
  //   hash,
  // });

  const handleVote = async () => {
    setIsVoting(true);

    // const result = await writeContract({
    //   ...CONTRACT_CONFIG,
    //   functionName: "vote",
    //   args: ["vid-string", BigInt(selectedOption.index)],
    // });

    onSubmitted();
    setIsVoting(false);
  };

  // if (isLoading || isTransactionLoading) return <div>Processing...</div>;
  // if (isError) return <div>Error submitting vote</div>;
  // if (isSuccess) return <div>Vote submitted successfully!</div>;

  return (
    <>
      <p className="text-sm font-medium mb-4">
        Selected option: {selectedOption.name}
      </p>
      <Button
        onClick={handleVote}
        isLoading={isVoting}
        disabled={isVoting || !selectedOption}
        className="block w-full"
        size="base"
      >
        Submit Vote
      </Button>
    </>
  );
}
