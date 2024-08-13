export const api = {
  get: async (path: string, token?: string) => {
    const res = await fetch(`${process.env.SERVER_URL}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: "Bearer " + token }),
      },
    });
    if (res.ok) {
      return res;
    }
    throw new Error(`${res.status} error: ${res.statusText}`);
  },
  post: async (path: string, data: { [key: string]: number | boolean | string }, token?: string) => {
    const res = await fetch(`${process.env.SERVER_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: "Bearer " + token }),
      },
      body: JSON.stringify(data),
    });
    return res;
  },
  put: async (path: string, data: { [key: string]: number | boolean | string }, token?: string) => {
    const res = await fetch(`${process.env.SERVER_URL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: "Bearer " + token }),
      },
      body: JSON.stringify(data),
    });
    return res;
  },
  delete: async (path: string, token: string) => {
    const res = await fetch(`${process.env.SERVER_URL}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  },
};
