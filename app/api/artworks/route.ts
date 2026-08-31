import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error, count } = await supabase
    .from("artworks")
    .select("*", { count: "exact" });

  return NextResponse.json({
    data,
    error,
    count
  });
}
