require('dotenv').config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.API_KEY);

//Routes
app.get("/", function (req, res) {
    newsapi.v2
        .topHeadlines({
            //sources: "bbc-news,the-verge",
            //q: "cricket",
            //category: "business",
            language: "en",
            //country: "us"
            pageSize: 50
        })
        .then((response) => {
            res.render("main", { headlines: response["articles"] });
            //console.log(response);
        });
});

app.get("/search", function (req, res) {
    res.render("formpage");
});

app.post("/results", function (req, res) {
    newsapi.v2
        .topHeadlines({
            //sources: "bbc-news,the-verge",
            //q: "cricket",
            category: req.body.category,
            language: "en",
            q: req.body.personal,
            country: req.body.country,
            pageSize: 50
        })
        .then((response) => {
            res.render("main", { headlines: response["articles"] });
            //console.log(response);
        });
})

app.listen(3000, function () {
    console.log("Server has started");
});
