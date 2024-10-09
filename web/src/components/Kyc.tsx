"use client";

import React, { useEffect, useState } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import {
  generateAccessToken,
  checkDuplication,
  getApplicantId,
} from "@/app/actions/kyc";
import { useAccount } from "wagmi";
import { useAuth } from "@/hooks/useAuth";
import ConnectWalletButton from "@/components/layout/ConnectWalletButton";
import { Auth } from "@/contexts/AuthContext";

export default function Kyc() {
  const { address } = useAccount();
  const { auth, setAuth } = useAuth();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    generateAccessToken("basic-kyc-level", address as string).then(
      (token: string) => {
        setAccessToken(token);
      }
    );
  }, [address]);

  if (!address)
    return (
      <div className="flex flex-col h-full items-center justify-center text-center">
        <p className="block mb-4 max-w-[280px]">
          Please connect a web3 wallet to start the voter registration process.
        </p>
        <ConnectWalletButton />
      </div>
    );

  if (!accessToken)
    return (
      <div className="h-full flex justify-center items-center text-gray-400">
        Loading...
      </div>
    );

  if (!auth.isVerified)
    return (
      <div className="w-full mx-auto">
        <SumsubWebSdk
          accessToken={accessToken}
          expirationHandler={() => {
            return Promise.resolve("not sure what this is");
          }}
          config={{
            lang: "en",
            // uiConf: {
            //   customCssStr: ":root {--background-color: #ffffff;}",
            // },
          }}
          options={{ addViewportTag: false, adaptIframeHeight: true }}
          onMessage={(type: string, payload: any) => {
            console.log("onMessage", type, payload);
            if (
              type === "idCheck.onApplicantStatusChanged" &&
              (payload as any)?.reviewResult?.reviewAnswer === "GREEN"
            ) {
              getApplicantId(address as string).then((id: string) => {
                console.log("updating auth status...");
                setAuth((prev: Auth) => ({
                  ...prev,
                  id,
                  isVerified: true,
                }));
                checkDuplication(id);
              });
            }
          }}
          onError={(error: any) => {
            console.log("onError", error);
          }}
        />
      </div>
    );

  return (
    <div className="h-full flex justify-center items-center text-gray-400">
      Please sign the transaction in your web3 wallet to complete voter
      registration.
    </div>
  );
}
