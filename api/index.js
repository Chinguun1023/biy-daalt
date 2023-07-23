const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const categoriesRouter = require("./routes/categories");
const multer = require("multer");
const path = require("path")

dotenv.config();
app.use(express.json());
app.use ("/images",express.static(path.join(__dirname,"/images")))

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload =multer ({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
  res.status(200).json("File has been upload")
})
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoriesRouter);

app.listen(process.env.PORT, () => {
  console.log(`server listen  port ${process.env.PORT}`);
});
