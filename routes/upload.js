const fs = require("fs");
const path = require("path");

function uploadRoute(req, res) {
  if (req.method === "POST" && req.url === "/upload") {
    const filepath = path.join(__dirname, "uploaded.bin");
    const fileStream = fs.createWriteStream(filepath);

    req.pipe(fileStream);

    req.on("end", () => {
      res.statusCode = 200;
      res.end("Upload complete");
    });

    req.on("error", () => {
      res.statusCode = 500;
      res.end("Upload failed");
    });

    return true; // handled
  }
  return false; // not handled
}

module.exports = uploadRoute;
