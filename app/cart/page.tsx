"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CartItem = {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
};

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("art-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Cart loading error:", error);
        setCart([]);
      }
    }

    setLoaded(true);
  }, []);

  function removeFromCart(id: string) {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "art-cart",
      JSON.stringify(updatedCart)
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  if (!loaded) {
    return (
      <section className="section">
        <p>Loading bag...</p>
      </section>
    );
  }

  return (
    <section className="section">
      <p className="eyebrow">YOUR SELECTION</p>

      <h1>Shopping bag</h1>

      {cart.length === 0 ? (
        <div>
          <p className="muted">
            Your bag is currently empty.
          </p>

          <Link className="button" href="/shop">
            Explore collection
          </Link>
        </div>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="adminArtwork"
            >
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "160px",
                    height: "160px",
                    objectFit: "cover",
                    display: "block",
                    marginBottom: "12px",
                    borderRadius: "8px",
                  }}
                />

                <h3>{item.title}</h3>

                <p className="muted">
                  By {item.artist}
                </p>

                <p>
                  ₹{item.price.toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "30px" }}>
            <h2>
              Total: ₹{total.toLocaleString("en-IN")}
            </h2>

            <button
              className="button"
              type="button"
              onClick={() => {
                alert("Checkout will be available next.");
              }}
            >
              Proceed to Checkout
            </button>
          </div>

          <div style={{ marginTop: "20px" }}>
            <Link href="/shop">
              ← Continue shopping
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
