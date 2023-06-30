import axios from "axios";

export const backendURL = "https://localhost:8080/api";
export type methodHTTP = "POST" | "GET" | "PUT" | "DELETE";
export class cAPIWrapper {
    static req(dst:String, method:methodHTTP, params?:any)  {
        return axios({
            method: method,
            url: backendURL + dst,
            ...params,
            withCredentials: true
        });
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