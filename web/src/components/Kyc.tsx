"use client";

import React, { useEffect, useState } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import {
  generateAccessToken,
  checkDuplication,
  getApplicantId,
} from "@/app/actions/kyc";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { useVid } from "@/hooks/useVid";

export default function Kyc({
  handleVerified,
}: {
  handleVerified: () => void;
}) {
  const { address } = useAccount();
  const { setVid } = useVid();
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
        <ConnectKitButton />
      </div>
    );
  if (!accessToken) return "Loading...";

  return (
    <div className="w-full max-w-xl mx-auto">
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
        onMessage={(type, payload) => {
          console.log("onMessage", type, payload);
          if (
            type === "idCheck.onApplicantStatusChanged" &&
            (payload as any)?.reviewResult?.reviewAnswer === "GREEN"
          ) {
            handleVerified();
            getApplicantId(address as string).then((id: string) => {
              checkDuplication(id);
              setVid(id);
            });
          }
        }}
        onError={error => {
          console.log("onError", error);
        }}
      />
    </div>
  );
}
