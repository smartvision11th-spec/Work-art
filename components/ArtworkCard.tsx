import Link from "next/link";
import type { Artwork } from "@/data/artworks";

export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Link className="card" href={"/artwork/" + artwork.id}>
      <div className="image">
        <img
          src={artwork.image}
          alt={artwork.title}
          loading="lazy"
        />

        <span className="cardView">
          View artwork
        </span>
      </div>

      <div className="meta">
        <span>
          <b>{artwork.title}</b>
          <small>{artwork.artist}</small>
        </span>

        <span className="cardPrice">
          ₹{artwork.price.toLocaleString("en-IN")}
        </span>
      </div>
    </Link>
  );
}
