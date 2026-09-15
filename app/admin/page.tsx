"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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
const [checkingAuth, setCheckingAuth] = useState(true);
const [authenticated, setAuthenticated] = useState(false);

const [showForm, setShowForm] = useState(false);

const [artworks, setArtworks] = useState<Artwork[]>([]);
const [loadingArtworks, setLoadingArtworks] = useState(true);
const [artworkError, setArtworkError] = useState("");

const [form, setForm] = useState(emptyForm);

const [editingId, setEditingId] = useState<string | null>(null);

const [message, setMessage] = useState("");
const [saving, setSaving] = useState(false);
const [uploading, setUploading] = useState(false);
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
async function checkAuth() {
const {
data: { session },
} = await supabase.auth.getSession();


  if (!session) {
    window.location.href = "/admin/login";
    return;
  }

  setAuthenticated(true);
  setCheckingAuth(false);

  await fetchArtworks();
}

checkAuth();

}, []);

async function handleSignOut() {
  const confirmed = window.confirm(
    "Are you sure you want to sign out?"
  );

  if (!confirmed) {
    return;
  }

  await supabase.auth.signOut();
  window.location.href = "/admin/login";
}

function handleChange(
e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
setForm({
...form,
[e.target.name]: e.target.value,
});
}

async function handleImageUpload(
e: React.ChangeEvent<HTMLInputElement>
) {
try {
const file = e.target.files?.[0];


  if (!file) {
    return;
  }

  setUploading(true);
  setMessage("");

  const fileExt = file.name.split(".").pop();

  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;

  const filePath = `artworks/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("Artwork")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Image upload error:", uploadError);
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage
    .from("Artwork")
    .getPublicUrl(filePath);

  if (!data.publicUrl) {
    throw new Error("Could not get image URL.");
  }

  setForm({
    ...form,
    image_url: data.publicUrl,
  });

  setMessage("Image uploaded successfully.");
} catch (error) {
  console.error(error);

  setMessage(
    error instanceof Error
      ? `Image upload failed: ${error.message}`
      : "Image upload failed."
  );
} finally {
  setUploading(false);
}

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


if (!form.image_url) {
  setMessage("Please upload an artwork image first.");
  return;
}

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
    error instanceof Error
      ? error.message
      : editingId
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

if (checkingAuth) {
return ( <section className="section"> <p>Checking admin access...</p> </section>
);
}

if (!authenticated) {
return null;
}

return ( <section className="section"> <p className="eyebrow">ADMIN PANEL</p>

  <h1>Dashboard</h1>

  <button
    type="button"
    onClick={handleSignOut}
    style={{ marginBottom: "24px" }}
  >
    Sign Out
  </button>

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

        <div>
          <label>Artwork Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading || saving}
          />

          {uploading && <p>Uploading image...</p>}

          {form.image_url && (
            <div style={{ marginTop: "12px" }}>
              <img
                src={form.image_url}
                alt="Artwork preview"
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={saving || uploading}
        >
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
            disabled={saving || uploading}
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
