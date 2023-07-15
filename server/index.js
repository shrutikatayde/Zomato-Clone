import express from "express";

const zomato = express();

zomato.get("/", (req, res) => res.json({message: "Setup Success Yay!!"}));

zomato.listen(4000, () => console.log("server is up and running"));