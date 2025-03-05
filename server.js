const express = require('express');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const path = require('path');

const app = express();
const port = 3000;

// Create a livereload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch([__dirname + "/public"]);

// Add livereload middleware to express
app.use(connectLivereload());

// Add cache control middleware before static files
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    next();
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Sorry, we could not find that!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});