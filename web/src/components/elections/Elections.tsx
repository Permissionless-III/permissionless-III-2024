"use client";

import { useReadContract } from "wagmi";
import { ELECTION_FACTORY_CONTRACT_CONFIG } from "@/constants/config";
import ElectionLink from "./ElectionLink";

export default function Elections() {
  // const [elections, setElections] = useState<Election[]>([]);

  const { data: elections, error } = useReadContract({
    ...ELECTION_FACTORY_CONTRACT_CONFIG,
    functionName: "getAllElections",
  });

  console.log("elections", elections);
  console.log("error", error);
  // if (isLoading) return <div>Loading results...</div>;
  // if (isError) return <div>Error loading results</div>;

  return (
    <div>
      {!elections || elections?.length === 0 ? (
        <p>No elections have been created yet.</p>
      ) : (
        <>
          <button
            type="submit"
            className="bg-primary-600 shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-white"
            onClick={() => console.log('create election')}
          >
            Create Election
          </button>
          <div className="flex flex-col gap-4 h-full">
            {elections.map((electionId: `0x${string}`) => (
              <ElectionLink key={electionId} electionId={electionId} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
