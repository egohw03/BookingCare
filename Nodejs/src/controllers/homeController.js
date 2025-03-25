import db from "../models/index.js";
import CRUDService from "../services/CRUDService.js";

let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}

let getAboutPage = (req, res) => {
    return res.render("test/about.ejs");
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
}

let postCRUD = async(req, res) => {
    try {
        console.log("Request body:", req.body); // Log the request body for debugging
        let message = await CRUDService.createNewUser(req.body);
        console.log(message);
        return res.send("User created successfully!");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error creating user!");
    }
}

let displayGetCRUD = async(req, res) => {
    try {
        let data = await CRUDService.getAllUser();
        return res.render("display-crud.ejs", { dataTable: data });
    } catch (error) {
        console.log(error);
    }
}

let getEditCRUD = async(req, res) => {
    try {
        let userId = req.query.id;
        if (userId) {
            let userData = await CRUDService.getUserInfoById(userId);

            return res.render("edit-crud.ejs", {
                user: userData,
            });
        } else {
            return res.send("User not found!");
        }
    } catch (error) {
        console.log(error);
    }
}

let putCRUD = async(req, res) => {
    try {
        await CRUDService.updateUserData(req.body);
        return res.redirect('/get-crud');
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error updating user!");
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD
}