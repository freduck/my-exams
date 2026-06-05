// connection.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load once

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

// Export a single instance
module.exports = new Connection();
