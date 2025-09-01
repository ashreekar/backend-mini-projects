import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/APIerror.js";

const verifyJWT=async (req,_,next)=>{
  try {
      const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
  
      if(!token){
          throw new ApiError(400,"Unauthorised request");
      }
  
      const decodedInfo=await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,);
  
      const user=await User.findById(decodedInfo?._id).select("-password -refreshToken");
  
      if(!user){
          throw new ApiError(400,"Invalid acceas token");
      }
  
      req.user=user;
  
      next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid acces token")
  }
};

export {verifyJWT};