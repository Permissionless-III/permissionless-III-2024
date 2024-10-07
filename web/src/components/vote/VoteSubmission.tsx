import React, { useContractWrite, useWaitForTransaction } from "wagmi";
import { useState } from "react";

// Replace with your actual contract ABI and address
const contractABI = [
  /* Your contract ABI here */
];
const contractAddress = "0x..."; // Your contract address

export function VoteSubmission({ selectedOption }: { selectedOption: string }) {
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
      <h2>Submit Your Vote</h2>
      <p>Selected option: {selectedOption}</p>
      <button onClick={handleVote} disabled={isVoting || !selectedOption}>
        Submit Vote
      </button>
    </div>
  );
}
