export async function getTenantByDomain(domain: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tenants?where[domains.domain][equals]=${domain}`,
      // { next: { revalidate: 3600 } }, // 1 hour cache
    )

    console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tenants?where[domains.domain][equals]=${domain}`)
  
    const json = await res.json()
    return json?.docs?.[0] ?? null
  }