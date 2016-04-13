var express  = require("express");
var parser   = require("body-parser");
var hbs      = require("express-handlebars");
var mongoose = require("./db/connection");

var app      = express();

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
// boilerplate:: this is the syntax that body parser documenation requires
app.use(parser.urlencoded({extended: true}))

// need to pull the model out of the model respository
var Candidate = mongoose.model("Candidate");

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
    // this is an asychnrous call, so we need to get ALL the candidates and THEN render the view
    Candidate.find({}).then(function(returned_candidates){
      res.render("candidates-index", {
        candidates: returned_candidates
      })
    })
});

app.get("/candidates/:name", function(req, res){
  // mongoose query where we search for 1 document where the name parameter matches the name in the URL via params.  Since this is asychnrous, we need a then method to pass the mongoose document to the candidate show view -- which then parses and dispalys
  Candidate.findOne({name: req.params.name}).then(function(candidate){
    res.render("candidates-show", {
      candidate: candidate
    });
  });
});

app.post("/candidates", function(req, res){
  // mongoose command to create a new document in the candidate colleciton based off of the params from the form.  SInce it's an asychnrous call we need to use '.then' and then redirect back to /candidates page
  Candidate.create(req.body.candidate).then(function(){
    res.redirect("/candidates")
  });
});

app.post("/candidates/:name", function(req, res){
  name = req.params.name
  Candidate.findOneAndUpdate({name: req.params.name}, req.body.candidate, {new: true}).then(function(candidate){
    res.redirect("/candidates/" + candidate.name)
  });
});

app.post("/candidates/:name/destroy", function(req, res){
  Candidate.findOneAndRemove({name: req.params.name}).then(function(){
    res.redirect("/candidates")
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
