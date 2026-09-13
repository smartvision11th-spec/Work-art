import { Suspense } from "react";
import Link from "next/link";
import OrderSuccessContent from "./OrderSuccessContent";

function Loading() {
  return (
    <section className="section">
      <p>Loading order details...</p>
    </section>
  );
}

export default function OrderSuccess() {
  return (
    <Suspense fallback={<Loading />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
