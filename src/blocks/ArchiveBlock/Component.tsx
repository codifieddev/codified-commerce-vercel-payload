import { getPayload } from "payload";

import { CollectionArchive } from "@/components/CollectionArchive";
import RichText from "@/components/RichText";
import config from "@payload-config";

import type { Post, ArchiveBlock as ArchiveBlockProps } from "@/payload-types";

export const ArchiveBlock = async (
  props: ArchiveBlockProps & {
    id?: string;
  },
) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props;

  const limit = limitFromProps ?? 3;

  let posts: Post[] = [];

  if (populateBy === "collection") {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/list`);
    const data = await res.json();
    posts = data.docs?.slice(0, limit) || [];
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === "object") return post.value;
      }) as Post[];
      posts = filteredSelectedPosts;
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-3xl" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  );
};
