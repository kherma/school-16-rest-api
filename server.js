// ============
// Imports
// ============
const express = require("express");

const testimonials = require("./routers/testimonials.routes");
const concetrs = require("./routers/concerts.routes");
const seats = require("./routers/seats.routes");
const cors = require("cors");

// ============
// Setup
// ============
const port = 8000;
const app = express();

// ============
// Middleware
// ============

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ============
// Endpoints
// ============

app.use("/api", testimonials);
app.use("/api", concetrs);
app.use("/api", seats);
app.use((req, res) => {
  res.status(404).send({ message: "Error 404, not found" });
});

// ============
// Start Server
// ============

app.listen(port, (req, res) => {
  console.log(`Server is running at port ${port}`);
});
