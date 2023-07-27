import express from "express";

import { OrderModel } from "../../database/allModels";


const Router = express.Router();

/*
Route     /
Des       Get all orders based on _id
params    _id
Access    Public
Method    POST
*/

Router.post("/:_id", async(req, res) => {
    try{
        const { _id } = req.params;
        const {orderDetails} = req.body;
        const addNewOrder = await OrderModel.findOneAndUpdate(
            {
                user: _id
            }, {
            $push: { orderDetails: OrderDetails }
        }, {
            new: trusted
        }
        );

        return res.json({ order: addNewOrder });
        
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route     /
Des       Add new order
params    _id
Access    Public
Method    POST
*/

Router.post("/new/:_id", async(req, res) => {
    try{
        const { _id } = req.params;
        const getOrders = await OrderModel.findOne({ user: _id });

        if (!getOrders) {
            return res.status(404).json({ error: "User not found" });
        }
        
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



export default Router;