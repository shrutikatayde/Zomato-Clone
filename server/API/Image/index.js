//Libraries

import express from "express";
import AWS from "aws-sdk"; //js object for aceessing AWS service
import multer from "multer"; //for uploading file

//Database model
import { ImageModel } from "../../database/allModels";

//Utilitise
import  {s3Upload} from "../../Utils/AWS/s3"; 

const Router = express.Router();

//Multer config
const storage = multer.memoryStorage(); // first upload ram of our server 
const upload = multer({ storage }); //then upload it to the aws


/*
Route     /
Des       Uploading given image to s3 bucket , and then saving the file to mongoDB
params      None
Access    Public
Method    POST
*/

Router.post("/", upload.single("file"), async(req, res) => {
    try {
        const file = req.file;

        //S3 bucket options
        const bucketOptions = {
            Bucket: "zomato-clone-bucket",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read",//acces control list-->>ACL

        };
        

        const uploadImage = await s3Upload(bucketOptions);


        
    }
    catch (error) {
        return res.status(500).json({ error: error.message });

    }
});

export default Router;