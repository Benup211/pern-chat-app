import { create } from "zustand";
import { IAuthState } from "../interface/IAuthState";
import axios, { AxiosError } from "axios";
import { IErrorResponse } from "../interface/IErrorResponse";
const API_URL = "http://localhost:3000/api";

axios.defaults.withCredentials = true;
export const AuthState = create<IAuthState>((set) => ({
    user: {
        id: "",
        fullName: "",
        gender: "",
        profilePicture: "",
    },
    isCheckingAuth: false,
    isLoading: false,
    error: null,
    message: null,
    isAuthenticated: false,
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null, isAuthenticated: false });
        try {
            const response = await axios.get(`${API_URL}/auth/user`);
            set({
                user: response.data.user,
                isAuthenticated: true,
                error: null,
                isCheckingAuth: false,
                message:response.data.message
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError<IErrorResponse>;
                if (response) {
                    set({
                        error: response.data.errorMessage,
                        isCheckingAuth: false,
                        isAuthenticated:false
                    });
                    throw response.data;
                } else {
                    set({
                        error: "Error Checking Auth",
                        isCheckingAuth: false,
                        isAuthenticated:false
                    });
                }
            } else {
                set({
                    error: "Error Checking Auth",
                    isCheckingAuth: false,
                    isAuthenticated:false
                });
            }
        }
    },
    loginUser: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password,
            });
            set({
                isLoading: false,
                error: null,
                message: response.data.message,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError<IErrorResponse>;
                if (response) {
                    set({
                        error: response.data.errorMessage,
                        isLoading: false,
                    });
                    throw response.data;
                } else {
                    set({
                        error: "Error while Login In",
                        isLoading: false,
                    });
                }
            } else {
                set({
                    error: "Error while Login In",
                    isLoading: false,
                });
            }
        }
    },
}));
