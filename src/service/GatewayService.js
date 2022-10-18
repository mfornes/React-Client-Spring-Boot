import http from "../common/http-common";

class GatewayService {
    getAll() {
        return http.get("/gateway");
    }

    get(id) {
        return http.get(`/gateway/${id}`);
    }

    create(data) {
        return http.post("/gateway", data);
    }

    update(id, data) {
        return http.put(`/gateway/${id}`, data);
    }

    delete(id) {
        return http.delete(`/gateway/${id}`);
    }

    deleteAll() {
        return http.delete(`/gateway`);
    }

}

export default new GatewayService();
