// ============
// Imports
// ============
const express = require("express");

const testimonials = require("./routers/testimonials.routes");
const concetrs = require("./routers/concerts.routes");
const seats = require("./routers/seats.routes");
const path = require("path");
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
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/client/build")));
app.use("/api", testimonials);
app.use("/api", concetrs);
app.use("/api", seats);
app.use("/api/*", (req, res) => {
  res.status(404).send({ message: "Error 404, not found" });
});

// ============
// Endpoints
// ============

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// ============
// Start Server
// ============

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port: ${port}`);
});
