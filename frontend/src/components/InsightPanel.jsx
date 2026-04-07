function InsightPanel({ insights }) {
  if (!insights) {
    return null;
  }

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title}>AI Insights</h2>
        <span style={styles.badge}>{insights.document_type || "Document"}</span>
      </div>

      <div style={styles.summaryBox}>
        <p style={styles.label}>Summary</p>
        <p style={styles.summaryText}>{insights.summary || "No summary available."}</p>
      </div>

      <div style={styles.metaGrid}>
        <div style={styles.metaCard}>
          <p style={styles.metaLabel}>Confidence Score</p>
          <h3 style={styles.metaValue}>
            {insights.confidence_score !== undefined
              ? `${Math.round(insights.confidence_score * 100)}%`
              : "N/A"}
          </h3>
        </div>

        <div style={styles.metaCard}>
          <p style={styles.metaLabel}>Warnings Count</p>
          <h3 style={styles.metaValue}>{insights.warnings?.length || 0}</h3>
        </div>
      </div>

      <div style={styles.section}>
        <p style={styles.label}>Keywords</p>
        <div style={styles.keywordWrap}>
          {insights.keywords?.length ? (
            insights.keywords.map((item, index) => (
              <span key={index} style={styles.keywordChip}>
                {item}
              </span>
            ))
          ) : (
            <p style={styles.emptyText}>No keywords found.</p>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <p style={styles.label}>Warnings</p>
        {insights.warnings?.length ? (
          <ul style={styles.warningList}>
            {insights.warnings.map((item, index) => (
              <li key={index} style={styles.warningItem}>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.emptyText}>No warnings detected.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#111827",
    color: "white",
    padding: "22px",
    borderRadius: "18px",
    marginBottom: "22px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "18px",
  },

  title: {
    margin: 0,
    fontSize: "24px",
  },

  badge: {
    background: "#1d4ed8",
    color: "white",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.4px",
  },

  summaryBox: {
    background: "#1f2937",
    padding: "16px",
    borderRadius: "14px",
    marginBottom: "18px",
  },

  label: {
    margin: 0,
    color: "#93c5fd",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  summaryText: {
    margin: 0,
    lineHeight: "1.7",
    color: "#e5e7eb",
  },

  metaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginBottom: "18px",
  },

  metaCard: {
    background: "#1f2937",
    padding: "16px",
    borderRadius: "14px",
  },

  metaLabel: {
    margin: 0,
    color: "#94a3b8",
    fontSize: "13px",
  },

  metaValue: {
    marginTop: "10px",
    marginBottom: 0,
    fontSize: "28px",
    fontWeight: "700",
  },

  section: {
    marginTop: "16px",
  },

  keywordWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  keywordChip: {
    background: "#1e3a8a",
    color: "white",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "600",
  },

  warningList: {
    margin: 0,
    paddingLeft: "20px",
  },

  warningItem: {
    marginBottom: "8px",
    color: "#fca5a5",
  },

  emptyText: {
    margin: 0,
    color: "#cbd5e1",
  },
};

export default InsightPanel;