import axios from "axios";

// Set the backend URL from environment variables
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const ApiService = {
  // Send message to ChatGPT backend endpoint
  async getChatGptResponse(message: string): Promise<string> {
    try {
      const response = await axios.post(`${API_URL}/chat`, { message });
      return response.data.answer; // Return the answer from the response
    } catch (error) {
      console.error("Error communicating with GPT API:", error);
      // Return a fallback response if GPT fails
      return "Fallback response: GPT is currently unavailable.";
    }
  },
};
