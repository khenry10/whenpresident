// we are exporting mongoose from the connection.js file, which we need here
var mongoose = require("./connection");
var seedData = require("./seeds.json");

// the model gets created in connection.js, which we store in the variable "Candidate"
var Candidate = mongoose.model("Candidate");

// need to run node "db/seed.js" in the terminal so we add a console log to get some type of feedback that the file is actually running
console.log("Seeding db...")

// similar to rails, when we seed our database we want to delete all the records first so we don't have duplicate data.  Then we insert our seedfile and exit the process with the 2nd callback function
Candidate.remove({}).then(function(){
  Candidate.collection.insert(seedData).then(function(){
    process.exit(); //this exits once the data is imported
  })
});
