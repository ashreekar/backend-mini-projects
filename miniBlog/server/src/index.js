import { app } from "./app.js";
import dotenv from "dotenv";
import {connectDb} from "./db/index.js";

dotenv.config({
    path: "./.env"
})

connectDb()
    .then(() => {
        app.listen(process.env.PORT || 3002, () => {
            console.log(`🌐 Server started on http://localhost:${process.env.PORT}`);
            console.log(`⚡ Listening on port ${process.env.PORT}...`);
            console.log("✅ Ready to accept requests!");
        });
    })
    .catch((err) => {
        console.log("❌ Database connection failed: \"db/index.js\" \n", err);
    })
