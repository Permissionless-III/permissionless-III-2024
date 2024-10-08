import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Elections from "@/components/elections/Elections";
import Kyc from "@/components/Kyc";
import VoteSuccess from "@/components/vote/VoteSuccess";

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    if (!address) setIsVerified(false);
  }, [address]);

  if (isVerified && !isSubmitted) {
    return <Elections />;
  }

  if (!isVerified) {
    return <Kyc handleVerified={() => setIsVerified(true)} />;
  }
}
