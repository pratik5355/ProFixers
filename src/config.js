const mongoose = require('mongoose');

const uri = 'mongodb+srv://donhemahesh24:Jaw9tvfDKeoQAVmG@user.fzhwvsr.mongodb.net/?retryWrites=true&w=majority&appName=User';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Your database operations go here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
