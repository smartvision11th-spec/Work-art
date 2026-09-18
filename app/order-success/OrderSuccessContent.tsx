"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <main>
      <section className="orderSuccess">
        <div className="orderSuccessInner">
          <p className="eyebrow">ORDER CONFIRMED</p>

          <div className="orderSuccessMark">
            ✓
          </div>

          <h1>
            Thank you for<br />
            your <em>order.</em>
          </h1>

          <p className="orderSuccessLead">
            Your artwork has been reserved successfully.
          </p>

          {orderId && (
            <div className="orderIdBox">
              <span>ORDER ID</span>
              <strong>{orderId}</strong>
            </div>
          )}

          <div className="orderSuccessMessage">
            <p>
              We will contact you using the phone number provided
              during checkout to confirm your delivery details.
            </p>

            <p>
              Your order is currently set for <strong>Cash on Delivery.</strong>
            </p>
          </div>

          <div className="orderSuccessActions">
            <Link className="button" href="/shop">
              Continue exploring
            </Link>

            <Link className="orderBackLink" href="/">
              Return home
            </Link>
          </div>
        </div>
      </section>

      <section className="pinkSection orderSuccessBottom">
        <div className="section">
          <p className="eyebrow">ART THAT FEELS PERSONAL</p>

          <h2>
            Looking for something
            <br />
            <em>made for you?</em>
          </h2>

          <p className="muted">
            Explore custom artwork created around your ideas,
            memories, references, or the feeling you want to capture.
          </p>

          <Link className="button" href="/commission">
            Explore Custom Art
          </Link>
        </div>
      </section>
    </main>
  );
}
