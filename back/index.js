const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const redirectRoute=require("./routes/redirect");
const urlRoute=require("./routes/url");

//DB Connection
mongoose.connect("mongodb+srv://dheekshita:dheekshita@cluster0.hte0y.mongodb.net/urlshortener?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true})
  .then(() => {
    console.log("DB CONNECTED");
  });


//Middlewares
app.use(cors());
app.use(express.json());
app.use("/", redirectRoute);
app.use("/api", urlRoute);
//PORT
const port = 5000;

//Starting a Server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});