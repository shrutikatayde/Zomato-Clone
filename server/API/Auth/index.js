import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Router = express.Router();
import {UserModel} from "../../database/user/index"

/*
Route     /signup
Descip    Signup with email and password
Params    None
Access    Public
Method    POST
*/

Router.post("/signup", async (req, res) => { 
    try {
        const { email, password, fullname, phoneNumber } = req.body.credentials;

        //Check whether email or phone number exists
        const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        if (checkUserByEmail || checkUserByPhone) {
            return res.json({error: "User already exists"})
        }

        //hashing
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        //database 
        await UserModel.create({
            ...req.body.credentials,
            password: hashedPassword
        });

        //JWT Auth Token --> to make transfering data between two parties more secure
        const token = jwt.sign({ user: { fullname, email } }, "ZomatoApp");

        return res.status(200).json({ token });


    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

export default Router;