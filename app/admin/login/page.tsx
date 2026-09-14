"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
const router = useRouter();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

async function handleLogin(e: React.FormEvent) {
e.preventDefault();

setLoading(true);
setError("");

const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

if (error) {
  setError(error.message);
  setLoading(false);
  return;
}

router.push("/admin");

}

return ( <section className="section"> <p className="eyebrow">ADMIN ACCESS</p>


  <h1>Admin Login</h1>

  <p className="muted">
    Sign in to manage the ArtSell store.
  </p>

  <form onSubmit={handleLogin}>
    <input
      type="email"
      placeholder="Admin email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    {error && (
      <p style={{ color: "red" }}>
        {error}
      </p>
    )}

    <button
      className="button"
      type="submit"
      disabled={loading}
    >
      {loading ? "Signing in..." : "Sign In"}
    </button>
  </form>
</section>
);
}
