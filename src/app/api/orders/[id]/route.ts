import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Changed: params is now Promise
) {
  try {
    const { id } = await params; // Changed: await the params
    const payload = await getPayload({ config });
    
    const order = await payload.findByID({
      collection: "orders",
      id,
      depth: 2,
    });

    return NextResponse.json({
      success: true,
      data: order
    });
    
  } catch (error: any) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Changed: params is now Promise
) {
  try {
    const { id } = await params; // Changed: await the params
    const body = await request.json();
    const payload = await getPayload({ config });

    const updatedOrder = await payload.update({
      collection: "orders",
      id,
      data: body,
    });

    return NextResponse.json({ 
      success: true, 
      data: updatedOrder 
    });
    
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
