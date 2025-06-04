const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.raw({ type: "*/*", limit: "200mb" }));

// Serve frontend from the speedtest folder
app.use(express.static(path.join(__dirname, "speedtest")));

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

// ✅ This MUST now point to /speedtest/index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "speedtest", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
