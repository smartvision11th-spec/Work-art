import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      artist,
      price,
      category,
      medium,
      size,
      edition,
      description,
      image_url,
    } = body;

    if (
      !title ||
      !artist ||
      !price ||
      !category ||
      !medium ||
      !size ||
      !edition ||
      !description ||
      !image_url
    ) {
      return NextResponse.json(
        { error: "All artwork fields are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("artworks")
      .insert([
        {
          title,
          artist,
          price: Number(price),
          category,
          medium,
          size,
          edition,
          description,
          image_url,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Request error:", error);

    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Artwork ID is required." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("artworks")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Artwork deleted successfully.",
    });
  } catch (error) {
    console.error("Delete request error:", error);

    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
