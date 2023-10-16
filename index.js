const express = require("express");
const path = require("path");
const ejs = require("ejs");
const multer = require('multer');

const app = express();
const PORT = 9000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage: storage })

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.render("home");
})

app.post("/upload", upload.single("profileImage"), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    return res.redirect("/");
})

app.listen(PORT, () => {
    console.log("App is running at pot 9000");
})