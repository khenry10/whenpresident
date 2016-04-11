var express = require("express");
var hbs = require("express-handlebars")
var db = require("./db/connection")

var app = express();

app.set("view engine", "hbs");
app.use("/assets", express.static("public"));
app.engine(".hbs", hbs({
  extname: ".hbs",
  partialDir: "views/",
  layoutsDir: "views/",
  defaultLayout: "layout-main"
}));

app.get("/", function(req, res){
  res.render("app-welcome")
});

app.get("/candidates", function(req, res){
  res.render("candidates-index", {
      candidates: db.candidates
  });
});

app.get("/candidates/:name", function(req, res){
  res.render()
})

app.listen(3001, function(){
  console.log("It's aliiiiive")
});
