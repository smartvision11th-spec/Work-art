"use client";

import { useEffect, useState } from "react";

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

const emptyForm = {
  title: "",
  artist: "",
  price: "",
  category: "",
  medium: "",
  size: "",
  edition: "",
  description: "",
  image_url: "",
};

export default function Admin() {
  const [showForm, setShowForm] = useState(false);

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loadingArtworks, setLoadingArtworks] = useState(true);
  const [artworkError, setArtworkError] = useState("");

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchArtworks() {
    try {
      setLoadingArtworks(true);
      setArtworkError("");

      const response = await fetch("/api/artworks");

      if (!response.ok) {
        throw new Error("Failed to fetch artworks.");
      }

      const data = await response.json();

      setArtworks(data);
    } catch (error) {
      console.error(error);
      setArtworkError("Unable to load artworks.");
    } finally {
      setLoadingArtworks(false);
    }
  }

  useEffect(() => {
    fetchArtworks();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleEdit(artwork: Artwork) {
    setEditingId(artwork.id);

    setForm({
      title: artwork.title,
      artist: artwork.artist,
      price: String(artwork.price),
      category: artwork.category,
      medium: artwork.medium,
      size: artwork.size,
      edition: artwork.edition,
      description: artwork.description,
      image_url: artwork.image_url,
    });

    setShowForm(true);
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(false);
    setMessage("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const isEditing = editingId !== null;

      const url = isEditing
        ? `/api/artworks?id=${editingId}`
        : "/api/artworks";

      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            (isEditing
              ? "Failed to update artwork."
              : "Failed to add artwork.")
        );
      }

      setMessage(
        isEditing
          ? "Artwork updated successfully."
          : "Artwork added successfully."
      );

      setForm(emptyForm);
      setEditingId(null);

      await fetchArtworks();
    } catch (error) {
      console.error(error);

      setMessage(
        editingId
          ? "Unable to update artwork."
          : "Unable to add artwork."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    const confirmed = window.confirm(
      `Delete "${title}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setMessage("");

    try {
      const response = await fetch(`/api/artworks?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete artwork.");
      }

      setMessage("Artwork deleted successfully.");

      await fetchArtworks();
    } catch (error) {
      console.error(error);
      setMessage("Unable to delete artwork.");
    } finally {
      setDeletingId(null);
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
          onClick={() => {
            if (editingId) {
              cancelEdit();
            } else {
              setShowForm(!showForm);
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <span>Collection</span>
          <strong>
            {editingId
              ? "Close Edit"
              : showForm
              ? "Close"
              : "Add Artwork"}
          </strong>
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

      {showForm && (
        <div className="adminPanel">
          <h2>{editingId ? "Edit Artwork" : "Add Artwork"}</h2>

          <p className="muted">
            {editingId
              ? "Update the artwork details below."
              : "Add a new artwork to your collection."}
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
              {saving
                ? editingId
                  ? "Saving..."
                  : "Adding..."
                : editingId
                ? "Save Changes"
                : "Add Artwork"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                disabled={saving}
              >
                Cancel Edit
              </button>
            )}
          </form>

          {message && <p>{message}</p>}
        </div>
      )}

      <div className="adminPanel">
        <h2>Artwork Manager</h2>

        <p className="muted">
          Manage artworks currently stored in Supabase.
        </p>

        {loadingArtworks && <p>Loading artworks...</p>}

        {artworkError && <p>{artworkError}</p>}

        {!loadingArtworks &&
          !artworkError &&
          artworks.length === 0 && (
            <p>No artworks found.</p>
          )}

        {!loadingArtworks &&
          !artworkError &&
          artworks.length > 0 && (
            <div>
              {artworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="adminArtwork"
                >
                  <div>
                    <img
                      src={artwork.image_url}
                      alt={artwork.title}
                      style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        display: "block",
                        marginBottom: "14px",
                      }}
                    />

                    <strong>{artwork.title}</strong>

                    <p className="muted">
                      {artwork.artist}
                    </p>

                    <p>
                      ₹{artwork.price.toLocaleString("en-IN")}
                    </p>

                    <small>
                      {artwork.category} · {artwork.medium}
                    </small>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => handleEdit(artwork)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(artwork.id, artwork.title)
                      }
                      disabled={deletingId === artwork.id}
                    >
                      {deletingId === artwork.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        {message && !showForm && <p>{message}</p>}
      </div>
    </section>
  );
}
