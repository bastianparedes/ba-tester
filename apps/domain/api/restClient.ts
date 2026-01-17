export type TypeApiResponse<T extends Record<string, unknown> | unknown[]> = Promise<
  { ok: true; json: () => Promise<{ success: true; data: T } | { success: false; errors: string[] }> } | { ok: false }
>;
