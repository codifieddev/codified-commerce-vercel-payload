// Use API route for revalidation instead of next/cache

import type { Post } from "@/payload-types";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      const path = `/posts/${doc.slug}`;

      payload.logger.info(`Revalidating post at path: ${path}`);

  // await fetch("/api/revalidate", { method: "POST", body: JSON.stringify({ path, tag: "posts-sitemap" }) });
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === "published" && doc._status !== "published") {
      const oldPath = `/posts/${previousDoc.slug}`;

      payload.logger.info(`Revalidating old post at path: ${oldPath}`);

  // await fetch("/api/revalidate", { method: "POST", body: JSON.stringify({ path: oldPath, tag: "posts-sitemap" }) });
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug}`;

  // await fetch("/api/revalidate", { method: "POST", body: JSON.stringify({ path, tag: "posts-sitemap" }) });
  }

  return doc;
};
