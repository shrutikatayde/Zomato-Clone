import express from "express";

import { ReviewModel } from "../../database/allModels";

const Router = express.Router();

/*
Route     /
Des       Add new Review
params    none
Body      Reveiw object
Access    Public
Method    POST
*/

Router.post("/new/", async(req, res) => {
    try{
        const { reviewData } = req.body;
        await ReviewModel.create({ reviewData });

       
        return res.json({ review: "Successfully Created Review" });
        
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/*
Route     /delete
Des       delete a Review
params    _id
Access    Public
Method    POST
*/

Router.delete("/delete/:id", async(req, res) => {
    try{
        const { _id } = req.params;
        await ReviewModel.findByIdAndDelete({ _id });

       
        return res.json({ review: "Successfully Deleted Review" });
        
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;