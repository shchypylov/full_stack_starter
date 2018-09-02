const express = require("express")
const path = require("path")
const UserSchema = require("../models/UserSchema");
const Router = express.Router();

Router.route("/").get((req, res) => {
	res.send("Hello, world")
});

module.exports = Router;
