import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  extractDocument,
  getInsights,
  askDocumentQuestion,
  getJsonDownloadUrl,
  getExcelDownloadUrl,
  getImageUrl,
} from "../api/documentApi";
import InsightPanel from "../components/InsightPanel";
import TablePanel from "../components/TablePanel";

function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const filename = location.state?.filename;

  const [extractData, setExtractData] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState("Initializing...");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState("");

  useEffect(() => {
    if (!filename) {
      navigate("/");
      return;
    }

    async function fetchData() {
      try {
        setLoadingStep("Extracting document content...");
        const extracted = await extractDocument(filename);

        setLoadingStep("Generating AI insights...");
        const insightData = await getInsights(filename);

        setExtractData(extracted);
        setInsights(insightData);
        setLoadingStep("Completed");
      } catch (error) {
        console.error("Dashboard loading error:", error);
        alert("Failed to load extracted data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filename, navigate]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setChatLoading(true);
      const response = await askDocumentQuestion(
        question,
        extractData?.extracted_text || ""
      );
      setAnswer(response.answer);
    } catch (error) {
      console.error("Chat error:", error);
      setAnswer("Failed to get response from document chat.");
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loaderPage}>
        <div style={styles.loaderCard}>
          <div style={styles.loaderSpinner}></div>
          <h2 style={styles.loaderTitle}>Processing Document</h2>
          <p style={styles.loaderText}>{loadingStep}</p>

          <div style={styles.loaderBarOuter}>
            <div style={styles.loaderBarInner}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>DocuMind AI Dashboard</h1>
          <p style={styles.subtitle}>
            Intelligent document extraction, structuring, and analysis
          </p>
        </div>

        <button onClick={() => navigate("/")} style={styles.backButton}>
          ← Back to Home
        </button>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Document Type</p>
          <h3 style={styles.statValue}>
            {insights?.document_type || extractData?.file_type || "N/A"}
          </h3>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Tables Found</p>
          <h3 style={styles.statValue}>{extractData?.tables?.length || 0}</h3>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Images Extracted</p>
          <h3 style={styles.statValue}>{extractData?.extracted_images?.length || 0}</h3>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Confidence Score</p>
          <h3 style={styles.statValue}>
            {insights?.confidence_score !== undefined
              ? `${Math.round(insights.confidence_score * 100)}%`
              : "N/A"}
          </h3>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>Document Information</h2>
          <span style={styles.badge}>
            {extractData?.file_type?.toUpperCase() || "DOCUMENT"}
          </span>
        </div>

        <div style={styles.infoGrid}>
          <div>
            <p style={styles.infoLabel}>Filename</p>
            <p style={styles.infoValue}>{extractData?.filename || "N/A"}</p>
          </div>

          <div>
            <p style={styles.infoLabel}>JSON Output</p>
            <p style={styles.infoValue}>{extractData?.json_output || "Not generated"}</p>
          </div>

          <div>
            <p style={styles.infoLabel}>Excel Output</p>
            <p style={styles.infoValue}>{extractData?.excel_output || "Not generated"}</p>
          </div>

          <div>
            <p style={styles.infoLabel}>Keywords Found</p>
            <p style={styles.infoValue}>{insights?.keywords?.length || 0}</p>
          </div>
        </div>

        <div style={styles.downloadRow}>
          <a
            href={getJsonDownloadUrl(extractData?.filename || "")}
            target="_blank"
            rel="noreferrer"
            style={styles.downloadButton}
          >
            Download JSON
          </a>

          {extractData?.tables?.length ? (
            <a
              href={getExcelDownloadUrl(extractData?.filename || "")}
              target="_blank"
              rel="noreferrer"
              style={styles.downloadButtonSecondary}
            >
              Download Excel
            </a>
          ) : (
            <button style={styles.disabledButton} disabled>
              Excel Not Available
            </button>
          )}
        </div>
      </div>

      <InsightPanel insights={insights} />

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Extracted Text</h2>
        <div style={styles.textBox}>
          {extractData?.extracted_text || "No text found"}
        </div>
      </div>

      <TablePanel tables={extractData?.tables || []} />

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Extracted Images</h2>

        {extractData?.extracted_images?.length ? (
          <div style={styles.imageGrid}>
            {extractData.extracted_images.map((img, index) => (
              <div key={index} style={styles.imageCard}>
                <button
                  onClick={() => {
                    setSelectedImage(getImageUrl(img));
                    setSelectedImageName(img);
                  }}
                  style={styles.imageLinkButton}
                >
                  {img}
                </button>

                <img
                  src={getImageUrl(img)}
                  alt={img}
                  style={styles.imageThumb}
                  onClick={() => {
                    setSelectedImage(getImageUrl(img));
                    setSelectedImageName(img);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.emptyText}>No extracted images found.</p>
        )}
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Chat with Document</h2>

        <div style={styles.quickActions}>
          <button
            style={styles.quickButton}
            onClick={() => setQuestion("Give me a concise summary of this document")}
          >
            Summarize
          </button>

          <button
            style={styles.quickButton}
            onClick={() =>
              setQuestion("What are the most important keywords in this document?")
            }
          >
            Keywords
          </button>

          <button
            style={styles.quickButton}
            onClick={() => setQuestion("What is the main purpose of this document?")}
          >
            Purpose
          </button>

          <button
            style={styles.quickButton}
            onClick={() =>
              setQuestion("List the important structured details present in this document")
            }
          >
            Key Details
          </button>
        </div>

        <textarea
          rows="4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something like: Give me the summary of this document"
          style={styles.textarea}
        />

        <div style={styles.chatActions}>
          <button onClick={handleAsk} disabled={chatLoading} style={styles.askButton}>
            {chatLoading ? "Thinking..." : "Ask AI"}
          </button>
        </div>

        <div style={styles.answerBox}>
          {answer || "Answer will appear here after you ask a question."}
        </div>
      </div>

      <button onClick={() => navigate("/")} style={styles.backButtonBottom}>
        ← Back to Home
      </button>

      {selectedImage && (
        <div style={styles.modalOverlay} onClick={() => setSelectedImage(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0 }}>{selectedImageName}</h3>
              <button onClick={() => setSelectedImage(null)} style={styles.closeButton}>
                ✕
              </button>
            </div>
            <img src={selectedImage} alt={selectedImageName} style={styles.fullImage} />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
    color: "white",
    padding: "32px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
  },

  loaderPage: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },

  loaderCard: {
    background: "#111827",
    padding: "34px",
    borderRadius: "22px",
    textAlign: "center",
    minWidth: "340px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },

  loaderSpinner: {
    width: "54px",
    height: "54px",
    border: "5px solid #334155",
    borderTop: "5px solid #3b82f6",
    borderRadius: "50%",
    margin: "0 auto 18px auto",
  },

  loaderTitle: {
    margin: 0,
    marginBottom: "8px",
  },

  loaderText: {
    margin: 0,
    color: "#94a3b8",
    marginBottom: "18px",
  },

  loaderBarOuter: {
    width: "100%",
    height: "10px",
    background: "#1f2937",
    borderRadius: "999px",
    overflow: "hidden",
  },

  loaderBarInner: {
    width: "70%",
    height: "100%",
    background: "#2563eb",
    borderRadius: "999px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "28px",
  },

  title: {
    margin: 0,
    fontSize: "36px",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: "8px",
    marginBottom: 0,
    color: "#94a3b8",
    fontSize: "16px",
  },

  backButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  backButtonBottom: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    marginBottom: "24px",
  },

  statCard: {
    background: "#111827",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
  },

  statLabel: {
    margin: 0,
    color: "#94a3b8",
    fontSize: "14px",
  },

  statValue: {
    marginTop: "10px",
    marginBottom: 0,
    fontSize: "28px",
    fontWeight: "700",
  },

  card: {
    background: "#111827",
    color: "white",
    padding: "22px",
    borderRadius: "18px",
    marginBottom: "22px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "14px",
  },

  cardTitle: {
    marginTop: 0,
    marginBottom: "14px",
    fontSize: "22px",
  },

  badge: {
    background: "#1d4ed8",
    color: "white",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },

  infoLabel: {
    margin: 0,
    color: "#94a3b8",
    fontSize: "13px",
  },

  infoValue: {
    marginTop: "8px",
    marginBottom: 0,
    fontSize: "15px",
    wordBreak: "break-word",
  },

  downloadRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "20px",
  },

  downloadButton: {
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    fontWeight: "600",
    display: "inline-block",
  },

  downloadButtonSecondary: {
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    background: "#059669",
    color: "white",
    fontWeight: "600",
    display: "inline-block",
  },

  disabledButton: {
    padding: "12px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#475569",
    color: "#cbd5e1",
    fontWeight: "600",
    cursor: "not-allowed",
  },

  textBox: {
    maxHeight: "340px",
    overflowY: "auto",
    background: "#1f2937",
    padding: "16px",
    borderRadius: "12px",
    whiteSpace: "pre-wrap",
    lineHeight: "1.6",
    fontSize: "14px",
  },

  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },

  imageCard: {
    background: "#1f2937",
    padding: "14px",
    borderRadius: "14px",
  },

  imageLinkButton: {
    background: "transparent",
    border: "none",
    color: "#93c5fd",
    cursor: "pointer",
    padding: 0,
    marginBottom: "10px",
    textAlign: "left",
    fontWeight: "600",
    wordBreak: "break-all",
  },

  imageThumb: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #334155",
    cursor: "pointer",
  },

  emptyText: {
    margin: 0,
    color: "#cbd5e1",
  },

  quickActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "12px",
  },

  quickButton: {
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid #334155",
    background: "#1f2937",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  textarea: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    marginTop: "10px",
    marginBottom: "12px",
    boxSizing: "border-box",
    background: "#1f2937",
    color: "white",
    border: "1px solid #334155",
    outline: "none",
    fontSize: "14px",
  },

  chatActions: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "14px",
  },

  askButton: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  answerBox: {
    marginTop: "10px",
    padding: "16px",
    background: "#1f2937",
    borderRadius: "12px",
    whiteSpace: "pre-wrap",
    lineHeight: "1.6",
    minHeight: "70px",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "20px",
  },

  modalContent: {
    background: "#111827",
    borderRadius: "18px",
    padding: "20px",
    maxWidth: "900px",
    width: "100%",
    maxHeight: "90vh",
    overflow: "auto",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
    gap: "12px",
  },

  closeButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "8px 12px",
    cursor: "pointer",
    fontWeight: "700",
  },

  fullImage: {
    width: "100%",
    borderRadius: "12px",
  },
};

export default DashboardPage;