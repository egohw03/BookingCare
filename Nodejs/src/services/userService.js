import db from '../models/index';
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";

                        // Since we're using raw: true, user is already a plain object
                        // So we remove the .get() method call
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong email or password!";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "Wrong email or password!";
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Wrong email or password!";
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            });
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            if (userId === 'ALL') {
                let users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    raw: true
                });

                userData.errCode = 0;
                userData.errMessage = "OK";
                userData.users = users;
            } else if (userId) {
                let user = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                    raw: true
                });

                if (user) {
                    userData.errCode = 0;
                    userData.errMessage = "OK";
                    userData.users = user;
                } else {
                    userData.errCode = 1;
                    userData.errMessage = 'User not found';
                    userData.users = {};
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = 'Missing required parameter';
                userData.users = {};
            }

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email exists
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in use. Please try another email!'
                })
            } else {
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
                    positionId: data.positionId,
                    image: data.image
                })

                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                if (data.image) {
                    user.image = data.image;
                }

                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update user succeeded!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'The user does not exist'
                })
            }

            await db.User.destroy({
                where: { id: userId }
            })

            resolve({
                errCode: 0,
                message: 'The user has been deleted'
            })
        } catch (e) {
            reject(e);
        }
    })
}

export {
    handleUserLogin,
    checkUserEmail,
    getAllUsers,
    createNewUser,
    updateUserData,
    deleteUser
}