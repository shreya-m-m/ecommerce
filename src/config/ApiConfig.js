import axios from "axios";

const DEPLOYED = "https://ecommerce-backend-server.up.railway.app"

const LOCALHOST = "http://localhost:5454"

export const API_BASE_URL = DEPLOYED;

const token= localStorage.getItem("token");


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json" 
    }
});

console.log("Api Response ", API_BASE_URL)

export default api;
