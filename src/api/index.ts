import axios from "axios";
const baseURL = 'https://api.uznews.uz/api/v1';

export const api = axios.create({
    baseURL,
    headers: {

    }
})