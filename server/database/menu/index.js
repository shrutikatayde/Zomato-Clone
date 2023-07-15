import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    menus: [
        {
            name: { type: String, required: true },
            itmes: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "Foods"
                }
            ]
        }
    ],
    recommended: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Foods",
            unique: true
        }
    ]
});


export const MenuModel = mongoose.model("Menus", MenuSchema);
