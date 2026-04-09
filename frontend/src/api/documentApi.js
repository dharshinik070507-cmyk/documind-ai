console.log("API BASE URL:", API_BASE_URL);
import axios from "axios";

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

const API = axios.create({
  baseURL: API_BASE_URL,
});

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await API.post("/upload/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}

export async function extractDocument(filename) {
  const safeFilename = encodeURIComponent((filename || "").trim());
  const response = await API.get(`/extract/${safeFilename}`);
  return response.data;
}

export async function getInsights(filename) {
  const safeFilename = encodeURIComponent((filename || "").trim());
  const response = await API.get(`/insights/${safeFilename}`);
  return response.data;
}

export async function askDocumentQuestion(question, context) {
  const response = await API.post("/chat/", {
    question: (question || "").trim(),
    context: context || "",
  });

  return response.data;
}

export function getJsonDownloadUrl(filename) {
  const safeFilename = encodeURIComponent((filename || "").trim());
  return `${API_BASE_URL}/extract/download/json/${safeFilename}`;
}

export function getExcelDownloadUrl(filename) {
  const safeFilename = encodeURIComponent((filename || "").trim());
  return `${API_BASE_URL}/extract/download/excel/${safeFilename}`;
}

export function getImageUrl(imageName) {
  const safeImageName = encodeURIComponent((imageName || "").trim());
  return `${API_BASE_URL}/extract/image/${safeImageName}`;
}

export { API_BASE_URL };