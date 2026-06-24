import {apiClient} from "./client.js";

export const createOffer = (data) => apiClient.post('/offers', data)
    .then((response) => {
        return response.data.id;
    })
    .catch((e) => {
        throw new Error(e.response?.data ?? "Произошла ошибка при попытке размещения объявления");
    });
export const getOffers = () => apiClient.get('/offers');
export const getOffer = (id) => apiClient.get(`/offers/${id}`);
export const deleteOffer = (id) => apiClient.delete(`/offers/${id}`);