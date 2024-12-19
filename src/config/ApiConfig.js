import axios from "axios";

const DEPLOYED = "https://ecommerce-backend-server.up.railway.app/"

const LOCALHOST = "http://localhost:5454"

export const API_BASE_URL = DEPLOYED;

// export const API_BASE_URL = "http://localhost:5454"

const token= localStorage.getItem("token");


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`, // Get the token dynamically
        "Content-Type": "application/json" // Set Content-Type to application/json
    }
});

console.log("Api Response ", API_BASE_URL)

export default api;
