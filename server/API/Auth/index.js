import express from "express";
import bcrypt from "bcryptjs";

const Router = express.Router();
import { UserModel } from "../../database/user/index"

/*
Route     /signup
Descip    Signup with email and password
Params    None
Access    Public
Method    POST
*/

Router.post("/signup", async (req, res) => {
    try {
        await UserModel.findEmailAndPhone(req.body.credentials);

        // //Check whether email or phone number exists
        // const checkUserByEmail = await UserModel.findOne({ email });
        // const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        // if (checkUserByEmail || checkUserByPhone) {
        //     return res.json({error: "User already exists"})
        // }

        // //hashing and Salting
        // const bcryptSalt = await bcrypt.genSalt(8);
        // const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        //database 
        const newUser = await UserModel.create(req.body.credentials);



        //JWT Auth Token --> to make transfering data between two parties more secure
        const token = newUser.generateJwtToken();

        return res.status(200).json({ token });


    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

export default Router;