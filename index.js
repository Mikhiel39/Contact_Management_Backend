const express = require('express');
const route = require("./route");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors
require("dotenv").config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/contact_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open',() => {
    console.log('Connected to MongoDB')});

app.use("/api",cors({
    origin: "*", // Allow all origins
    credentials: true,
  }), route);
// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running`);
});