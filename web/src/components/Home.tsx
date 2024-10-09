import Elections from "@/components/elections/Elections";
import Kyc from "@/components/Kyc";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { auth } = useAuth();

  if (!auth.isVerified || !auth.isRegistered) {
    return <Kyc />;
  }

  return <Elections />;
}
