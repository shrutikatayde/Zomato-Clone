import { Route } from "express";
import express from "express";

import { RestaurantModel } from "../../database/allModels";

const Router = express.Router();

/*
Route     /
Descip    Get all restaurants detail
Params    None
Access    Public
Method    GET
*/

Router.get("/", async (req, res) => {
    try {
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });
        return res.json({ restaurants });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route     /
Descip    Get particular restaurants details on id
Params    _id
Access    Public
Method    GET
*/

Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findOne(_id);

        if (!restaurant)
            return res.status(404).json({ error: "Restaurant not found" });
        
        return re.json({ restaurant });

     }
    catch (error) {
        return res.status(500).json({ error: error.message });
        
    }
});

/*
Route     /
Descip    Get restaurants details on search
Params    none
Body      searchString
Access    Public
Method    GET
*/

Router.get("/search", async (req, res) => {
    try {
        const { searchString } = req.body;

        const restaurants = await RestaurantModel.find({
            name: { $regex: searchString, $option: "i" }, //regex -->"sssyyyycjjjjjjggggg"
        });
        return res.json({ restaurant });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;