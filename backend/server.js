const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

const fs = require("fs");

// Ensure the 'database/' folder exists
const databaseDir = path.resolve(__dirname, "database");
if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir);
}

// Path to the database file
const dbPath = path.resolve(__dirname, "database", "app.db");

// Connect to SQLite database (stored in the 'database/' folder)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to the SQLite database.");

    // Create users table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT
    )`,
      (err) => {
        if (err) {
          console.error("Error creating users table:", err);
        } else {
          console.log("Users table created or already exists.");
        }
      }
    );
  }
});

// Register user route
app.post("/register", (req, res) => {
  const { email, password, role } = req.body;

  db.run(
    "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
    [email, password, role],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error registering user." });
      }
      res.json({ success: true });
    }
  );
});

// Login user route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (err || !row) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
      res.json({ success: true, role: row.role });
    }
  );
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
