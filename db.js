
const mongoose = require('mongoose');
const Notes = require('./models/Notes')
const User = require('./models/User');

// Define the connection URL to your MongoDB database
//local database
// const mongoURI= 'mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1/'

// global database
const mongoURI='mongodb+srv://pintukumar808284:ZyLWuB7bdBrOebml@cluster0.kqbqscz.mongodb.net/inotebook'
// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  }
);
