// Create a new express server
const express = require("express");
const app = express();
// Define port that app runs on, process.env.PORT is for heroku
const port = process.env.PORT || 5000;
// Import Mongoose
const mongoose = require('mongoose');
// Import body parses, to parse JSON
const bodyParser = require('body-parser');
// Import Mongoose key
const db = require('./config/keys').mongoURI;
// Import routes
const users = require("./routes/api/users");
const acts = require("./routes/api/acts");
const groups = require("./routes/api/groups");
// Import passport
const passport = require('passport');
// Path for heroku
const path = require('path');

// Connect to MongoDB using Mongoose
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));
  
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

// Middleware for body parser
// IMP! Must be above routes
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// In place of hello world
app.use(passport.initialize());
require('./config/passport')(passport);

// Tell Express to use the imported routes
app.use("/api/users", users);
app.use("/api/groups", groups);

app.use('/api/acts', acts);


app.listen(port, () => console.log(`Server is running on port ${port}`));