import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customer_name,
      phone,
      address,
      city,
      state,
      pincode,
      total,
      payment_method,
      items,
    } = body;

    if (
      !customer_name ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !total ||
      !items
    ) {
      return NextResponse.json(
        { error: "All order details are required." },
        { status: 400 }
      );
    }

    const orderId = crypto.randomUUID();

    const { error } = await supabase
      .from("orders")
      .insert([
        {
          id: orderId,
          customer_name,
          phone,
          address,
          city,
          state,
          pincode,
          total: Number(total),
          payment_method: payment_method || "COD",
          status: "Pending",
          items,
        },
      ]);

    if (error) {
      console.error("Order insert error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: orderId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order request error:", error);

    return NextResponse.json(
      { error: "Invalid order request." },
      { status: 400 }
    );
  }
}
