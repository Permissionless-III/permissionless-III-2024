import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Elections from "@/components/elections/Elections";
import Kyc from "@/components/Kyc";
import VoteSuccess from "@/components/vote/VoteSuccess";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { address } = useAccount();
  const { auth } = useAuth();

  if (!auth.isVerified) {
    return <Kyc />;
  }

  return <Elections />;
}
