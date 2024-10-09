"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import "@/lib/env";
import Home from "@/components/Home";
import { useAuth } from "@/hooks/useAuth";

const Kyc = dynamic(() => import("@/components/Kyc"), {
  ssr: false,
});

export default function HomePage() {
  const { auth } = useAuth();

  if (!auth || !auth?.isVerified || !auth.isRegistered) {
    return <Kyc />;
  }

  return (
    <>
      <Head>
        <title>Permissionless III Hackathon Voting</title>
      </Head>
      <Home />
    </>
  );
}
