const express = require('express');
const cors = require('cors');
const path = require('path');
require("dotenv").config();

const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/userRoute");
const PhotoRouter = require("./routes/photoRoute");
const AuthRouter = require("./routes/authRoute");
const PhotoUploadRouter = require("./routes/uploadRoute");
const app = express();
const PORT = process.env.PORT || 8080;

// Connect MongoDB
dbConnect();

// Middlewares
app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());

// Static file serving - ĐẢM BẢO truy cập ảnh qua http://localhost:8080/images/filename.jpg
app.use("/images", express.static(path.join(__dirname, "images")));


// Route Mounting - versioned under /api
app.use("/admin", AuthRouter);
app.use("/user", UserRouter);
app.use("/photo", PhotoRouter);
app.use("/photos", PhotoUploadRouter)
// Base test route
app.get("/", (req, res) => {
    res.send({ message: "Hello from photo-sharing app API!" });
});

// Server start
app.listen(PORT, () => {
    console.log(`✅ Server listening at http://localhost:${PORT}`);
});
