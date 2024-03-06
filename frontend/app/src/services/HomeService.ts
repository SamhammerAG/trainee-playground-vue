import axios from "@/plugins/Axios";

class HomeService {
    public async get(): Promise<string> {
        const response = await axios.api.get<string>("Home");
        return response.data;
    }
}

export default new HomeService();
