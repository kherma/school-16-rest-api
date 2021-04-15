// ============
// Imports
// ============
const express = require("express");
const socket = require("socket.io");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const testimonials = require("./routers/testimonials.routes");
const concerts = require("./routers/concerts.routes");
const seats = require("./routers/seats.routes");

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
app.use((req, res, next) => {
  req.io = io;
  next();
});
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/client/build")));
app.use("/api", testimonials);
app.use("/api", concerts);
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

// =========================
// BackEnd to DB connection
// =========================

const dbURI =
  process.env.NODE_ENV === "production"
    ? "mongodb+srv://kherma:Codulpentru1@musicfestivaldb.3gvce.mongodb.net/MusicFestivalDB?retryWrites=true&w=majority" // remote db
    : "mongodb://localhost:27017/NewWaveDB"; // local db
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to the database");
});

db.on("error", (err) => {
  console.log(`Error: ${err}`);
});

// ============
// Start Server
// ============

const server = app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port: ${port}`);
});
module.exports = server;

const io = socket(server);

io.on("connection", (socket) => {
  console.log("New socket with id: " + socket.id);
});
