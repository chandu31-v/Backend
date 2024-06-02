import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { user } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{

    //get details required for registeration.
    //check if email and username all required fields are present.
    //check if email and username is in database.
    //check for image and check for avatar.
    //upload file and image in cloudinary.
    //create user object and create entry in db
    //remove password and refresh token field
    //check for user creation
    //return response


    const {userName,email,fullName,password} = req.body

    if([userName,email,fullName,password].some((field)=>field.trim()==="")){
        throw new ApiError(400,"All fields are required")
    }

    const existingUser = await user.findOne({
        $or:[{userName},{email}]
    })

    if(existingUser){
        throw new ApiError(400,"User is already present")
    }

    //console.log(req.files)

    const avatarPath = req.files?.avatar[0]?.path
    const imagePath = req.files?.coverImage[0]?.path

    //console.log(avatarPath)

    if(!avatarPath){
        throw new ApiError(400,"avatar file is required")
    }

    const avatarCloudUpload = await uploadOnCloudinary(avatarPath)
    const imageCloudUpload = await uploadOnCloudinary(imagePath)

    //console.log(avatarCloudUpload)

    if(!avatarCloudUpload){
        throw new ApiError(400,"Avatar file required")
    }

    const newUser = await user.create({
        userName,
        fullName,
        email,
        password,
        avatar:avatarCloudUpload.url,
        coverImage:imageCloudUpload?.url || "",
    })

    //check if user was created
    //console.log(newUser)

    // //return response
    res.status(201).json(
        new ApiResponse(200,newUser,"user registered successfully")
    )

})

export {registerUser}
