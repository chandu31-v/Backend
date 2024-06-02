import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//user schema
const userSchema = new mongoose.Schema({
    // Id:{
    //     type:String,
    //     required:true,
    //     unique:true,
    //     trim:true,
    //     index:true // index is used for searching
    // },
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true // index is used for searching
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"video"
    },
    avatar:{
        type:String,
        required:true,
        trim:true
    },
    coverImage:{
        type:String, //image will be stored on server and url in db
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
        //required:true,
        trim:true
    }

},{timestamps:true})

//encrypting password
//using mongoose middleware "pre" to execute before a the action
userSchema.pre("save",async function(next){
    //execute only when password is changed or password is 1st created
    if(!this.isModified("password"))
        return next()
    this.password = await bcrypt.hash(this.password,8)
    next()
})

//decrypting password and checking
//we'll create custom mongoose method
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

//generate jwt using secret key
userSchema.methods.generateAccessToken = async function(){
    jwt.sign({
        _id:this._id,
        email:this.email,
        userName:this.userName,
        fullName:this.fullName
    }),
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
}

userSchema.methods.generateRefreshToken = async function(){}

export const user = mongoose.model("user",userSchema)
