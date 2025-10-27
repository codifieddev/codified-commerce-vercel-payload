/* eslint-disable */
// Use API route for revalidation instead of next/cache

import type { GlobalAfterChangeHook } from "payload";

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating ${doc.globalType}`);

  // await fetch("/api/revalidate", { method: "POST", body: JSON.stringify({ tag: `global_${doc.globalType}` }) });
  }

  return doc;
};
