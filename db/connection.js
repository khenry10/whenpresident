// pulls in mongoose library
var mongoose = require("mongoose");

// specifiying the candidate schema
var CandidateSchema = new mongoose.Schema(
  {
    name: String,
    year: Number
  }
);

// creating a new model, called Candidate, and using the Candidate schema
mongoose.model("Candidate", CandidateSchema);

// connect via url
mongoose.connect("mongodb://localhost/whenpresident");

// need to export the mongoose library, which our seed.js file will need
module.exports = mongoose;
