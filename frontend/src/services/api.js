
const API_URL = "http://localhost:5000";

export const checkSymptoms = async(data) => {
  const res = await fetch(`${API_URL}/symptom-checker/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });

  return await res.json();
}