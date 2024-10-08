"use client";

import { useReadContract } from "wagmi";
import Link from "next/link";
import {
  ELECTION_CONTRACT_CONFIG,
  ELECTION_FACTORY_CONTRACT_CONFIG,
} from "@/constants/config";
import { getTimeLeft } from "@/utils/dates";
import { ClockIcon } from "lucide-react";

export default function ElectionLink({
  electionId,
}: {
  electionId: `0x${string}`;
}) {
  // const [elections, setElections] = useState<Election[]>([]);

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

  console.log("electionName", electionName);
  console.log("error", error);
  // if (isLoading) return <div>Loading results...</div>;
  // if (isError) return <div>Error loading results</div>;

  return (
    <Link
      className="bg-white shadow-md p-4 rounded-xl w-full block"
      href={`/vote/${electionContractAddress}`}
    >
      <div>{electionName}</div>
      {/* <div>{election.description}</div> */}
      <div className="flex items-center text-gray-500 text-sm">
        <ClockIcon className="w-4 h-4 inline-block mr-1" />
        Voting closes in {getTimeLeft(Number(deadline) * 1000)}
      </div>
    </Link>
  );
}
