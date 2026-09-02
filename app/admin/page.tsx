"use client";

import { useState } from "react";

export default function Admin() {
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    artist: "",
    price: "",
    category: "",
    medium: "",
    size: "",
    edition: "",
    description: "",
    image_url: "",
  });

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

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

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/artworks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add artwork.");
      }

      setMessage("Artwork added successfully.");

      setForm({
        title: "",
        artist: "",
        price: "",
        category: "",
        medium: "",
        size: "",
        edition: "",
        description: "",
        image_url: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Unable to add artwork.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="section">
      <p className="eyebrow">ADMIN PANEL</p>

      <h1>Dashboard</h1>

      <div className="adminGrid">
        <div className="adminCard">
          <span>Overview</span>
          <strong>Dashboard</strong>
        </div>

        <div
          className="adminCard"
          onClick={() => setShowForm(!showForm)}
          style={{ cursor: "pointer" }}
        >
          <span>Collection</span>
          <strong>Artworks</strong>
        </div>

        <div className="adminCard">
          <span>Sales</span>
          <strong>Orders</strong>
        </div>

        <div className="adminCard">
          <span>Store</span>
          <strong>Settings</strong>
        </div>
      </div>

      {showForm ? (
        <div className="adminPanel">
          <h2>Add Artwork</h2>

          <p className="muted">
            Add a new artwork to your collection.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Artwork title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <input
              name="artist"
              placeholder="Artist name"
              value={form.artist}
              onChange={handleChange}
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
            />

            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              required
            />

            <input
              name="medium"
              placeholder="Medium"
              value={form.medium}
              onChange={handleChange}
              required
            />

            <input
              name="size"
              placeholder="Size"
              value={form.size}
              onChange={handleChange}
              required
            />

            <input
              name="edition"
              placeholder="Edition"
              value={form.edition}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Artwork description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              required
            />

            <input
              name="image_url"
              placeholder="Image URL"
              value={form.image_url}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={saving}>
              {saving ? "Adding..." : "Add Artwork"}
            </button>
          </form>

          {message && <p>{message}</p>}
        </div>
      ) : (
        <div className="adminPanel">
          <h2>Overview</h2>

          <p className="muted">
            Manage your art collection from this dashboard.
          </p>

          <div className="adminStats">
            <div>
              <span>Total artworks</span>
              <strong>5</strong>
            </div>

            <div>
              <span>Orders</span>
              <strong>0</strong>
            </div>

            <div>
              <span>Revenue</span>
              <strong>₹0</strong>
            </div>

            <div>
              <span>Visitors</span>
              <strong>0</strong>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
