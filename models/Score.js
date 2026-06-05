// Connection.js
require('dotenv').config();
const mongoose = require('mongoose');

class Connection {
  constructor() {
    // Prevent multiple initializations
    if (Connection.instance) {
      return Connection.instance;
    }

    const uri = process.env.NODE_ENV === 'production'
      ? process.env.MONGO_URI
      : process.env.MONGO_URI_LOCAL;

    if (!uri) throw new Error("MongoDB URI is not defined");

    this.conn = mongoose.createConnection(uri);

    this.conn.on('connected', () => console.log("✅ Connected to MongoDB"));
    this.conn.on('error', err => console.error("❌ MongoDB connection error:", err));

    // Cache the instance
    Connection.instance = this;
  }

  model(name, schema) {
    return this.conn.model(name, schema);
  }
}

// Export a single instance of the class
module.exports = new Connection();
