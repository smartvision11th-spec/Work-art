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
        <p>Loading artwork...</p>
      </section>
    );
  }

  if (!artwork) {
    return (
      <section className="section">
        <h1>Artwork not found</h1>

        <Link href="/shop">
          ← Back to collection
        </Link>
      </section>
    );
  }

  return (
    <section className="section detail">
      <Link href="/shop">
        ← Back to collection
      </Link>

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
          <p className="eyebrow">
            {artwork.category}
          </p>

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

          <button
            className="button"
            type="button"
            onClick={addToBag}
          >
            Add to bag
          </button>

          {message && <p>{message}</p>}
        </div>
      </div>
    </section>
  );
}
