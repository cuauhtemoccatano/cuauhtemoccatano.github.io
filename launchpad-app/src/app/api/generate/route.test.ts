import { describe, it, expect } from 'vitest';
import { POST } from './route';

describe('POST /api/generate', () => {
  it('should be defined', () => {
    expect(POST).toBeDefined();
  });

  it('handles post requests and returns dynamic response', async () => {
    const mockRequest = {
      json: async () => ({
        name: "Test SaaS",
        schema: [],
        pages: [],
        primaryColor: "#000000",
        secondaryColor: "#ffffff",
        accentColor: "#ff0000",
        font: "Inter",
        radius: "md",
        buttonStyle: "solid",
        useGradient: false,
        useGrain: false,
        gradientDirection: "tr",
        toneOfVoice: "professional"
      })
    } as unknown as Request;

    const response = await POST(mockRequest);
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/zip');
  });
});
