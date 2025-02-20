const express = require("express");
const path = require("path");
const ejs = require("ejs");
require("dotenv").config();

const app = express(); // Create an Express app instance
const generateContent = require("./services/ai.service");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the view engine
app.set("view engine", "ejs");

// Home route
app.get("/", (req, res) => {
  res.send("Hello");
});

// Render EJS template
app.get("/ai", (req, res) => {
  res.render("user_form"); // Ensure "views/user_form.ejs" exists
});

// Handle user input
app.post("/user/data", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send("No message received!");
  }

  console.log("Received message:", message);
  global.userMessage = message;

  res.redirect("/ai/res"); // Redirect after processing
});

// AI Response Route  Fix: Await AI response before rendering)
app.get("/ai/res", async (req, res) => {
  const op = await generateContent(); // Wait for AI response
  res.render("output", { op }); // Pass AI response to EJS template
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
