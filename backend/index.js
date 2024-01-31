import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
// import Users from "./models/UserModel.js";
// import Booking_ruangan from "./models/Booking_ruangan.js";
// import Driver from "./models/driver.js";
// import Booking_Driver from "./models/Booking_driver.js";
// import Ruangan from "./models/ruangan.js";


dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('DAH KONEK YGY');
    // await db.sync;
    // await Users.sync();
    // await Booking_ruangan.sync();
    // await Driver.sync();
    // await Booking_Driver.sync();
    // await Ruangan.sync();
    
} catch (error) {
    console.error(error);
}

app.use(cors());
app.use(cookieParser());
app.use(express.json({limit: '50mb'}));
app.use(express.static("public"));
app.use(router);

app.listen(8000, ()=> console.log('SERVERNYA UDAH JALAN DI PORT 8000'));