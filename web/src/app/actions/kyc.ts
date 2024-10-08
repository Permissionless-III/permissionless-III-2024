"use server";

import crypto from "crypto";

export async function generateAccessToken(
  levelName: string,
  userId: string
): Promise<string> {
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

  const signature = crypto
    .createHmac("sha256", SUMSUB_SECRET_KEY)
    .update(timestamp + method + url)
    .digest("hex");

  const response = await fetch(`https://api.sumsub.com${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-App-Token": SUMSUB_TOKEN as string,
      "X-App-Access-Sig": signature,
      "X-App-Access-Ts": timestamp.toString(),
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.token;
  }

  const error = await response.text();
  console.error(error);
  throw new Error(error);
}

export async function getApplicantId(externalUserId: string): Promise<string> {
  const SUMSUB_TOKEN = process.env.SUMSUB_TOKEN;
  const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY;

  if (!SUMSUB_TOKEN) {
    throw new Error("SUMSUB_TOKEN is not set");
  }

  if (!SUMSUB_SECRET_KEY) {
    throw new Error("SUMSUB_SECRET_KEY is not set");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const method = "GET";
  const url = `/resources/applicants/-;externalUserId=${externalUserId}/one`;

  const signature = crypto
    .createHmac("sha256", SUMSUB_SECRET_KEY)
    .update(timestamp + method + url)
    .digest("hex");

  const response = await fetch(`https://api.sumsub.com${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-App-Token": SUMSUB_TOKEN,
      "X-App-Access-Sig": signature,
      "X-App-Access-Ts": timestamp.toString(),
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("GET_APPLICANT_ID_DATA", data);
    return data.id;
  }

  const error = await response.text();
  console.error(error);
  throw new Error(error);
}

export async function checkDuplication(applicantId: string): Promise<string> {
  console.log("CHECK_DUPLICATION_APPLICANT_ID", applicantId);
  const SUMSUB_TOKEN = process.env.SUMSUB_TOKEN;
  const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY;

  if (!SUMSUB_TOKEN) {
    throw new Error("SUMSUB_TOKEN is not set");
  }

  if (!SUMSUB_SECRET_KEY) {
    throw new Error("SUMSUB_SECRET_KEY is not set");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const method = "GET";
  const url = `/resources/checks/latest?applicantId=${applicantId}&type=SIMILAR_SEARCH`;

  const signature = crypto
    .createHmac("sha256", SUMSUB_SECRET_KEY)
    .update(timestamp + method + url)
    .digest("hex");

  const response = await fetch(`https://api.sumsub.com${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-App-Token": SUMSUB_TOKEN,
      "X-App-Access-Sig": signature,
      "X-App-Access-Ts": timestamp.toString(),
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("CHECK_DUPLICATION_DATA", data);
    return data;
  }

  const error = await response.text();
  console.error(error);
  throw new Error(error);
}
