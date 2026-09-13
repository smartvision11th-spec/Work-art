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

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
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
      ])
      .select()
      .single();

    if (error) {
      console.error("Order insert error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Order request error:", error);

    return NextResponse.json(
      { error: "Invalid order request." },
      { status: 400 }
    );
  }
}
