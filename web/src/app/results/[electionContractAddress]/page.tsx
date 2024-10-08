"use client";

import Results from "@/components/results/Results";
import { useParams } from "next/navigation";

export default function ResultsPage() {
  const { electionContractAddress } = useParams();
  return <Results electionContractAddress={electionContractAddress} />;
}
