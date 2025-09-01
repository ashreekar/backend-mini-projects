import {User} from "../models/user.model.js";
import {asyncHandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/APIerror.js"
import {APIResponse} from "../utils/APIresponse.js"
import cookies from "cookie-parser"
import {uploadOncloudinary,deleteCloudinary} from "../utils/cloudinary.js"


const registerUser=asyncHandler(async (req,res,next)=>{
    console.log(req.body)
    const {username,email,fullName,password}=req.body;

    if([username, email, fullName, password].some((val)=>val?.trim()==="")){
        throw new ApiError(404,"All fields required");
    }

    const existedUser = await User.findOne({
        // operator
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(404,"User already exists");
    }

    const avaterLocalPath = req.file?.path;

    if (!avaterLocalPath) {
        throw new ApiError(400, "Avtar file is required");
    }

    const avatarURI=await uploadOncloudinary(avaterLocalPath);

       if (!avatarURI) {
        throw new ApiError(400, "Avtar file is required");
    }
    //create user in db
    const user=await User.create({
        fullName,
        avatar: avatarURI.url,
        email,
        password,
        username: username.toLowerCase(),
    })
    const cretdUser=await User.findById(user?._id).select(
        "-password -refreshtocken"
    );

       if (!cretdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    res.status(200).json(
        new APIResponse(200,cretdUser,"User creted sucessfully")
    )
})

export {registerUser}