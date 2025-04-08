let refreshPromise: Promise<Response> | null = null;

export async function refreshTokens(): Promise<Response> {
  if (!refreshPromise) {
    refreshPromise = fetch("/api/user/refresh", { method: "POST" }).finally(
      () => {
        refreshPromise = null;
      }
    );
  }
  return refreshPromise;
}

export async function refreshIfUnauthorized(
  fetchFunc: () => Promise<Response>
): Promise<Response> {
  const res = await fetchFunc();
  if (res.status !== 401) return res;

  const refreshRes = await refreshTokens();
  if (refreshRes.status === 401) return refreshRes;
  if (!refreshRes.ok)
    throw new Response("Failed to refresh", { status: refreshRes.status });

  return fetchFunc();
}
