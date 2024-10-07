"use server";

import crypto from "crypto";

export async function generateAccessToken(): Promise<string> {
  const SUMSUB_TOKEN = process.env.SUMSUB_TOKEN;
  const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY;

  if (!SUMSUB_TOKEN) {
    throw new Error("SUMSUB_TOKEN is not set");
  }

  if (!SUMSUB_SECRET_KEY) {
    throw new Error("SUMSUB_SECRET_KEY is not set");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const method = "POST";
  const url = "/resources/accessTokens?levelName=basic-kyc-level";
  const body = ""; // Add request body if any

  const signature = crypto
    .createHmac("sha256", SUMSUB_SECRET_KEY)
    .update(timestamp + method + url + body)
    .digest("hex");

  console.log(SUMSUB_TOKEN);
  console.log(signature);

  const response = await fetch(
    "https://api.sumsub.com/resources/accessTokens",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-App-Token": SUMSUB_TOKEN,
        "X-App-Access-Sig": signature,
        "X-App-Access-Ts": timestamp.toString(),
      },
    }
  );

  const data = await response.json();
  console.log(data);

  return data;
}