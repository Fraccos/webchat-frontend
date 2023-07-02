import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import NotificationService from "./NotificationService";

export const backendURL = "https://localhost:8080/api";
export type methodHTTP = "POST" | "GET" | "PUT" | "DELETE";

const onAxiosError = (error: AxiosError | Error): Promise<AxiosError> => {
    if (axios.isAxiosError(error)) {
        const { message } = error;
        const { method, url } = error.config as AxiosRequestConfig;
        const { statusText, status,data } = error.response as AxiosResponse ?? {};
        if (data.msg !== undefined && data.status === "error") {
            NotificationService.push({
                content: data.msg,
                type: "error",
                insertionDate: new Date()
            })
        }        
    }
    
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    const { method, url } = response.config;
    const { status } = response;  
    return response;
};

axios.interceptors.response.use(onResponse, onAxiosError);

export class cAPIWrapper {
    static req(dst:String, method:methodHTTP, params?:any)  {
        const ax = axios({
            method: method,
            url: backendURL + dst,
            ...params,
            withCredentials: true
        })
        return ax;
    }
    static get(dst:String, params?:any) {
        return this.req(dst, "GET", params);
    }
    static post(dst:String, params?:any) {
        return this.req(dst, "POST", params);
    }
    static del(dst:String, params?:any) {
        return this.req(dst, "DELETE", params);
    }
    static put(dst:String, params?:any) {
        return this.req(dst, "PUT", params);
    }
}