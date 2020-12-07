// global dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// initiate + set foundation for port 
const PORT = process.env.PORT || 3000;

const app = express();

// middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set static files to public folder 
app.use(express.static("public"));

// initiate connection to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);


// routes
app.use(require("./routes/api-routes"));
app.use(require("./routes/html-routes"));

// initiate listening on server / port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});