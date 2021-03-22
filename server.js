// ============
// Exports
// ============
const express = require("express");
const path = require("path");

// ============
// Setup
// ============
const port = 8000;
const app = express();

// ============
// Middleware
// ============

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ============
// Start Server
// ============

app.listen(port, (req, res) => {
  console.log(`Server is running at port ${port}`);
});
