const express = require('express');
const app = express();

// Set the port to listen on
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the routes for the app
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});