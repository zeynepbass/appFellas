import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:9360" });

export const fetchMemory = async () => await API.get("/post/appfellas");
export const fetchPost = async (post) =>await API.post("/post/appfellas", post);
export const fetchSignin = async (form) => await API.post("/user/signin", form);
export const fetchRegister = async (formData) =>await API.post("/user/register", formData);

