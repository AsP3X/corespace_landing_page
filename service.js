const express = require('express');
const crypto = require('crypto');
const app = express();

// Loading custom modules
const Logger = require('./assets/utils/logger');

// Create the logger
const logger = new Logger("webserver");

logger.log("Booting up microservice...");

// Set the port to listen on
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

const DIDcache = [];

// log every access to the site
app.use((req, res, next) => {

  const headers = req.headers;
  const deviceId = crypto.createHash('sha256').update(JSON.stringify(headers)).digest('hex');
  
  logger.log(`Request received with id: ${deviceId}`);
  if (DIDcache.includes(deviceId)) { logger.log(`${deviceId} is already cached`) }

  DIDcache.push(deviceId);
  next();
});

// Set the routes for the app
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});