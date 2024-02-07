import axios from "./axios";

export const registerRequest = (user) => axios.post(`/register`, user);
export const LoginRequest = (user) => axios.post(`/login`, user);
export const verifyTokenRequest = () => axios.get(`/verify`); // verifica  el token  paracuando recarga la pagina o accede a ella  se va pal back a hacer logica auth controllers verify
