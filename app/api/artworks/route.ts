import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error, count } = await supabase
    .from("artworks")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    count,
    data,
  });
}
