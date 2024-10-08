import React, { useWriteContract, useWaitForTransaction } from "wagmi";
import { useState } from "react";
import { CONTRACT_CONFIG } from "@/constant/config";

export function VoteSubmission({
  selectedOption,
}: {
  selectedOption: {
    index: number;
    name: string;
  };
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
  };

  // if (isLoading || isTransactionLoading) return <div>Processing...</div>;
  // if (isError) return <div>Error submitting vote</div>;
  // if (isSuccess) return <div>Vote submitted successfully!</div>;

  return (
    <>
      <p className="text-sm font-medium mb-4">
        Selected option: {selectedOption.name}
      </p>
      <button
        onClick={handleVote}
        disabled={isVoting || !selectedOption}
        className="bg-black text-white px-6 py-4 rounded-xl block w-full"
      >
        Submit Vote
      </button>
    </>
  );
}
