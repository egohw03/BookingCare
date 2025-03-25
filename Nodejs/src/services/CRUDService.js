import bcrypt from 'bcryptjs';
import db from "../models/index.js";

let createNewUser = async(data) => {
    return new Promise(async(resolve, reject) => {
        try {
            console.log('Received data:', data); // Debug what data we're receiving
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve("ok create user!");
        } catch (error) {
            console.log('Error in createNewUser:', error); // Debug any errors
            reject(error);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let salt = await bcrypt.genSalt(10);
            let hashPassword = await bcrypt.hash(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            });
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    });
}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            });

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.gender = data.gender === '1' ? true : false;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.image = data.image;

                await user.save();
                resolve();
            } else {
                resolve();
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

let deleteUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });

            if (user) {
                await user.destroy();
                resolve();
            } else {
                resolve();
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUser: deleteUser
}