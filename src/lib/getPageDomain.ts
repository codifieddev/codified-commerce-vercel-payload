export async function getPageBySlug(tenantId: string, slug: string) {
  try {
    console.log(`Fetching page for tenantId: ${tenantId} and slug: ${slug}`);
    
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[tenant][equals]=${tenantId}&where[slug][equals]=${slug}`,
      // { next: { revalidate: 60 } },
    );

    // const res = await fetch("http://localhost:3000/api/pages?where[tenant][equals]=6901f579021a06007d5f8224&where[slug][equals]=home")
   

    if (!res.ok) {
      throw new Error(`Failed to fetch page: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    console.log("Fetched page data:", json);
    return json?.docs?.[0] ?? null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}
