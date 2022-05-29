const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/thoughtful-social_network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}); 

// this is used to log mongo queries to see that they are being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
