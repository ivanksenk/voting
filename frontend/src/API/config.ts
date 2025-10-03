import axios from "axios";

export const API_URL = 'http://localhost:4200/api';

export const ideaAxios = axios.create({
    baseURL: API_URL
})