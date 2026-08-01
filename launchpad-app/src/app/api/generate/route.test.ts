import { describe, it, expect } from 'vitest';
import { POST } from './route';

describe('Generate API Route', () => {
  it('should be defined', () => {
    expect(POST).toBeDefined();
  });
});
