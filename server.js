// ============
// Exports
// ============
const express = require("express");

// ============
// Setup
// ============
const port = 8000;
const app = express();

// ============
// Start Server
// ============

app.listen(port, (req, res) => {
  console.log(`Server is running at port ${port}`);
});
