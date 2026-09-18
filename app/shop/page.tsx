"use client";

import { useEffect, useState } from "react";
import { ArtworkCard } from "@/components/ArtworkCard";
import type { Artwork } from "@/data/artworks";

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

        const formattedArtworks: Artwork[] = data.map(
          (artwork: any) => ({
            id: artwork.id,
            title: artwork.title,
            artist: artwork.artist,
            price: artwork.price,
            category: artwork.category,
            medium: artwork.medium,
            size: artwork.size,
            edition: artwork.edition,
            description: artwork.description,
            image: artwork.image_url,
          })
        );

        setArtworks(formattedArtworks);
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
    <main>
      {/* GALLERY HERO */}
      <section
        className="section"
        style={{
          paddingBottom: "70px",
        }}
      >
        <p className="eyebrow">THE COLLECTION</p>

        <h1>
          Original
          <br />
          <em>works.</em>
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: "560px",
            marginTop: "30px",
          }}
        >
          Explore Dipali Singh's collection of original artworks, created to
          bring emotion, character, and a sense of individuality into your
          space.
        </p>
      </section>

      {/* COLLECTION */}
      <section
        className="section"
        style={{
          paddingTop: "20px",
        }}
      >
        {loading && (
          <p className="muted">
            Loading the collection...
          </p>
        )}

        {error && (
          <p className="muted">
            {error}
          </p>
        )}

        {!loading && !error && artworks.length === 0 && (
          <p className="muted">
            No artworks are currently available.
          </p>
        )}

        {!loading && !error && artworks.length > 0 && (
          <div className="grid">
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
              />
            ))}
          </div>
        )}
      </section>

      {/* CUSTOM ART CTA */}
      <section className="pinkSection">
        <div
          className="section"
          style={{
            paddingTop: "120px",
            paddingBottom: "120px",
          }}
        >
          <p className="eyebrow">SOMETHING PERSONAL</p>

          <h2
            style={{
              maxWidth: "800px",
            }}
          >
            Looking for something
            <br />
            <em>made for you?</em>
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: "520px",
              marginBottom: "35px",
            }}
          >
            Dipali also creates custom artwork based on your ideas,
            references, memories, or the atmosphere you want.
          </p>

          <a className="button" href="/commission">
            Explore Custom Art
          </a>
        </div>
      </section>
    </main>
  );
}
