import { Router } from "express";
import {upload} from "../middlewares/multur.middleware.js"
import {registerUser} from "../controller/user.controller.js"

const userRoute=Router();
userRoute.route('/').get((req,res)=>{
    res.status(200).send("Wlcome to users page")
})

userRoute.route('/register').post(upload.single("avatar")
  ,registerUser)

export {userRoute}