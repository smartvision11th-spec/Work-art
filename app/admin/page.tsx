"use client";

import { useState } from "react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <section className="section">
      <p className="eyebrow">ADMIN PANEL</p>

      <h1>Dashboard</h1>

      <div className="adminGrid">
        <button
          className={activeTab === "dashboard" ? "adminCard active" : "adminCard"}
          onClick={() => setActiveTab("dashboard")}
        >
          <span>Overview</span>
          <strong>Dashboard</strong>
        </button>

        <button
          className={activeTab === "artworks" ? "adminCard active" : "adminCard"}
          onClick={() => setActiveTab("artworks")}
        >
          <span>Collection</span>
          <strong>Artworks</strong>
        </button>

        <button
          className={activeTab === "orders" ? "adminCard active" : "adminCard"}
          onClick={() => setActiveTab("orders")}
        >
          <span>Sales</span>
          <strong>Orders</strong>
        </button>

        <button
          className={activeTab === "settings" ? "adminCard active" : "adminCard"}
          onClick={() => setActiveTab("settings")}
        >
          <span>Store</span>
          <strong>Settings</strong>
        </button>
      </div>

      <div className="adminPanel">
        {activeTab === "dashboard" && (
          <>
            <h2>Overview</h2>
            <p className="muted">
              Your store management dashboard.
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
          </>
        )}

        {activeTab === "artworks" && (
          <>
            <h2>Artworks</h2>
            <p className="muted">
              Manage the artworks displayed in your shop.
            </p>

            <button className="adminAction">
              + Add Artwork
            </button>
          </>
        )}

        {activeTab === "orders" && (
          <>
            <h2>Orders</h2>
            <p className="muted">
              Customer orders will appear here.
            </p>
          </>
        )}

        {activeTab === "settings" && (
          <>
            <h2>Settings</h2>
            <p className="muted">
              Store settings will be added later.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
