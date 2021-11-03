import axios from "axios";
const baseURL = 'https://djomi.uz/api/v1';

export const api = axios.create({
    baseURL,
    headers: {

    }
})