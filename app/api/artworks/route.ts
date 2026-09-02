```tsx
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
```
