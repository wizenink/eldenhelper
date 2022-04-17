function dbConnect(){
  const mongoose = require('mongoose')
  var assert = require('assert')
  const config = require('../config')
  //MongoDB connection data
  const mongoUrl = `mongodb+srv://${config.dbUser}:${config.dbPass}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority&ssl=true`
  mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  
  mongoose.connection.once('open', () => {console.log("Database connected")})
    .on('error',(err) => console.warn("Error connecting to database:",err));
}

module.exports = dbConnect;