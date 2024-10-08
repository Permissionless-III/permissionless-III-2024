"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import "@/lib/env";
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vote from "@/components/vote/Vote";
import Elections from "@/components/elections/Elections";
import { useAccount } from "wagmi";

const Kyc = dynamic(() => import("@/components/Kyc"), {
  ssr: false,
});

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [isVerified, setIsVerified] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    if (!address) setIsVerified(false);
  }, [address]);

  return (
    <>
      <Head>
        <title>Permissionless III Hackathon Voting</title>
      </Head>
      <>
        {isVerified ? (
          <Vote />
        ) : (
          // <Elections />
          <Kyc handleVerified={() => setIsVerified(true)} />
        )}
      </>
    </>
  );
}
