"use server";

import crypto from "crypto";

export async function generateAccessToken(levelName: string, userId: string): Promise<string> {
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
  const url = `/resources/accessTokens?levelName=${levelName}&userId=${userId}`;
  console.log(url);

  const signature = crypto
    .createHmac("sha256", SUMSUB_SECRET_KEY)
    .update(timestamp + method + url)
    .digest("hex");


  const response = await fetch(
    `https://api.sumsub.com/resources/accessTokens?levelName=${levelName}&userId=${userId}`,
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
  return data.token;
}
