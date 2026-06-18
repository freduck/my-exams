const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Product = require('./models/Product'); 
// Ensure this path is correct

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// VIRTUAL PATH: This maps the URL '/uploads' to the physical folder 'public'

app.use('/uploads', express.static(path.join(__dirname, 'public')));

// --- 2. STORAGE CONFIGURATION ---

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      
        cb(null, 'public/'); 
    },
    filename: (req, file, cb) => {
        // Unique name: 1712345678.jpg
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// --- 3. HTML ROUTES ---

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/add-product', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/add-product.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/view-image.html'));
});

// --- 4. API ROUTES ---

// POST: Add Product
app.post('/add-product', upload.single('image'), async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
          
            image: req.file ? req.file.filename : null 
        };

        await Product.create(data);
        const products = await Product.find({});
        res.json({ "products": products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/delete-product',async (req,resp)=>{
console.log(req.id);
let id = req.id;
console.log(req.body);
const deletep = await Product.findByIdAndDelete({_id:req.body.id});
if(deletep){
  resp.json({"response":"Data Deleted"});
}
});

// GET: Fetch all products (for your frontend JS)
app.get('/api/all-products', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});



// --- 5. SERVER START ---
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server live at http://localhost:${PORT}`);
});
