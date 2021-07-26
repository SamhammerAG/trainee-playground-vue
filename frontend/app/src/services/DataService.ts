import http from "@/http-common";

class DataService {
  getAll(): Promise<any> {
    return http.get("").then((result: any) => {
      return result.data;
    });
  }
}

export default new DataService();