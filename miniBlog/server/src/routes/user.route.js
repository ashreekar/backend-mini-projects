import { Router } from "express";

const userRoute=Router();
userRoute.route('/').get((req,res)=>{
    res.status(200).send("Wlcome to users page")
})

userRoute.route('/view').get((req,res)=>{
    res.status(200).json({
        username:"Your username",
        FullName:"Your fullname",
        articles:"Your article",
    })
})

export {userRoute}