"use client";

import React, { useEffect, useState } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import { generateAccessToken } from "@/app/actions/kyc";

export default function Kyc() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    generateAccessToken().then((token: string) => {
      setAccessToken(token);
    });
  }, []);

  if (!accessToken) return null;

  return (
    <div>
      <SumsubWebSdk
        accessToken={accessToken}
        expirationHandler={() => {
          return Promise.resolve("not sure what this is");
        }}
        config={{ lang: "en" }}
        options={{ addViewportTag: false, adaptIframeHeight: true }}
        onMessage={(type, payload) => {
          console.log("onMessage", type, payload);
        }}
        onError={error => {
          console.log("onError", error);
        }}
      />
    </div>
  );
}
