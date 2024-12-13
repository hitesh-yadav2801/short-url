const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const URL = require("./models/url");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const { connectToMongoDB } = require("./connection");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 3000;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("Connected to MongoDB");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

// app.get("/", async(req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });
// });

// routes
app.use("/url",restrictTo(["user"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
