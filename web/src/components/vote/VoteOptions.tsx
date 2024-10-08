import { CONTRACT_CONFIG } from "@/constant/config";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import Button from "@/components/buttons/Button";

type VoteOption = {
  name: string;
  description: string;
};

export function VoteOptions({
  onOptionSelect,
}: {
  onOptionSelect: (optionIdx: { index: number; name: string }) => void;
}) {
  // const { data: electionOptions } = useReadContract({
  //   ...CONTRACT_CONFIG,
  //   functionName: "candidates",
  // });

  // const { data: electionName } = useReadContract({
  //   ...CONTRACT_CONFIG,
  //   functionName: "name",
  // });

  // name, description, kickoff, deadline
  const electionName = "2024 US Presidential Election";

  const electionOptions = [
    {
      name: "Trump",
      description: "Republican candidate",
    },
    {
      name: "Harris",
      description: "Democratic candidate",
    },
  ];

  if (!electionOptions) return null;

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">{electionName}</h2>
      {electionOptions?.map((option: VoteOption, idx: number) => (
        <Button
          className="block w-full mb-4"
          size="base"
          key={idx}
          onClick={() => onOptionSelect({ index: idx, name: option.name })}
        >
          {option?.name} ({option?.description})
        </Button>
      ))}
    </div>
  );
}
