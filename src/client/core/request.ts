/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { ApiError } from "./ApiError";
import type { ApiRequestOptions } from "./ApiRequestOptions";
import type { ApiResult } from "./ApiResult";
import type { OnCancel } from "./CancelablePromise";
import { CancelablePromise } from "./CancelablePromise";
import type { OpenAPIConfig } from "./OpenAPI";

export const isDefined = <T>(
  value: T | null | undefined
): value is Exclude<T, null | undefined> => {
  return value !== undefined && value !== null;
};

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isStringWithValue = (value: unknown): value is string => {
  return isString(value) && value !== "";
};

export const isBlob = (value: unknown): value is Blob => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Blob).type === "string" &&
    typeof (value as Blob).stream === "function" &&
    typeof (value as Blob).arrayBuffer === "function" &&
    typeof (value as Blob).constructor === "function" &&
    typeof (value as Blob).constructor.name === "string" &&
    /^(Blob|File)$/.test((value as Blob).constructor.name) &&
    typeof (value as Record<symbol, string>)[Symbol.toStringTag] === "string" &&
    /^(Blob|File)$/.test((value as Record<symbol, string>)[Symbol.toStringTag])
  );
};

export const isFormData = (value: unknown): value is FormData => {
  return value instanceof FormData;
};

export const base64 = (str: string): string => {
  try {
    return btoa(str);
  } catch (_err) {
    // @ts-ignore
    return Buffer.from(str).toString("base64");
  }
};

export const getQueryString = (params: Record<string, unknown>): string => {
  const qs: string[] = [];

  const append = (key: string, value: unknown) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };

  const process = (key: string, value: unknown) => {
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        for (const v of value) {
          process(key, v);
        }
      } else if (typeof value === "object") {
        for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
          process(`${key}[${k}]`, v);
        }
      } else {
        append(key, value);
      }
    }
  };

  for (const [key, value] of Object.entries(params)) {
    process(key, value);
  }

  if (qs.length > 0) {
    return `?${qs.join("&")}`;
  }
  return "";
};

const getUrl = (config: OpenAPIConfig, options: ApiRequestOptions): string => {
  const encoder = config.ENCODE_PATH || encodeURI;

  const path = options.url
    .replace("{api-version}", config.VERSION)
    .replace(/{(.*?)}/g, (substring: string, group: string) => {
      if (options.path && Object.hasOwn(options.path, group)) {
        return encoder(String(options.path[group]));
      }
      return substring;
    });

  const url = `${config.BASE}${path}`;
  if (options.query) {
    return `${url}${getQueryString(options.query)}`;
  }
  return url;
};

export const getFormData = (options: ApiRequestOptions): FormData | undefined => {
  if (options.formData) {
    const formData = new FormData();

    const process = (key: string, value: unknown) => {
      if (isString(value) || isBlob(value)) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    };

    const entries = Object.entries(options.formData)
      .filter(([_, value]) => isDefined(value));

    for (const [key, value] of entries) {
      if (Array.isArray(value)) {
        for (const v of value) {
          process(key, v);
        }
      } else {
        process(key, value);
      }
    }

    return formData;
  }
  return undefined;
};

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;

export const resolve = async <T>(
  options: ApiRequestOptions,
  resolver?: T | Resolver<T>
): Promise<T | undefined> => {
  if (typeof resolver === "function") {
    return (resolver as Resolver<T>)(options);
  }
  return resolver;
};

