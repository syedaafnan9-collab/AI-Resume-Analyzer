// const API_BASE_URL = "http://localhost:5000/api/resumes";
const API_BASE_URL =
  "https://ai-resume-analyzer-backend-4v1x.onrender.com/api/resumes";
export const analyzeResume = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      body: formData,
    });

    const result = await response.text();

    console.log("Status:", response.status);
    console.log("Response URL:", response.url);
    console.log("Response content:", result);

    if (!response.ok) {
      throw new Error(`Server error ${response.status}: ${result}`);
    }

    return JSON.parse(result);
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default analyzeResume;
