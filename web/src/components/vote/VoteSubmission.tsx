import React, { useContractWrite, useWaitForTransaction } from "wagmi";
import { useState } from "react";

// Replace with your actual contract ABI and address
const contractABI = [
  /* Your contract ABI here */
];
const contractAddress = "0x..."; // Your contract address

export function VoteSubmission({
  selectedOption,
}: {
  selectedOption: {
    index: number;
    name: string;
  };
}) {
  const [isVoting, setIsVoting] = useState(false);

  // const { write, data, isLoading, isError } = useContractWrite({
  //   address: contractAddress,
  //   abi: contractABI,
  //   functionName: "submitVote",
  // });

  // const { isLoading: isTransactionLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // });

  const handleVote = () => {
    setIsVoting(true);
    // write({ args: [selectedOption] });
  };

  // if (isLoading || isTransactionLoading) return <div>Processing...</div>;
  // if (isError) return <div>Error submitting vote</div>;
  // if (isSuccess) return <div>Vote submitted successfully!</div>;

  return (
    <div>
      <p className="text-sm font-medium mb-4 mt-8">
        Selected option: {selectedOption.name}
      </p>
      <button
        onClick={handleVote}
        disabled={isVoting || !selectedOption}
        className="bg-black text-white px-4 py-2 rounded block w-full"
      >
        Submit Vote
      </button>
    </div>
  );
}
