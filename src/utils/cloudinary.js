import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs"

cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRETKEY}`
});

//upload a file
const uploadOnCloudinary = async(filepath)=>{
    try{
        const uploadResponse = await cloudinary.uploader.upload(
            filepath,
            { resource_type:"auto" }
        )
        console.log(response)
    }catch(err){
        fs.unlink(filepath) //remove file uploaded to temp file
        console.log(err)
    }
}
