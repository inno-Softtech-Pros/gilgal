// backend/index.js
require("dotenv").config(); // must be the very first line

const express = require("express");
const cors = require("cors");
const sermonRoutes = require("./src/routes/sermonRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: ["http://localhost:5173"] })); // your frontend's port
app.use(express.json());

app.get("/", (req, res) => res.send("Hello, Express is working!"));

app.use("/sermons", sermonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
