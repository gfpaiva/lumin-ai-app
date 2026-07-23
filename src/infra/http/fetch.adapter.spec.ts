import { FetchAdapter } from './fetch.adapter';

describe('FetchAdapter', () => {
  let adapter: FetchAdapter;
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    adapter = new FetchAdapter();
    originalFetch = global.fetch;
    process.env.EXPO_PUBLIC_API_URL = 'http://api.example.com';
  });

  afterEach(() => {
    global.fetch = originalFetch;
    delete process.env.EXPO_PUBLIC_API_URL;
  });

  it('should include default and custom headers', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ success: true }),
    });
    global.fetch = mockFetch;

    await adapter.get('/test', {
      headers: {
        'Authorization': 'Bearer token123'
      }
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'http://api.example.com/test',
      expect.objectContaining({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token123'
        }
      })
    );
  });

  it('should trigger abort controller on timeout', async () => {
    jest.useFakeTimers();
    
    // Create a mock signal to track if abort is called
    let passedSignal: AbortSignal | undefined;
    
    const mockFetch = jest.fn().mockImplementation((url, options) => {
      passedSignal = options.signal;
      return new Promise(() => {}); // Never resolves
    });
    global.fetch = mockFetch;

    const requestPromise = adapter.get('/test', { timeout: 1000 });
    
    // Advance timers
    jest.advanceTimersByTime(1000);

    expect(passedSignal?.aborted).toBe(true);
    
    jest.useRealTimers();
  });
});
