//env variable
require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//config
import googleAuthConfig from "./database/connection";

//API
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant"
import Food from "./API/Food";
import Menu from "./API/Menu";

///database connection

import ConnectDB from "./database/connection";



const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configuration 
googleAuthConfig(passport);

//For application routes
//localhost:4040/auth/signup
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);

zomato.get("/", (req, res) => res.json({ message: "Setup Success Yay!!" }));

zomato.listen(4000, () =>
    ConnectDB().then(() =>
        console.log("server is up and running"))
        .catch(() => console.log("DB connection failed")));