const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: false })); // Parse form data
app.use(express.static("public")); // Serve static files

// MongoDB Connection
const uri = process.env.MONGO_URI || "mongodb+srv://donhemahesh24:Jaw9tvfDKeoQAVmG@user.fzhwvsr.mongodb.net/?retryWrites=true&w=majority&appName=User";
const client = new MongoClient(uri);

let collection;
async function connectDB() {
    try {
        await client.connect();
        const db = client.db("UserDB"); // Change "UserDB" to your actual database name
        collection = db.collection("users"); // Ensure "users" collection exists
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
}
connectDB();

// API Routes

// Register User
app.post("/api/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!collection) {
            return res.status(500).json({ error: "Database connection not established" });
        }

        // Check if the username already exists
        const existingUser = await collection.findOne({ name: username });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists. Please choose a different username." });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save user to database
        await collection.insertOne({ name: username, password: hashedPassword });
        console.log("✅ User registered:", username);

        res.json({ success: true, message: "User registered successfully!" });
    } catch (error) {
        console.error("❌ Error Registering User:", error);
        res.status(500).json({ error: "Error registering user" });
    }
});

// Login User
app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Hardcoded bypass for the specific user
        if (username === "abc@gmail.com" && password === "12345678") {
             return res.json({ success: true, message: "Logged in successfully", user: "abc@gmail.com" });
        }

        if (!collection) {
            return res.status(500).json({ error: "Database connection not established" });
        }

        const user = await collection.findOne({ name: username });

        if (!user) {
            return res.status(401).json({ error: "❌ Username not found" });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "❌ Wrong password" });
        }

        res.json({ success: true, message: "Logged in successfully", user: user.name });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ error: "An error occurred during login" });
    }
});

// Define Port for Application
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀 API Server running on http://localhost:${port}`);
});
