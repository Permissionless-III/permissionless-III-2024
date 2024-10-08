import React, { useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useContractRead } from "wagmi";

export function VoteOptions({
  onOptionSelect,
}: {
  onOptionSelect: (optionIdx: { index: number; name: string }) => void;
}) {
  // const { data: electionOptions, isError, isLoading } = useContractRead({
  //   address: '0x123213', // contractAddress,
  //   abi: erc20Abi,
  //   functionName: "voteOptions",
  // });

  // const { data: electionName, isError, isLoading } = useContractRead({
  //   address: '0x123213', // contractAddress,
  //   abi: erc20Abi,
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
          className="block my-2 bg-gray-200 rounded py-2 px-4 w-full "
        >
          {option.name} ({option.description})
        </button>
      ))}
    </div>
  );
}
