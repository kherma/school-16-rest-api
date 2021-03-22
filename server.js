// ============
// Exports
// ============
const express = require("express");
const { dirname } = require("path");
const path = require("path");
const { debugPort } = require("process");

// ============
// DataBase
// ============
const db = [
  { id: 1, author: "John Doe", text: "This company is worth every coin!" },
  {
    id: 2,
    author: "Amanda Doe",
    text: "They really know how to make you happy.",
  },
];

// ID generator
function* idGenerator() {
  let id = db.length + 1;
  while (true) {
    yield id;
    id++;
  }
}

const generator = idGenerator();

// Methods
const findID = (id) => {
  return db.find((item) => item.id === Number(id));
};

const randomID = () => {
  const random = Math.floor(Math.random() * db.length);
  return db[random];
};

const modifyID = (id, author, text) => {
  const index = db.indexOf(db.find((item) => item.id === Number(id)));
  if (index === -1) {
    return { message: `Error, can't find item with id ${id}` };
  }
  if (author && text) {
    db[index].author = author;
    db[index].text = text;
  } else if (author) {
    db[index].author = author;
  } else if (text) {
    db[index].text = text;
  }
  return { message: `Success put` };
};

const deleteID = (id) => {
  const index = db.indexOf(db.find((item) => item.id === Number(id)));
  if (index === -1) {
    return { message: `Error, can't find item with id ${id}` };
  }
  db.splice(-Number(index), 1);
  return { message: `Success delete` };
};

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
// Endpoints
// ============

app.get("/testimonials", (req, res) => {
  res.json(db);
});

app.get("/testimonials/random", (req, res) => {
  res.json(randomID());
});

app.get("/testimonials/:id", (req, res) => {
  res.json(findID(req.params.id));
});

app.post("/testimonials", (req, res) => {
  const { author, text } = req.body;
  if (author && text) {
    db.push({ id: generator.next().value, author: author, text: text });
    res.json({ message: "Success post" });
  } else {
    res.json({ message: "Error, can not push" });
  }
});

app.put("/testimonials/:id", (req, res) => {
  const id = req.params.id;
  const { author, text } = req.body;
  res.json(modifyID(id, author, text));
});

app.delete("/testimonials/:id", (req, res) => {
  const id = req.params.id;
  res.json(deleteID(id));
});

// ============
// Start Server
// ============

app.listen(port, (req, res) => {
  console.log(`Server is running at port ${port}`);
});
