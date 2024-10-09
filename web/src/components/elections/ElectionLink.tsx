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
import React, { ReactNode, useMemo, useState } from "react";

function NotLink({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
  href?: string;
}) {
  return <div className={className}>{children}</div>;
}

export default function ElectionLink({
  electionId,
}: {
  electionId: `0x${string}`;
}) {
  const { auth } = useAuth();

  const { data: electionContractAddress } = useReadContract({
    ...ELECTION_FACTORY_CONTRACT_CONFIG,
    functionName: "getElection",
    args: [electionId],
  });

  const { data: electionName } = useReadContract({
    ...ELECTION_CONTRACT_CONFIG,
    address: electionContractAddress,
    functionName: "name",
  });

  var { data: deadline } = useReadContract({
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

  const userHasVoted = userVotes?.[1]?.did === auth.id;

  const pastDeadline = useMemo(() => {
    return deadline && new Date().getTime() > Number(deadline) * 1000;
  }, [deadline]);

  const Component = userHasVoted || !!pastDeadline ? NotLink : Link;

  return (
    <Component
      className="bg-white shadow-md rounded-xl w-full block overflow-hidden"
      href={`/vote/${electionContractAddress}`}
    >
      <div className="min-h-[40px] p-3 bg-white text-left text-lg">
        {electionName}
      </div>
      {/* <div>{election.description}</div> */}
      <div className="flex items-center justify-between bg-primary-600 text-xs p-3">
        <div className="flex items-center text-white">
          <ClockIcon
            className={`isDisabled ? 'text-gray-500 cursor-not-allowed' :w-3 h-3 inline-block mr-1`}
          />
          {!pastDeadline && (
            <>Voting closes in {getTimeLeft(Number(deadline) * 1000)}</>
          )}
          {pastDeadline && "Voting has ended"}
        </div>
        <div className="rounded-lg bg-white font-medium text-primary-600 px-3 py-2 text-md">
          {userHasVoted ? "Voted" : "Vote"}
        </div>
      </div>
    </Component>
  );
}
