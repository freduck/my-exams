
if(process.env.MODE_ENV !=='production'){
  require('dotenv').config();
}
const mongoose = require('mongoose');

class Connection {
  constructor() {
    const uri = process.env.MODE_ENV === 'production'
  ? process.env.MONGO_URI
  : process.env.MONGO_URI_LOCAL;



    this.conn = mongoose.createConnection(uri);
    this.conn.on('connected', () => console.log("✅ Connected to MongoDB"));
    this.conn.on('error', err => console.error("❌ MongoDB connection error:", err));
  }

  getConnection() {
    return this.conn;
  }
}

module.exports = Connection;
