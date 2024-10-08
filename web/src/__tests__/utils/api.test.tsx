import { generateAccessToken } from '@/app/actions/kyc';

describe('Test Generating Access Token', () => {
  it('should generate access token', async () => {
    const response = await generateAccessToken('basic-kyc-level', 'jon-jones');
    console.log(response);
    expect(response.code).toBe(200);
  });
});
