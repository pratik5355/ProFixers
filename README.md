# ProFixers

ProFixers is a Node.js Express application tailored for home and outdoor services. It features dynamic routing with EJS templates and provides an elegant frontend for customers seeking services like plumbing, electrical work, and general handyman repairs.

## Features
- **Express Backend:** Fast, lightweight Node.js server handling backend workflows.
- **Dynamic Views:** Fully integrated EJS templates for responsive service pages.
- **Secured Authentication:** Integrated user login and registration flow utilizing `bcrypt` for password hashing.
- **Database Architecture:** Built to directly interface with MongoDB for document storage.

## Pre-requisites
- [Node.js](https://nodejs.org/en/) installed on your local machine.
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) URI (or local MongoDB connection string).

## Installation & Usage

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/pratik5355/ProFixers.git
   cd ProFixers
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory and add your MongoDB connection string using the following variable name:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@clusterName...
   ```

4. **Start the Development Server**
   ```bash
   node src/index.js
   ```
   The application will start on `http://localhost:5000/`.

---

*(Note: There is currently a hardcoded bypass for testing the login flow without a functioning database: username `abc@gmail.com` with password `12345678`)*
