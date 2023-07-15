const mongoose = require("mongoose")

async function connectDataBase(){
    const dbUrl = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.3kfd2uo.mongodb.net/book-ticket`

  try {
      await mongoose.connect(dbUrl);
      console.log("database connection successful");
  }catch(err) {
      console.error("Error in database connection",err.message);
      throw err
  }
}

module.exports = connectDataBase

