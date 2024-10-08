import { CONTRACT_CONFIG } from "@/constant/config";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

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

  // useEffect(() => {
  //   if (data) {
  //     setOptions(data as string[]);
  //   }
  // }, [data]);

  // if (isLoading) return <div>Loading options...</div>;
  // if (isError) return <div>Error loading options</div>;

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

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">{electionName}</h2>
      {electionOptions.map((option, idx) => (
        <button
          key={idx}
          onClick={() => onOptionSelect({ index: idx, name: option.name })}
          className="block my-2 bg-gray-200 rounded-xl py-4 px-6 w-full "
        >
          {option.name} ({option.description})
        </button>
      ))}
    </div>
  );
}
