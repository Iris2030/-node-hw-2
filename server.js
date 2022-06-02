const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()


const {PORT = 3000,DB_URL} = process.env 

mongoose.connect(DB_URL).then(()=>{
  console.log("Database connection successful");
  app.listen(PORT);
}).then(()=>{
  console.log(`Server running. Use our API on port: ${PORT}`);
}).catch((error)=>{
console.log(error);
process.exit(1)
});