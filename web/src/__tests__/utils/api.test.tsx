import { generateAccessToken } from "@/app/actions/kyc";

describe("Test Generating Access Token", () => {
  it("should generate access token", async () => {
    const token = await generateAccessToken("basic-kyc-level", "jon-jones");
    console.log(token);
    expect(typeof token).toBe("string");
  });
});
