import axios from "axios";

export const loginUser = async ({username, password}) => {
    try {
        return await axios.post(`${import.meta.env.VITE_API_MSVC_SECURITY_URL}/login`, {
            username,
            password,
        });
    } catch (error) {
        throw error;
    }
}