import React, { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useEffect, useState } from "react";
import { ELECTION_CONTRACT_CONFIG } from "@/constants/config";
import Button from "@/components/buttons/Button";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";

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
  const { auth } = useAuth();
  const { writeContract, data: hash, error } = useWriteContract();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { electionContractAddress } = useParams();

  const { isLoading: isTransactionLoading, isSuccess } =
    useWaitForTransactionReceipt({
      hash,
    });

  console.log("ERROR", error);

  console.log(isTransactionLoading, isSuccess);

  useEffect(() => {
    if (hash) {
      console.log("hash", hash);
      onSubmitted();
      setIsVoting(false);
    }
  }, [hash]);

  useEffect(() => {
    if (error) {
      setIsVoting(false);
      setErrorMessage(error.message);
    }
  }, [error]);

  const handleVote = async () => {
    if (!auth?.id) return;

    setIsVoting(true);

    writeContract({
      ...ELECTION_CONTRACT_CONFIG,
      functionName: "vote",
      address: electionContractAddress as `0x${string}`,
      args: [auth?.id as string, BigInt(selectedOption.index)],
    });
  };

  // if (isLoading || isTransactionLoading) return <div>Processing...</div>;
  // if (isError) return <div>Error submitting vote</div>;
  // if (isSuccess) return <div>Vote submitted successfully!</div>;

  return (
    <>
      <p className="text-sm mb-4">You have selected {selectedOption.name}.</p>
      <Button
        onClick={handleVote}
        isLoading={isVoting}
        disabled={isVoting || !selectedOption}
        className="block w-full"
        size="base"
      >
        Confirm your Vote
      </Button>
      {errorMessage && (
        <p className="text-red-500 text-xs font-medium mt-6">{errorMessage}</p>
      )}
    </>
  );
}
