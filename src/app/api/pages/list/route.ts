import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config });
    const pages = await payload.find({
      collection: "pages",
      depth: 1,
      limit: 100,
    });
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 });
  }
}
