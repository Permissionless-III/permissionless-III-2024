"use client";

import { useState } from "react";
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

const Kyc = dynamic(() => import("@/components/Kyc"), {
  ssr: false,
});

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <main>
      <Head>
        <title>Permissionless III Hackathon Voting</title>
      </Head>
      <section className="bg-white">
        <div className="layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center">
          {isVerified ? (
            <Vote />
          ) : (
            <Kyc handleVerified={() => setIsVerified(true)} />
          )}
        </div>
      </section>
    </main>
  );
}
