import { CONTRACT_CONFIG } from "@/constants/config";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import Button from "@/components/buttons/Button";
import { cn } from "@/lib/utils";

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
  // const { data: electionOptions } = useReadContract({
  //   ...CONTRACT_CONFIG,
  //   functionName: "candidates",
  // });

  const { data: electionName } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: "name",
  });

  // name, description, kickoff, deadline
  // const electionName = "2024 US Presidential Election";

  const electionOptions = [
    {
      name: "Donald J. Trump",
      description: "Republican candidate",
    },
    {
      name: "Kamala Harris",
      description: "Democratic candidate",
    },
  ];

  if (!electionOptions) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-medium mb-4">{electionName}</h2>
      {electionOptions?.map((option: VoteOption, idx: number) => (
        <Button
          variant="light"
          className={cn("block w-full mb-2", {
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
  );
}
