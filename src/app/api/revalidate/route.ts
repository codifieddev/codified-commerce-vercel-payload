import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { path, tag } = await req.json();
    if (path) {
      revalidatePath(path);
    }
    if (tag) {
      revalidateTag(tag);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 });
  }
}
