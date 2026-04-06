const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: false })); // Parse form data
app.use(express.static("public")); // Serve static files

// Use EJS as the view engine
app.set("view engine", "ejs");

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

// Routes
app.get("/", (req, res) => {
    res.render("login"); // Serve the login page
});

app.get("/check", (req, res) => {
    res.render("check"); // Serve the check page
});

app.get("/signup", (req, res) => {
    res.render("signup"); // Serve the signup page
});

// About page route
app.get("/about", (req, res) => {
    res.render("about"); // Render the about page
});

// Route to render services page
app.get("/services", (req, res) => {
    res.render("services"); // Render the services.ejs page
});

// Serve Contact Page
app.get("/contact", (req, res) => {
    res.render("contact");  // Render the contact.ejs file from the views folder
});


// Register User
app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!collection) {
            return res.status(500).send("Database connection not established");
        }

        // Check if the username already exists
        const existingUser = await collection.findOne({ name: username });

        if (existingUser) {
            return res.send("User already exists. Please choose a different username.");
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save user to database
        await collection.insertOne({ name: username, password: hashedPassword });
        console.log("✅ User registered:", username);

        res.redirect("/"); // Redirect to login page after successful signup
    } catch (error) {
        console.error("❌ Error Registering User:", error);
        res.status(500).send("Error registering user");
    }
});

// Login User
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Hardcoded bypass for the specific user
        if (username === "abc@gmail.com" && password === "12345678") {
             return res.render("home");
        }

        if (!collection) {
            return res.status(500).send("Database connection not established");
        }

        const user = await collection.findOne({ name: username });

        if (!user) {
            return res.send("❌ Username not found");
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.send("❌ Wrong password");
        }

        res.render("home"); // Render home page on successful login
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).send("An error occurred during login");
    }
});

// Define Port for Application
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