export const getHeaders = async (
  config: OpenAPIConfig,
  options: ApiRequestOptions
): Promise<Headers> => {
  const [token, username, password, additionalHeaders] = await Promise.all([
    resolve(options, config.TOKEN),
    resolve(options, config.USERNAME),
    resolve(options, config.PASSWORD),
    resolve(options, config.HEADERS),
  ]);

  const headers = Object.entries({
    Accept: "application/json",
    ...additionalHeaders,
    ...options.headers,
  })
    .filter(([_, value]) => isDefined(value))
    .reduce(
      (headers, [key, value]) => {
        headers[key] = String(value);
        return headers;
      },
      {} as Record<string, string>
    );

  if (isStringWithValue(token)) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (isStringWithValue(username) && isStringWithValue(password)) {
    const credentials = base64(`${username}:${password}`);
    headers.Authorization = `Basic ${credentials}`;
  }

  if (options.body !== undefined) {
    if (options.mediaType) {
      headers["Content-Type"] = options.mediaType;
    } else if (isBlob(options.body)) {
      headers["Content-Type"] = options.body.type || "application/octet-stream";
    } else if (isString(options.body)) {
      headers["Content-Type"] = "text/plain";
    } else if (!isFormData(options.body)) {
      headers["Content-Type"] = "application/json";
    }
  }

  return new Headers(headers);
};

export const getRequestBody = (options: ApiRequestOptions): unknown => {
  if (options.body !== undefined) {
    if (options.mediaType?.includes("/json")) {
      return JSON.stringify(options.body);
    }
    if (isString(options.body) || isBlob(options.body) || isFormData(options.body)) {
      return options.body;
    }
    return JSON.stringify(options.body);
  }
  return undefined;
};

export const sendRequest = async (
  config: OpenAPIConfig,
  options: ApiRequestOptions,
  url: string,
  body: unknown,
  formData: FormData | undefined,
  headers: Headers,
  onCancel: OnCancel
): Promise<Response> => {
  const controller = new AbortController();

  const request: RequestInit = {
    headers,
    body: (body ?? formData) as BodyInit | null,
    method: options.method,
    signal: controller.signal,
  };

  if (config.WITH_CREDENTIALS) {
    request.credentials = config.CREDENTIALS;
  }

  onCancel(() => controller.abort());

  return await fetch(url, request);
};

export const getResponseHeader = (
  response: Response,
  responseHeader?: string
): string | undefined => {
  if (responseHeader) {
    const content = response.headers.get(responseHeader);
    if (isString(content)) {
      return content;
    }
  }
  return undefined;
};

export const getResponseBody = async (response: Response): Promise<unknown> => {
  if (response.status !== 204) {
    try {
      const contentType = response.headers.get("Content-Type");
      if (contentType) {
        const jsonTypes = ["application/json", "application/problem+json"];
        const isJSON = jsonTypes.some((type) => contentType.toLowerCase().startsWith(type));
        if (isJSON) {
          return await response.json();
        }
        return await response.text();
      }
    } catch (error) {
      console.error(error);
    }
  }
  return undefined;
};

export const catchErrorCodes = (options: ApiRequestOptions, result: ApiResult): void => {
  const errors: Record<number, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    ...options.errors,
  };

  const error = errors[result.status];
  if (error) {
    throw new ApiError(options, result, error);
  }

  if (!result.ok) {
    const errorStatus = result.status ?? "unknown";
    const errorStatusText = result.statusText ?? "unknown";
    const errorBody = (() => {
      try {
        return JSON.stringify(result.body, null, 2);
      } catch (_e) {
        return undefined;
      }
    })();

    throw new ApiError(
      options,
      result,
      `Generic Error: status: ${errorStatus}; status text: ${errorStatusText}; body: ${errorBody}`
    );
  }
};

/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @returns CancelablePromise<T>
 * @throws ApiError
 */
export const request = <T>(
  config: OpenAPIConfig,
  options: ApiRequestOptions
): CancelablePromise<T> => {
  return new CancelablePromise(async (resolve, reject, onCancel) => {
    try {
      const url = getUrl(config, options);
      const formData = getFormData(options);
      const body = getRequestBody(options);
      const headers = await getHeaders(config, options);

      if (!onCancel.isCancelled) {
        const response = await sendRequest(config, options, url, body, formData, headers, onCancel);
        const responseBody = await getResponseBody(response);
        const responseHeader = getResponseHeader(response, options.responseHeader);

        const result: ApiResult = {
          url,
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          body: responseHeader ?? responseBody,
        };

        catchErrorCodes(options, result);

        resolve(result.body as T);
      }
    } catch (error) {
      reject(error);
    }
  });
};
