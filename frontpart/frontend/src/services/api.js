import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const checkHealth = async () => {
    try {
        const response = await api.get("/");
        return response.data;
    } catch (error) {
        console.error("API Health Check Failed:", error);
        throw error;
    }
};

export const predictImage = async (imageBlob) => {
    const formData = new FormData();
    formData.append("file", imageBlob, "capture.jpg");

    try {
        const response = await api.post("/predict/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Prediction Failed:", error);
        throw error;
    }
};

export default api;
