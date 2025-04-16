const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Allow cross-origin requests
app.use(cors());

// Handle large payloads for upload
app.use(express.raw({ type: "*/*", limit: "200mb" }));

// Serve frontend files from /speedtest folder
app.use(express.static(path.join(__dirname, "speedtest")));

// Speedtest endpoints
app.get("/garbage", (req, res) => {
  const size = parseInt(req.query.size || "1000000", 10);
  res.set("Content-Type", "application/octet-stream");
  res.send(Buffer.alloc(size, "0"));
});

app.post("/upload", (req, res) => {
  res.send("Upload OK");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

// Serve index.html as homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "speedtest", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
