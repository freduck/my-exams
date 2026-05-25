const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
// const { GridFsStorage } = require('multer-gridfs-storage');
// const { GridFsStorage } = require('multer-gridfs-storage').default;
const GridFsStorage = require('multer-gridfs-storage');


const Grid = require('gridfs-stream');
const app = express();

// Mongo URI
const mongoURI = 'mongodb://localhost:27017/delambo';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Set the collection name

  const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    if (!file) {
      return Promise.reject('No file');
    }
    return {
      filename: file.originalname,
      bucketName: 'uploads'
    };
  }
});

  const upload = multer({ storage });

  app.get('/upload', function(req, res){
    res.sendFile(__dirname + '/views/upload.html')
  })

  app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ file: req.file });
});


  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});