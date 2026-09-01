"use client";

import { useEffect, useState } from "react";
import { ArtworkCard } from "@/components/ArtworkCard";

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
  created_at: string;
};

export default function Shop() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchArtworks() {
      try {
        const response = await fetch("/api/artworks");

        if (!response.ok) {
          throw new Error("Failed to fetch artworks");
        }

        const data = await response.json();
        setArtworks(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load artworks.");
      } finally {
        setLoading(false);
      }
    }

    fetchArtworks();
  }, []);

  return (
    <section className="section">
      <p className="eyebrow">THE COLLECTION</p>
      <h1>All works</h1>

      {loading && <p>Loading artworks...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="grid">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </section>
  );
}
