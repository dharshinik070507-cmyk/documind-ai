import { useState } from "react";
import { askDocumentQuestion } from "../api/documentApi";

function ChatPanel({ context }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      const response = await askDocumentQuestion(question, context || "");
      setAnswer(response.answer);
    } catch (erorr) {
      setAnswer("Failed to get response from document chat.");
    }
  };

  return (
    <div style={boxStyle}>
      <h2>Chat with Document</h2>

      <textarea
        rows="4"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about the document"
        style={inputStyle}
      />

      <button onClick={handleAsk} style={buttonStyle}>
        Ask
      </button>

      <div style={answerStyle}>
        {answer || "Answer will appear here"}
      </div>
    </div>
  );
}

const boxStyle = {
  background: "#111827",
  color: "white",
  padding: "20px",
  borderRadius: "16px",
  marginTop: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  marginTop: "10px",
  marginBottom: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

const answerStyle = {
  marginTop: "15px",
  padding: "15px",
  background: "#1f2937",
  borderRadius: "10px",
};

export default ChatPanel;