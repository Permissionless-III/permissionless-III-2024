import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Results from "../results/Results";
import { useVoteTx } from "@/hooks/useVoteTx";

export default function VoteSuccess() {
  const { electionContractAddress } = useParams();
  const { vote } = useVoteTx();
  console.log("votesSuccess electionContractAddress", electionContractAddress);

  return (
    <div className="flex-none">
      <div className="mb-12 ">
        <div className="mb-2">Your vote has been cast!</div>
        <Link
          className="font-medium text-primary-500 inline-flex items-center"
          href={`https://rootstock-testnet.blockscout.com/tx/${vote?.voteTxHash}`}
        >
          View on Block Explorer
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>
      <Results electionContractAddress={electionContractAddress as string} />
    </div>
  );
}
