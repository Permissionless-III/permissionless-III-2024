"use client";

import React, { useEffect, useState } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import { generateAccessToken, checkDuplication } from "@/app/actions/kyc";

export default function Kyc({
  handleVerified,
}: {
  handleVerified: () => void;
}) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    generateAccessToken("basic-kyc-level", "12312").then((token: string) => {
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
          if (
            type === "idCheck.onApplicantStatusChanged" &&
            (payload as any).reviewResult.reviewAnswer === "GREEN"
          ) {
            handleVerified();
            checkDuplication("<insert_applicant_id_here>");
          }
        }}
        onError={error => {
          console.log("onError", error);
        }}
      />
    </div>
  );
}
