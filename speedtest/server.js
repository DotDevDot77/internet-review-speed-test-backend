const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.raw({ type: "*/*", limit: "200mb" }));

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

app.get("/", (req, res) => {
  res.send("LibreSpeed backend is live");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
