export const api = {
  get: async (path: string) => {
    const res = await fetch(`${process.env.SERVER_URL}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
      body: JSON.stringify(data),
      ...(token && { Authorization: "Bearer " + token }),
    });
    return res;
  },
  put: async (path: string, data: { [key: string]: number | boolean | string }) => {
    const res = await fetch(`${process.env.SERVER_URL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return res;
    }
    throw new Error(`${res.status} error: ${res.statusText}`);
  },
};
