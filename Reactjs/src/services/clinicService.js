import axios from '../../axios';

export const createClinic = (data) => {
    return axios.post('/api/clinic', data);
};

export const getAllClinics = () => {
    return axios.get('/api/clinics');
};

export const updateClinic = (id, data) => {
    return axios.put(`/api/clinic/${id}`, data);
};

export const deleteClinic = (id) => {
    return axios.delete(`/api/clinic/${id}`);
};
