const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/thoughtful-social_network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}); 

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
