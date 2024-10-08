import { ELECTION_FACTORY_CONTRACT_CONFIG } from "@/constants/config";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import Button from "@/components/buttons/Button";
import { cn } from "@/lib/utils";
import { ClockIcon } from "lucide-react";
import { parseEther } from "viem";
import { useParams } from "next/navigation";
import { getTimeLeft } from "@/utils/dates";

type VoteOption = {
  name: string;
  description: string;
};

export function VoteOptions({
  onOptionSelect,
  selectedOptionIdx,
}: {
  onOptionSelect: (optionIdx: { index: number; name: string }) => void;
  selectedOptionIdx: number;
}) {
  const { electionId } = useParams();
  // const { data: electionOptions } = useReadContract({
  //   ...CONTRACT_CONFIG,
  //   functionName: "candidates",
  // });

  // console.log("Config", CONTRACT_CONFIG.address);

  const { data: election } = useReadContract({
    ...ELECTION_FACTORY_CONTRACT_CONFIG,
    functionName: "getElection",
    args: [electionId],
  });

  console.log("election", election);

  // const { data: electionName } = useReadContract({
  //   ...CONTRACT_CONFIG,
  //   functionName: "name",
  // });

  // console.log("electionName", electionName);
  // console.log("electionOptions", electionOptions);

  // name, description, kickoff, deadline
  const electionName = "2024 US Presidential Election";

  const electionOptions = [
    {
      name: "Donald J. Trump",
      description: "Republican candidate",
    },
    {
      name: "Kamala Harris",
      description: "Democratic candidate",
    },
    {
      name: "Kamala Harris",
      description: "Democratic candidate",
    },
    {
      name: "Kamala Harris",
      description: "Democratic candidate",
    },
    {
      name: "Kamala Harris",
      description: "Democratic candidate",
    },
  ];

  const deadline = Date.now() + 30 * 24 * 60 * 60 * 1000;

  if (!electionOptions) return null;

  return (
    <>
      <h2 className="text-xl font-medium mb-2">{electionName}</h2>
      <span className="text-sm text-gray-400 font-normal inline-flex items-center mb-8">
        <ClockIcon className="w-4 h-4 mr-1" />
        Voting ends in {getTimeLeft(deadline)}
      </span>
      <div className="flex flex-col gap-3 lg:gap-4">
        {electionOptions?.map((option: VoteOption, idx: number) => (
          <Button
            variant="light"
            className={cn("block w-full", {
              "ring-2 ring-primary-500": selectedOptionIdx === idx,
            })}
            size="base"
            key={idx}
            onClick={() => onOptionSelect({ index: idx, name: option.name })}
          >
            {option?.name}
            <span className="block text-sm text-gray-400 font-normal">
              ({option?.description})
            </span>
          </Button>
        ))}
      </div>
    </>
  );
}
