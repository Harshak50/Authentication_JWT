const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoute = require("./Routes/authRoutes");
const cors = require("cors");
app.use(express.json(), cors()); 
const dotenv = require("dotenv");
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

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("Server running up and healthy");
});
