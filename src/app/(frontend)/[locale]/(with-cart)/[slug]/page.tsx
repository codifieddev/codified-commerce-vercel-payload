import { draftMode } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { getPayload } from "payload";
import React, { cache } from "react";

import { PayloadRedirects } from "@/components/PayloadRedirects";

import { RenderBlocks } from "@/blocks/RenderBlocks";
import { RenderHero } from "@/components/heros/RenderHero";
import { type Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { generateMeta } from "@/utilities/generateMeta";
import config from "@payload-config";

import type { Metadata } from "next";
import { SimplePageEditor } from "./PageEditor/SimplePageEditor";
import PageClient from "./page.client";

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = routing.locales.flatMap((locale) => {
    return pages.docs
      ?.filter((doc) => doc.slug !== "home")
      .map(({ slug }) => {
        return { locale, slug };
      });
  });

  return params;
}

type Args = {
  params: Promise<{
    locale: Locale;
    slug?: string;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = "home", locale } = await paramsPromise;
  const url = `/${locale}/${slug}`;

  const page = await queryPageBySlug({
    slug,
    locale,
  });

  console.log("Rendering page for slug:", page);
  if (!page) {
    return <PayloadRedirects url={url} locale={locale} />;
  }

  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      {/* <SimplePageEditor page={page}> */}
      <PageClient />
      <article className="pt-16 pb-24">
        <RenderHero {...page.hero} />
        <RenderBlocks blocks={page.layout} />
      </article>
      {/* </SimplePageEditor> */}
    </div>
  );
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = "home", locale } = await paramsPromise;
  const page = await queryPageBySlug({
    slug,
    locale,
  });

  return generateMeta({ doc: page! });
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config });
  // console.log("Querying page for slug:", slug, "and locale:", locale, "Draft mode:", draft);

  try {
    const result = await payload.find({
      collection: "pages",
      draft,
      limit: 1,
      locale,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    // console.log("Payload query result for slug:", slug, "Locale:", locale, "Result count:", result.totalDocs);
    return result.docs?.[0] || null;
  } catch (error) {
    console.log("Main page error: ", error);
    return null;
  }
});
