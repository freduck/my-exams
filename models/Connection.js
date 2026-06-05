// Load .env first
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mongoose = require('mongoose');

class Connection {
  constructor() {
    const uri = process.env.NODE_ENV === 'production'
      ? process.env.MONGO_URI
      : process.env.MONGO_URI_LOCAL;

    if (!uri) throw new Error("MongoDB URI is not defined");

    this.conn = mongoose.createConnection(uri);

    this.conn.on('connected', () => console.log("✅ Connected to MongoDB"));
    this.conn.on('error', err => console.error("❌ MongoDB connection error:", err));
  }

  getConnection() {
    return this.conn;
  }
}

module.exports = Connection;