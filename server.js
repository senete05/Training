require("dotenv").config({ path: "./.env" });
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARE ---

// 1. Custom Logging Middleware (Bonus)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// 2. Built-in JSON Parsing
app.use(express.json());

// 3. Serving Static Files
app.use(express.static(path.join(__dirname, "public")));

// --- ROUTES ---

// GET / -> Manual string response (Note: static middleware usually takes priority at /)
app.get("/api-info", (req, res) => {
  res.send("My Week 2 API!");
});

// POST /user -> Handles {name, email}
app.post("/user", (req, res) => {
  const { name, email } = req.body;

  // Error Handling (400 for missing data)
  if (!name || !email) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide both name and email.",
    });
  }

  res.status(201).send(`Hello, ${name}!`);
});

// GET /user/:id -> Dynamic Route Parameters
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ${userId} profile`);
});

// --- SERVER START ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
