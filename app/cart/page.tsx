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
        <p className="muted">Loading bag...</p>
      </section>
    );
  }

  return (
    <main>
      <section className="section cartPage">
        <p className="eyebrow">YOUR SELECTION</p>

        <h1>
          Your
          <br />
          <em>bag.</em>
        </h1>

        {cart.length === 0 ? (
          <div className="emptyCart">
            <p className="muted">
              Your bag is currently empty.
            </p>

            <Link
              className="button"
              href="/shop"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="cartLayout">
            {/* ITEMS */}
            <div className="cartItems">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="cartItem"
                >
                  <Link
                    href={`/artwork/${item.id}`}
                    className="cartItemImage"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                    />
                  </Link>

                  <div className="cartItemInfo">
                    <div>
                      <p className="eyebrow">
                        {item.artist}
                      </p>

                      <h2>{item.title}</h2>

                      <p className="cartPrice">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="removeButton"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* SUMMARY */}
            <aside className="cartSummary">
              <p className="eyebrow">ORDER SUMMARY</p>

              <div className="cartTotal">
                <span>Total</span>

                <strong>
                  ₹{total.toLocaleString("en-IN")}
                </strong>
              </div>

              <Link
                className="button cartCheckout"
                href="/checkout"
              >
                Proceed to Checkout
              </Link>

              <Link
                className="continueShopping"
                href="/shop"
              >
                ← Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
