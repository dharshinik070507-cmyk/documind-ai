function FileUpload(props) {
  const { onFileSelect, loading } = props;

  const handleChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.iconCircle}>📄</div>

        <h2 style={styles.title}>
          {loading ? "Uploading Document..." : "Upload Your Document"}
        </h2>

        <p style={styles.subtitle}>
          Select a PDF, JPG, JPEG, or PNG file to begin intelligent document
          extraction and AI analysis.
        </p>

        <label style={styles.uploadButton}>
          {loading ? "Please wait..." : "Choose File"}
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleChange}
            style={{ display: "none" }}
            disabled={loading}
          />
        </label>

        <p style={styles.supportText}>
          Supported formats: PDF, PNG, JPG, JPEG
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

  card: {
    width: "100%",
    maxWidth: "760px",
    background: "linear-gradient(145deg, #0f172a, #111827)",
    border: "1px solid #1e293b",
    borderRadius: "24px",
    padding: "40px 32px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
  },

  iconCircle: {
    width: "74px",
    height: "74px",
    borderRadius: "50%",
    background: "#1d4ed8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px auto",
    fontSize: "32px",
  },

  title: {
    margin: 0,
    fontSize: "30px",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: "14px",
    marginBottom: "28px",
    color: "#94a3b8",
    fontSize: "16px",
    lineHeight: "1.7",
  },

  uploadButton: {
    display: "inline-block",
    background: "#2563eb",
    color: "white",
    padding: "14px 28px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    border: "none",
  },

  supportText: {
    marginTop: "18px",
    marginBottom: 0,
    color: "#cbd5e1",
    fontSize: "14px",
  },
};

export default FileUpload;