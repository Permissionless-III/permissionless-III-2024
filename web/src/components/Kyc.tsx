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
export default function Kyc() {
  const { address } = useAccount();
  const { setAuth } = useAuth();
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
      <div className="flex h-full items-center justify-center">
        <ConnectWalletButton />
      </div>
    );
  if (!accessToken) return "Loading...";

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
              checkDuplication(id);
              setAuth({
                id,
                isVerified: true,
              });
            });
          }
        }}
        onError={(error: any) => {
          console.log("onError", error);
        }}
      />
    </div>
  );
}
