"use client";

import { useReadContract } from "wagmi";
import Link from "next/link";
import {
  ELECTION_CONTRACT_CONFIG,
  ELECTION_FACTORY_CONTRACT_CONFIG,
} from "@/constants/config";
import { getTimeLeft } from "@/utils/dates";
import { ClockIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function ElectionLink({
  electionId,
}: {
  electionId: `0x${string}`;
}) {
  // const [elections, setElections] = useState<Election[]>([]);
  const { auth } = useAuth();

  const { data: electionContractAddress, error } = useReadContract({
    ...ELECTION_FACTORY_CONTRACT_CONFIG,
    functionName: "getElection",
    args: [electionId],
  });

  const { data: electionName } = useReadContract({
    ...ELECTION_CONTRACT_CONFIG,
    address: electionContractAddress,
    functionName: "name",
  });

  const { data: deadline } = useReadContract({
    ...ELECTION_CONTRACT_CONFIG,
    address: electionContractAddress,
    functionName: "deadline",
  });

  const { data: userVotes } = useReadContract({
    ...ELECTION_CONTRACT_CONFIG,
    address: electionContractAddress,
    functionName: "votes",
    args: auth?.id ? [auth?.id] : undefined,
  });

  console.log("electionName", electionName);
  console.log("error", error);
  console.log("userVotes", userVotes);

  // if (isLoading) return <div>Loading results...</div>;
  // if (isError) return <div>Error loading results</div>;

  return (
    <Link
      className="bg-white shadow-md rounded-xl w-full block overflow-hidden"
      href={`/vote/${electionContractAddress}`}
    >
      <div className="min-h-[40px] p-3 bg-white text-left text-lg">
        {electionName}
      </div>
      {/* <div>{election.description}</div> */}
      <div className="flex items-center justify-between bg-primary-600 text-xs p-3">
        <div className="flex items-center text-white">
          <ClockIcon className="w-3 h-3 inline-block mr-1" />
          Voting closes in {getTimeLeft(Number(deadline) * 1000)}
        </div>
        <div className="rounded-lg bg-white font-medium text-primary-600 px-3 py-2 text-md">
          Vote
        </div>
      </div>
    </Link>
  );
}
