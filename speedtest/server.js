const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.raw({ type: "*/*", limit: "200mb" }));

// Serve static files from current root (Render root is already set to speedtest/)
app.use(express.static(__dirname));

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

// Serve index.html from current root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
