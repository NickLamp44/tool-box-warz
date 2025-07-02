import React from "react";
import ContentUploader from "../components/admin/contentUploader";

export default function AdminDashboard() {
  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Manage content uploads, blogs, media, and more.</p>
      </header>

      <main style={styles.main}>
        <section style={styles.panel}>
          <h2>Upload New Blog Content</h2>
          <ContentUploader />
        </section>
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: "sans-serif",
    background: "#f9f9f9",
    minHeight: "100vh",
    padding: "2rem",
  },
  header: {
    borderBottom: "1px solid #ccc",
    paddingBottom: "1rem",
    marginBottom: "2rem",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  panel: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
};
