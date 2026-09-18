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

export default function Checkout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          total,
          payment_method: "COD",
          items: cart,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to place order."
        );
      }

      localStorage.removeItem("art-cart");

      window.location.href = `/order-success?id=${data.id}`;
    } catch (error) {
      console.error("Order submission error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to place order."
      );

      setSubmitting(false);
    }
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  if (!loaded) {
    return (
      <section className="section">
        <p className="muted">Loading checkout...</p>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="section">
        <p className="eyebrow">CHECKOUT</p>

        <h1>
          Your bag
          <br />
          is empty.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: "500px",
            marginBottom: "30px",
          }}
        >
          Add an artwork to your bag before proceeding
          to checkout.
        </p>

        <Link className="button" href="/shop">
          Explore Collection
        </Link>
      </section>
    );
  }

  return (
    <main>
      <section className="section checkoutPage">
        <p className="eyebrow">CHECKOUT</p>

        <h1>
          Complete
          <br />
          your <em>order.</em>
        </h1>

        <div className="checkoutLayout">
          {/* DELIVERY FORM */}
          <div className="checkoutForm">
            <div className="checkoutHeading">
              <p className="eyebrow">01</p>

              <h2>Delivery details</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="checkoutFields">
                <input
                  name="name"
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="address"
                  placeholder="Full delivery address"
                  value={form.address}
                  onChange={handleChange}
                  rows={5}
                  required
                />

                <div className="checkoutRow">
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="state"
                    type="text"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <input
                  name="pincode"
                  type="text"
                  placeholder="PIN code"
                  value={form.pincode}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="paymentInfo">
                <p className="eyebrow">PAYMENT</p>

                <strong>Cash on Delivery</strong>

                <p className="muted">
                  Payment will be collected when your
                  artwork is delivered.
                </p>
              </div>

              {error && (
                <p className="checkoutError">
                  {error}
                </p>
              )}

              <button
                className="button checkoutButton"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Placing Order..."
                  : "Place COD Order"}
              </button>
            </form>

            <Link
              className="backToCart"
              href="/cart"
            >
              ← Back to shopping bag
            </Link>
          </div>

          {/* ORDER SUMMARY */}
          <aside className="checkoutSummary">
            <div className="checkoutHeading">
              <p className="eyebrow">02</p>

              <h2>Your selection</h2>
            </div>

            <div className="checkoutItems">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="checkoutItem"
                >
                  <div className="checkoutItemImage">
                    <img
                      src={item.image}
                      alt={item.title}
                    />
                  </div>

                  <div>
                    <strong>{item.title}</strong>

                    <p className="muted">
                      {item.artist}
                    </p>

                    <p>
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkoutTotal">
              <span>Total</span>

              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
