import { userRoute } from "./routes/user.route.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // to accease and crud cookines from user browser
import { ApiError } from "./utils/Apierror.js";

const app = express();

// now configure cookie and cors
// app.use() for middlewares configuration

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
));
// limits the get file size by express by default
app.use(express.json({
    limit: "16kb"
}));
// this helps to parse url like spaces and all which is endcided as %20
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));
// to store assest
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
));

app.get('/',(req,res)=>{
    console.log("Recieved a request")
    return res.status(200).json({
        response:"OK",
        by:"MINIBLIG BACKEND",
        message:"Thank you"
    })
})

app.use('/user',userRoute)





app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined
        });
    }

    // fallback for unhandled errors
    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
});

export {app}