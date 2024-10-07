"use server";
const crypto = require('crypto');

export async function generateAccessToken(): Promise<string> {
  const SUMSUB_TOKEN = process.env.SUMSUB_TOKEN;
  const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY;

  if (!SUMSUB_TOKEN) {
    throw new Error("SUMSUB_TOKEN is not set");
  }

  if (!SUMSUB_SECRET_KEY) {
    throw new Error("SUMSUB_SECRET_KEY is not set");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac('sha256', SUMSUB_SECRET_KEY)
    .update(timestamp + 'POST' + 'https://api.sumsub.com')
    .digest('hex');

  console.log();
  console.log(SUMSUB_TOKEN);
  console.log(SUMSUB_SECRET_KEY);
  console.log(signature);
  console.log();

  const response = await fetch("https://api.sumsub.com/resources/accessTokens", {
    method: "POST",
    headers: {
      "X-App-Token": SUMSUB_TOKEN,
      "X-App-Access-Sig": signature,
      "X-App-Access-Ts": timestamp.toString(),
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
}
