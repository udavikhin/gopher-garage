import {apiClient} from "./client.js";
import {cleanObject} from "../helpers.js";

export const createOffer = (data) => apiClient.post('/offers', data)
    .then((response) => {
        return response.data.id;
    })
    .catch((e) => {
        throw new Error(e.response?.data ?? "Произошла ошибка при попытке размещения объявления");
    });
export const getOffers = (params = {}) => apiClient.get('/offers', { params: cleanObject(params) });
export const getOffer = (id) => apiClient.get(`/offers/${id}`);
export const deleteOffer = (id) => apiClient.delete(`/offers/${id}`);
export const uploadOfferPhotos = (id, files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('photos', file));
    return apiClient.post(`/offers/${id}/photos`, formData, {
        headers: { 'Content-Type': undefined },
    });
};