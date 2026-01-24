import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function axiosWithRetry<T>(
  url: string,
  options: AxiosRequestConfig,
  respType: ResponseType,
  retries: number,
  timeout: number,
): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response: AxiosResponse<T> = await axios({
        url,
        ...options,
        timeout,
        responseType: respType === "blob" ? "blob" : "json",
      });
      return response.data;
    } catch (error) {
      if (attempt === retries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  throw new Error("Request failed after retries");
}

export async function http<T>(
  endpoint: string,
  options: AxiosRequestConfig = {},
  respType: ResponseType = "json",
  customTimeout?: number,
  customBaseUrl?: string,
): Promise<T> {
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    const timeout = respType === "blob" ? 9999999 : (customTimeout ?? 15000);
    return axiosWithRetry<T>(endpoint, options, respType, 2, timeout);
  }

  const baseUrl = customBaseUrl ?? API_URL ?? "";

  const fullUrl = baseUrl ? `${baseUrl}${endpoint}` : endpoint;

  const timeout = respType === "blob" ? 9999999 : (customTimeout ?? 15000);
  return axiosWithRetry<T>(fullUrl, options, respType, 2, timeout);
}
