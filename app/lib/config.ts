const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://formy.io";

export const config = {
  baseUrl: BASE,
  submitUrl: `${BASE}/api/submit`,
} as const;
