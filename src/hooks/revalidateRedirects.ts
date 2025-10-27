/* eslint-disable */
// Use API route for revalidation instead of next/cache

import type { CollectionAfterChangeHook } from "payload";

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`);

  // await fetch("/api/revalidate", { method: "POST", body: JSON.stringify({ tag: "redirects" }) });

  return doc;
};
