const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoute = require("./Routes/authRoutes");
const apiRoute = require("./Routes/apiRoutes");
const cors = require("cors");
app.use(express.json(), cors()); 
const dotenv = require("dotenv");
const schedule = require("node-schedule");
const user = require("./Models/User");
const api = require("./Models/api");
dotenv.config();


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const con = mongoose.connection;
try {
  con.once("open", () => {
    console.log("Connected to Database Successfully");
  });
} catch (error) {
  console.log("Error while connecting to db: " + error);
}


app.use("/users",authRoute);
app.use("/apis",apiRoute)

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("Server is  running up and healthy");
});


// Cron automatically Delete user data if not verified in 10min of account creation


// schedule.scheduleJob('*/1 * * * *', function(){
// console.log('Started Scheduling job erasing users')
// const eraseDate = new Date(+new Date() - 10 * 60 * 1000); ``
// console.log("Erasing users before: "+eraseDate)
// console.log("Current date: "+new Date);
// user.deleteMany({isActive:false, createdAt: {$lte:eraseDate}}, (err)=>{
//   if (err) return console.log("Error while erasing users " + err);
//   console.log("Erased Unverified Users");
// });
// });
