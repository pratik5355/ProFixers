const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the homepage (optional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve index.html file
});

// You don't need to create a specific route for the about-style-one.html file
// since express.static() will automatically handle it.
app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`);
});
