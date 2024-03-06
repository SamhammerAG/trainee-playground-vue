import type { AxiosInstance } from "axios";
import axios from "axios";

import qs from "qs";
import { transformResponse } from "./AxiosTransform";

class Axios {
    public api: AxiosInstance;

    public constructor() {
        this.api = this.createApi(import.meta.env.VITE_API_URL);
    }

    private createApi(baseURL: string): AxiosInstance {
        const client = axios.create();
        client.defaults.baseURL = baseURL;
        client.defaults.transformResponse = transformResponse;
        client.defaults.paramsSerializer = (params) => {
            return qs.stringify(params, { arrayFormat: "repeat" });
        };

        return client;
    }
}

export default new Axios();
