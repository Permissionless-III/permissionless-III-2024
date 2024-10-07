"use server";

export async function generateAccessToken(): Promise<string> {
  const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY;

  if (!SUMSUB_SECRET_KEY) {
    throw new Error("SUMSUB_SECRET_KEY is not set");
  }

  // TODO: Implement your actual token generation logic here
  return "1232133";
}
