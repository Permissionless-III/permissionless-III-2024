import { generateAccessToken } from '@/app/actions/kyc';

describe('Test Generating Access Token', () => {
  it('should generate access token', async () => {
    const response = await generateAccessToken();
    console.log(response);
    expect(response).toBeDefined();
  });
});
