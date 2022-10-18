import http from "../common/http-common";

class DeviceService {

    getAll() {
        return http.get("/device");
    }

    get(id) {
        return http.get(`/device/${id}`);
    }

    getByGateway(id) {
        return http.get(`/gateway/${id}/device`);
    }

    create(id, data) {
        return http.post(`/gateway/${id}/device`, data);
    }

    update(gatewayId, id, data) {
        return http.put(`${gatewayId}/device/${id}`, data);
    }

    delete(id) {
        return http.delete(`/device/${id}`);
    }

    deleteAll() {
        return http.delete(`/device`);
    }

    deleteAllByGateway(id) {
        return http.delete(`/gateway/${id}/device`);
    }

}

export default new DeviceService();