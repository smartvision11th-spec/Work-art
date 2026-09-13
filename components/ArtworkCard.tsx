import Link from "next/link";
import type { Artwork } from "@/data/artworks";

export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Link className="card" href={"/artwork/" + artwork.id}>
      <div className="image">
        <img
          src={artwork.image}
          alt={artwork.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div className="meta">
        <span>
          <b>{artwork.title}</b>
          <small>{artwork.artist}</small>
        </span>

        <b>₹{artwork.price.toLocaleString("en-IN")}</b>
      </div>
    </Link>
  );
}
