"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

type CartItem = {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
};

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchArtwork() {
      try {
        const response = await fetch(`/api/artworks?id=${id}`);

        if (!response.ok) {
          throw new Error("Failed to load artwork.");
        }

        const data = await response.json();

        setArtwork(data);
      } catch (error) {
        console.error("Artwork loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtwork();
  }, [id]);

  function addToBag() {
    if (!artwork) {
      return;
    }

    const existingCart = localStorage.getItem("art-cart");

    const cart: CartItem[] = existingCart
      ? JSON.parse(existingCart)
      : [];

    const alreadyInCart = cart.some(
      (item) => item.id === artwork.id
    );

    if (alreadyInCart) {
      setMessage("Already in your bag.");
      return;
    }

    cart.push({
      id: artwork.id,
      title: artwork.title,
      artist: artwork.artist,
      price: artwork.price,
      image: artwork.image_url,
    });

    localStorage.setItem(
      "art-cart",
      JSON.stringify(cart)
    );

    setMessage("Added to bag.");
  }

  if (loading) {
    return (
      <section className="section">
        <p className="muted">Loading artwork...</p>
      </section>
    );
  }

  if (!artwork) {
    return (
      <section className="section">
        <p className="eyebrow">COLLECTION</p>

        <h1>
          Artwork
          <br />
          not found.
        </h1>

        <Link className="button" href="/shop">
          Back to collection
        </Link>
      </section>
    );
  }

  return (
    <main>
      <section className="detail">
        <Link
          href="/shop"
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          ← Back to collection
        </Link>

        <div className="detailGrid">
          {/* ARTWORK IMAGE */}
          <div className="detailImage">
            <img
              src={artwork.image_url}
              alt={artwork.title}
            />
          </div>

          {/* ARTWORK INFORMATION */}
          <div className="detailInfo">
            <p className="eyebrow">
              {artwork.category}
            </p>

            <h1>{artwork.title}</h1>

            <p
              style={{
                marginTop: "-5px",
                marginBottom: "35px",
              }}
            >
              By {artwork.artist}
            </p>

            <p
              style={{
                fontFamily:
                  'Georgia, "Times New Roman", serif',
                fontSize: "24px",
                marginBottom: "35px",
              }}
            >
              ₹{artwork.price.toLocaleString("en-IN")}
            </p>

            <p
              className="muted"
              style={{
                maxWidth: "500px",
                lineHeight: 1.9,
              }}
            >
              {artwork.description}
            </p>

            <div className="specs">
              <div>
                <span className="specLabel">
                  Medium
                </span>
                <span>{artwork.medium}</span>
              </div>

              <div>
                <span className="specLabel">
                  Size
                </span>
                <span>{artwork.size}</span>
              </div>

              <div>
                <span className="specLabel">
                  Edition
                </span>
                <span>{artwork.edition}</span>
              </div>
            </div>

            <button
              className="button"
              type="button"
              onClick={addToBag}
            >
              Add to bag
            </button>

            {message && (
              <p
                style={{
                  marginTop: "15px",
                  fontSize: "11px",
                  color: "var(--muted)",
                }}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CUSTOM ART CTA */}
      <section className="pinkSection">
        <div className="section">
          <p className="eyebrow">LOOKING FOR SOMETHING ELSE?</p>

          <h2
            style={{
              maxWidth: "800px",
            }}
          >
            Create something
            <br />
            <em>personal.</em>
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: "520px",
              marginBottom: "35px",
            }}
          >
            Dipali also creates custom artwork based on
            your ideas, memories, references, or space.
          </p>

          <Link
            className="button"
            href="/commission"
          >
            Explore Custom Art
          </Link>
        </div>
      </section>
    </main>
  );
}
