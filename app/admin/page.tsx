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

type Order = {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  total: number;
  payment_method: string;
  status: string;
  items: any;
  created_at: string;
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
  const [showOrders, setShowOrders] = useState(false);

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loadingArtworks, setLoadingArtworks] = useState(true);
  const [artworkError, setArtworkError] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(
    null
  );

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

  async function fetchOrders() {
    try {
      setLoadingOrders(true);
      setOrderError("");

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Orders error:", error);
        throw new Error(error.message);
      }

      setOrders(data || []);
    } catch (error) {
      console.error(error);

      setOrderError(
        error instanceof Error
          ? error.message
          : "Unable to load orders."
      );
    } finally {
      setLoadingOrders(false);
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

      const { data: adminUser, error } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (error || !adminUser) {
        await supabase.auth.signOut();
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
    setShowOrders(false);
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
        throw new Error(
          data.error || "Failed to delete artwork."
        );
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

  async function handleOrderStatusChange(
    orderId: string,
    newStatus: string
  ) {
    setUpdatingOrderId(orderId);
    setOrderError("");
    setMessage("");

    try {
      const { error } = await supabase
        .from("orders")
        .update({
          status: newStatus,
        })
        .eq("id", orderId);

      if (error) {
        console.error("Order update error:", error);
        throw new Error(error.message);
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );

      setMessage("Order status updated successfully.");
    } catch (error) {
      console.error(error);

      setOrderError(
        error instanceof Error
          ? error.message
          : "Unable to update order."
      );
    } finally {
      setUpdatingOrderId(null);
    }
  }

  function formatOrderDate(date: string) {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function renderOrderItems(items: any) {
    if (!items) {
      return "No items";
    }

    if (!Array.isArray(items)) {
      return "Order items unavailable";
    }

    return items.map((item: any, index: number) => {
      const title =
        item.title ||
        item.name ||
        item.artwork_title ||
        "Artwork";

      const quantity =
        item.quantity ||
        item.qty ||
        1;

      return (
        <div key={index}>
          {title} × {quantity}
        </div>
      );
    });
  }

  if (checkingAuth) {
    return (
      <section className="section">
        <p>Checking admin access...</p>
      </section>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <section className="section">
      <p className="eyebrow">ADMIN PANEL</p>

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
              setShowOrders(false);
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

        <div
          className="adminCard"
          onClick={async () => {
            setShowOrders(!showOrders);
            setShowForm(false);
            setEditingId(null);

            if (!showOrders) {
              await fetchOrders();
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <span>Sales</span>
          <strong>Orders</strong>
        </div>

        <div className="adminCard">
          <span>Store</span>
          <strong>Settings</strong>
        </div>
      </div>

      {showOrders && (
        <div className="adminPanel">
          <h2>Orders</h2>

          <p className="muted">
            Manage customer orders and update their status.
          </p>

          {loadingOrders && <p>Loading orders...</p>}

          {orderError && (
            <p style={{ color: "red" }}>
              {orderError}
            </p>
          )}

          {!loadingOrders &&
            !orderError &&
            orders.length === 0 && (
              <p>No orders found.</p>
            )}

          {!loadingOrders &&
            !orderError &&
            orders.length > 0 && (
              <div>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="adminArtwork"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <div>
                      <strong>
                        Order #{order.id.slice(0, 8)}
                      </strong>

                      <p className="muted">
                        {formatOrderDate(order.created_at)}
                      </p>

                      <p>
                        <strong>Customer:</strong>{" "}
                        {order.customer_name}
                      </p>

                      <p>
                        <strong>Phone:</strong>{" "}
                        {order.phone}
                      </p>

                      <p>
                        <strong>Address:</strong>{" "}
                        {order.address},{" "}
                        {order.city},{" "}
                        {order.state} -{" "}
                        {order.pincode}
                      </p>

                      <p>
                        <strong>Items:</strong>
                      </p>

                      <div>
                        {renderOrderItems(order.items)}
                      </div>

                      <p>
                        <strong>Total:</strong>{" "}
                        ₹
                        {Number(order.total).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      <p>
                        <strong>Payment:</strong>{" "}
                        {order.payment_method}
                      </p>
                    </div>

                    <div style={{ marginTop: "16px" }}>
                      <label
                        htmlFor={`status-${order.id}`}
                      >
                        Order Status
                      </label>

                      <select
                        id={`status-${order.id}`}
                        value={order.status}
                        onChange={(e) =>
                          handleOrderStatusChange(
                            order.id,
                            e.target.value
                          )
                        }
                        disabled={
                          updatingOrderId === order.id
                        }
                        style={{
                          display: "block",
                          marginTop: "8px",
                          padding: "10px",
                        }}
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Confirmed">
                          Confirmed
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>

                      {updatingOrderId === order.id && (
                        <p>Updating status...</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

          {message && <p>{message}</p>}
        </div>
      )}

      {showForm && (
        <div className="adminPanel">
          <h2>
            {editingId ? "Edit Artwork" : "Add Artwork"}
          </h2>

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

              {uploading && (
                <p>Uploading image...</p>
              )}

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

        {loadingArtworks && (
          <p>Loading artworks...</p>
        )}

        {artworkError && (
          <p>{artworkError}</p>
        )}

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

                    <strong>
                      {artwork.title}
                    </strong>

                    <p className="muted">
                      {artwork.artist}
                    </p>

                    <p>
                      ₹
                      {artwork.price.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <small>
                      {artwork.category} ·{" "}
                      {artwork.medium}
                    </small>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(artwork)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          artwork.id,
                          artwork.title
                        )
                      }
                      disabled={
                        deletingId === artwork.id
                      }
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

        {message && !showForm && !showOrders && (
          <p>{message}</p>
        )}
      </div>
    </section>
  );
}
