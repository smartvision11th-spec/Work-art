import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Artwork = {
  id: string;
  title: string;
  artist: string;
  price: number;
  category: string;
  medium: string;
  size: string;
  edition: string;
  description: string;
  image_url: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: artwork, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !artwork) {
    console.error("Artwork detail error:", error);
    notFound();
  }

  return (
    <section className="section detail">
      <Link href="/shop">← Back to collection</Link>

      <div className="detailGrid">
        <div className="detailImage">
          <img
            src={artwork.image_url}
            alt={artwork.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div>
          <p className="eyebrow">{artwork.category}</p>

          <h1>{artwork.title}</h1>

          <p>By {artwork.artist}</p>

          <h3>
            ₹{artwork.price.toLocaleString("en-IN")}
          </h3>

          <p className="muted">
            {artwork.description}
          </p>

          <div className="specs">
            <span>
              Medium: {artwork.medium}
            </span>

            <span>
              Size: {artwork.size}
            </span>

            <span>
              Edition: {artwork.edition}
            </span>
          </div>

          <button className="button">
            Add to bag
          </button>
        </div>
      </div>
    </section>
  );
}
