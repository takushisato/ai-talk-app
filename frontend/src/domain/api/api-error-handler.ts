import type { AxiosResponse } from "axios";

export async function handleErrorResponse<Data>(response: AxiosResponse<Data>): Promise<void> {
  if (response.status === 401) {
    throw new Error("Unauthorized");
  } else if (response.status === 400) {
    throw new Error("Bad Request");
  } else if (response.status === 404) {
    throw new Error("Not Found");
  } else if (response.status === 409) {
    throw new Error("Conflict");
  } else if (response.status >= 402 && response.status < 500) {
    throw new Error("Client Error");
  } else if (response.status >= 500) {
    throw new Error("Server Error");
  }

  if (!response.data) {
    throw new Error("Data is empty");
  }
}
