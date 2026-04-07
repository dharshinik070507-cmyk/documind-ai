function TablePanel({ tables }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title}>Extracted Tables</h2>
        <span style={styles.badge}>{tables?.length || 0} Found</span>
      </div>

      {!tables || tables.length === 0 ? (
        <div style={styles.emptyBox}>
          <p style={styles.emptyText}>No tables found in this document.</p>
        </div>
      ) : (
        tables.map((table, index) => (
          <div key={index} style={styles.tableBlock}>
            <div style={styles.tableHeader}>
              <span style={styles.tableInfo}>Page {table.page}</span>
              <span style={styles.tableInfo}>Table {table.table_index}</span>
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {table.headers?.map((header, i) => (
                      <th key={i} style={styles.th}>
                        {header || "Unknown"}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows?.length ? (
                    table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(row).map((cell, cellIndex) => (
                          <td key={cellIndex} style={styles.td}>
                            {cell || "-"}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={table.headers?.length || 1} style={styles.emptyRow}>
                        No row data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
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

  emptyBox: {
    background: "#1f2937",
    borderRadius: "14px",
    padding: "18px",
  },

  emptyText: {
    margin: 0,
    color: "#cbd5e1",
  },

  tableBlock: {
    marginBottom: "24px",
    background: "#1f2937",
    borderRadius: "14px",
    padding: "16px",
  },

  tableHeader: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "12px",
  },

  tableInfo: {
    background: "#0f172a",
    color: "#93c5fd",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
  },

  tableWrapper: {
    overflowX: "auto",
    borderRadius: "12px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "520px",
    background: "#111827",
  },

  th: {
    background: "#1d4ed8",
    color: "white",
    textAlign: "left",
    padding: "12px",
    fontSize: "14px",
    borderBottom: "1px solid #334155",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #334155",
    color: "#e5e7eb",
    fontSize: "14px",
    verticalAlign: "top",
  },

  emptyRow: {
    padding: "16px",
    textAlign: "center",
    color: "#cbd5e1",
  },
};

export default TablePanel;