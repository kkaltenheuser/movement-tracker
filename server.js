// global dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// initiate + set foundation for port 
const PORT = 3000;

const app = express();

// middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set static files to public folder 
app.use(express.static("public"));

// initiate connection to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/columbia-university',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);


// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

// initiate listening on server / port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});