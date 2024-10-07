import React, { useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useContractRead } from "wagmi";

export function VoteOptions({
  onOptionSelect,
}: {
  onOptionSelect: (option: string) => void;
}) {
  const [options, setOptions] = useState<string[]>([]);

  // const { data, isError, isLoading } = useContractRead({
  //   address: '0x123213', // contractAddress,
  //   abi: erc20Abi,
  //   functionName: "mint",
  // });

  // useEffect(() => {
  //   if (data) {
  //     setOptions(data as string[]);
  //   }
  // }, [data]);

  // if (isLoading) return <div>Loading options...</div>;
  // if (isError) return <div>Error loading options</div>;

  return (
    <div>
      <h2>Voting Options</h2>
      {options.map((option, index) => (
        <button key={index} onClick={() => onOptionSelect(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}
