export interface HttpRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}

export interface HttpResponse<T = any> {
  data: T;
  status: number;
}

export interface HttpPort {
  get<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  post<T>(url: string, body?: any, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  put<T>(url: string, body?: any, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  patch<T>(url: string, body?: any, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  delete<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
}
