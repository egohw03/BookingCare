import express from 'express';
import * as homeController from '../controllers/homeController';
import * as userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) => {
    // Home routes
    router.get('/', homeController.getHomePage);

    // API routes
    router.post('/api/login', userController.handleLogin);

    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    return app.use("/", router);
}

export default initWebRoutes;