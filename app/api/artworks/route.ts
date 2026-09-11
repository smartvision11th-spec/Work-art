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

    const { data, error } = await supabase
      .from("artworks")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase delete error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Artwork was not deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Artwork deleted successfully.",
      deletedArtwork: data,
    });
  } catch (error) {
    console.error("Delete request error:", error);

    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Artwork ID is required." },
        { status: 400 }
      );
    }

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
      .update({
        title,
        artist,
        price: Number(price),
        category,
        medium,
        size,
        edition,
        description,
        image_url,
      })
      .eq("id", id)
      .select("*");

    if (error) {
      console.error("Supabase update error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Artwork not found or was not updated." },
        { status: 404 }
      );
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Update request error:", error);

    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
