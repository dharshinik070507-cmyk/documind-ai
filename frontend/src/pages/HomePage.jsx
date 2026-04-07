import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import { uploadDocument } from "../api/documentApi";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = async (file) => {
    try {
      setLoading(true);
      const uploadData = await uploadDocument(file);

      navigate("/dashboard", {
        state: {
          filename: uploadData.filename,
        },
      });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <div style={styles.badge}>AI-Powered Intelligent Document Processing</div>

        <h1 style={styles.title}>
          DocuMind AI
        </h1>

        <p style={styles.subtitle}>
          Transform documents into structured data, smart insights, and
          interactive answers using OCR, table extraction, image extraction,
          exports, and document chat.
        </p>
      </div>

      <div style={styles.uploadSection}>
        <FileUpload onFileSelect={handleFileSelect} loading={loading} />
      </div>

      <div style={styles.featureGrid}>
        <div style={styles.featureCard}>
          <h3 style={styles.featureTitle}>Text Extraction</h3>
          <p style={styles.featureText}>
            Extract printed text from PDFs and images for downstream analysis.
          </p>
        </div>

        <div style={styles.featureCard}>
          <h3 style={styles.featureTitle}>Table Understanding</h3>
          <p style={styles.featureText}>
            Detect and structure table contents into organized row-column format.
          </p>
        </div>

        <div style={styles.featureCard}>
          <h3 style={styles.featureTitle}>AI Insights</h3>
          <p style={styles.featureText}>
            Generate summaries, keywords, warnings, and confidence scores.
          </p>
        </div>

        <div style={styles.featureCard}>
          <h3 style={styles.featureTitle}>Chat with Document</h3>
          <p style={styles.featureText}>
            Ask natural questions and get context-based answers instantly.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
    color: "white",
    padding: "40px 24px 60px 24px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
  },

  hero: {
    maxWidth: "950px",
    margin: "0 auto",
    textAlign: "center",
    marginBottom: "42px",
  },

  badge: {
    display: "inline-block",
    background: "rgba(37, 99, 235, 0.18)",
    color: "#93c5fd",
    padding: "10px 16px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.4px",
    marginBottom: "22px",
  },

  title: {
    fontSize: "58px",
    margin: 0,
    fontWeight: "800",
    letterSpacing: "-1px",
  },

  subtitle: {
    maxWidth: "820px",
    margin: "18px auto 0 auto",
    color: "#cbd5e1",
    fontSize: "18px",
    lineHeight: "1.8",
  },

  uploadSection: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "42px",
  },

  featureGrid: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },

  featureCard: {
    background: "#111827",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
  },

  featureTitle: {
    marginTop: 0,
    marginBottom: "10px",
    fontSize: "20px",
  },

  featureText: {
    margin: 0,
    color: "#94a3b8",
    lineHeight: "1.7",
    fontSize: "14px",
  },
};

export default HomePage;
