"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <section className="section">
      <p className="eyebrow">ORDER CONFIRMED</p>

      <h1>Thank you for your order.</h1>

      <p className="muted">
        Your COD order has been placed successfully.
      </p>

      {orderId && (
        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
      )}

      <p className="muted">
        We will contact you using the phone number provided
        during checkout to confirm the delivery details.
      </p>

      <div style={{ marginTop: "24px" }}>
        <Link className="button" href="/shop">
          Continue exploring
        </Link>
      </div>
    </section>
  );
}
