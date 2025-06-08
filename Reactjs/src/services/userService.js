import axios from 'axios';

// Configure axios with base URL - update this to match your backend server URL
const instance = axios.create({
    baseURL: 'http://localhost:8080'  // Change this to your Node.js server URL and port
});

const handleUserLogin = (email, password) => {
    return instance.post('/api/login', { email, password })
        .then(response => response.data);
}

const getAllUsers = (userId) => {
    return instance.get(`/api/get-all-users?id=${userId}`)
        .then(response => response.data);
}

const createNewUser = (data) => {
    return instance.post('/api/create-new-user', data)
        .then(response => response.data);
}

const deleteUser = (userId) => {
    return instance.delete('/api/delete-user', {
        data: {
            id: userId
        }
    }).then(response => response.data);
}

const updateUserData = (data) => {
    return instance.put('/api/edit-user', data)
        .then(response => response.data);
}

const getAllCodeService = (inputType) => {
    return instance.get(`/api/allcode?type=${inputType}`)
}

export {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUserData,
    getAllCodeService
}