//libraries

import express from "express";

//Database Model

import { MenuModel , ImageModel} from "../../database/menu";

const Router = express.Router();

/*
Route     /list
Des       Get list of menu of a particular restaurants 
params      _id
Access    Public
Method    GET
*/

Router.get("/list/:_id", async (req, res) => {
    try {
        const { _id } = req_params;
        const menus = await MenuModel.findOne(_id);

        return res.json({ menus });   
    }
    catch (error) {
        return res.status(500).json({error: error.message });
    }
});


/*
Route     /image
Des       Get menu image based on id 
params      _id
Access    Public
Method    GET
*/

Router.get("/image/:_id", async (req, res) => {
    try {
        const { _id } = req_params;
        const menus = await ImageModel.findOne(_id);

        return res.json({ menus });   
    }
    catch (error) {
        return res.status(500).json({error: error.message });
    }
});




export default Router;