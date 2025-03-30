import axios from '../axios';

const userService = {
    handleUserLogin(email, password) {
        return axios.post('/api/login', { email, password });
    },

};

export default userService;