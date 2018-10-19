const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const { mongo } = require("./db");
const Router = require("./routes/Router");

const PORT = process.env.PORT || 8080;
const db = process.env.MONGOLAB_URI || mongo;
const buildPath = path.join(__dirname, "../dist");

mongoose.connect(db).then(() => {
	console.log("--- mongo is up right here: ", db);
}, err => {
	console.log("--- db error at", err);
});

const app = express();
app.use(cors({
	origin: "http://localhost:3000",
	credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", Router);
app.use(express.static(buildPath));

app.listen(PORT, () => console.log('Listening on port 8080!'));
