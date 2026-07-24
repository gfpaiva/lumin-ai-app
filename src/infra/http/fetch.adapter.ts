import {
  HttpPort,
  HttpRequestOptions,
  HttpResponse,
} from "../../common/ports/http.port";

export class FetchAdapter implements HttpPort {
  private readonly defaultTimeout = 180000; // 3 min

  private get baseUrl(): string {
    return process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";
  }

  private async request<T>(
    method: string,
    url: string,
    body?: any,
    options?: HttpRequestOptions,
  ): Promise<HttpResponse<T>> {
    const controller = new AbortController();
    const timeout = options?.timeout || this.defaultTimeout;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const fullUrl = new URL(url, this.baseUrl);

    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        fullUrl.searchParams.append(key, String(value));
      });
    }

    try {
      const response = await fetch(fullUrl.toString(), {
        method,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      // Handle non-JSON responses gracefully
      let data: any = null;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(
          data?.message || `HTTP error! status: ${response.status}`,
        );
      }

      return {
        data: data as T,
        status: response.status,
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get<T>(
    url: string,
    options?: HttpRequestOptions,
  ): Promise<HttpResponse<T>> {
    return this.request<T>("GET", url, undefined, options);
  }

  async post<T>(
    url: string,
    body?: any,
    options?: HttpRequestOptions,
  ): Promise<HttpResponse<T>> {
    return this.request<T>("POST", url, body, options);
  }

  async put<T>(
    url: string,
    body?: any,
    options?: HttpRequestOptions,
  ): Promise<HttpResponse<T>> {
    return this.request<T>("PUT", url, body, options);
  }

  async patch<T>(
    url: string,
    body?: any,
    options?: HttpRequestOptions,
  ): Promise<HttpResponse<T>> {
    return this.request<T>("PATCH", url, body, options);
  }

  async delete<T>(
    url: string,
    options?: HttpRequestOptions,
  ): Promise<HttpResponse<T>> {
    return this.request<T>("DELETE", url, undefined, options);
  }
}
