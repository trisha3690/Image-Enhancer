import axios from "axios";
import { API_KEYS, API_URLS, IMAGE_FORMATS } from "../config/apiKeys";

export const generateImageWithDreamStudio = async (prompt, outputFormat = IMAGE_FORMATS.WEBP) => {
    try {
        console.log("Generating image with prompt:", prompt);
        console.log("Using API URL:", API_URLS.DREAM_STUDIO);
        
        const payload = {
            prompt: prompt,
            output_format: outputFormat
        };

        console.log("Request payload:", payload);

        const response = await axios.postForm(
            API_URLS.DREAM_STUDIO,
            axios.toFormData(payload, new FormData()),
            {
                validateStatus: undefined,
                responseType: "arraybuffer",
                headers: { 
                    Authorization: `Bearer ${API_KEYS.DREAM_STUDIO}`, 
                    Accept: "image/*" 
                },
            }
        );

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (response.status === 200) {
            console.log("Success! Converting response to base64...");
            // Convert arraybuffer to base64 for display
            const base64 = btoa(
                new Uint8Array(response.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            
            const result = {
                image: `data:image/${outputFormat};base64,${base64}`,
                format: outputFormat,
                prompt: prompt
            };
            
            console.log("Generated image result:", result);
            return result;
        } else {
            console.error("API Error - Status:", response.status);
            console.error("API Error - Data:", response.data);
            throw new Error(`${response.status}: ${response.data.toString()}`);
        }
    } catch (error) {
        console.error("Error generating image with Dream Studio:", error);
        console.error("Error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
};

export const generateImageFromPrompt = async (prompt) => {
    return await generateImageWithDreamStudio(prompt);
}; 