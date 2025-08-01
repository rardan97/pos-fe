import { REST_API_BASE_URL_AUTH } from "@/config";
import type { SignInReq, SignInRes } from "@/interface/SignIn.interface";
import axios from "axios";

export const api = axios.create({
    baseURL: REST_API_BASE_URL_AUTH,
    withCredentials: true
});

export async function signInAuth(data: SignInReq): Promise<{ data: SignInRes | null }> {
    console.log("login hit api");
    try{
        const response = await axios.post<SignInRes>(`${REST_API_BASE_URL_AUTH}/signin`, data);
        console.log(response);
        return { data: response.data };
    }catch (error){
        console.error("Login failed:", error);
        return { data: null };
    }
}