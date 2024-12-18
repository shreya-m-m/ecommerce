import axios from "axios";


export const API_BASE_URL = "https://ecommerce-backend-server.up.railway.app"

// export const API_BASE_URL = "http://localhost:5454"

const token= localStorage.getItem("token");


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`, // Get the token dynamically
        "Content-Type": "application/json" // Set Content-Type to application/json
    }
});

console.log("Api Response ", api.baseURL)

export default api;
