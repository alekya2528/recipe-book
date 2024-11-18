const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up the storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});

// Initialize multer for handling file uploads
const upload = multer({ storage: storage });

// Middleware for serving static files
app.use(express.static('public'));
app.use(express.json());

// Serve the HTML page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to handle recipe submissions
let recipes = [];

// Save a new recipe (including the image path)
app.post('/add-recipe', upload.single('image'), (req, res) => {
    const { recipeName, ingredients, steps } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const newRecipe = {
        recipeName,
        ingredients,
        steps,
        imagePath,
    };

    recipes.push(newRecipe);

    res.json({ success: true, recipe: newRecipe });
});

// API endpoint to get all recipes
app.get('/recipes', (req, res) => {
    res.json(recipes);
});

// Serve uploaded images from the "uploads" folder
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
