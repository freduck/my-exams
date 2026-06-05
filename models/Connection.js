// Connection.js
require('dotenv').config();
const mongoose = require('mongoose');

class Connection {
  constructor() {
    const uri = process.env.NODE_ENV === 'production'
      ? process.env.MONGO_URI
      : process.env.MONGO_URI_LOCAL;

    if (!uri) throw new Error("MongoDB URI is not defined");

    // Initialize the connection
    this.conn = mongoose.createConnection(uri);

    this.conn.on('connected', () => console.log("✅ Connected to MongoDB"));
    this.conn.on('error', err => console.error("❌ MongoDB connection error:", err));
  }

  // Helper method to define models on this specific connection
  model(name, schema) {
    return this.conn.model(name, schema);
  }

  // Getter for the underlying connection object if needed directly
  getConnection() {
    return this.conn;
  }
}

module.exports = Connection;
