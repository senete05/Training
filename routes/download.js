const http = require("http");
const fs = require("fs");
const path = require("path");

module.exports = function (req, res) {
  if (req.method !== "GET" || req.url !== "/video") {
    const filepath = path.join(__dirname, "video.mp4");

    const stream = fs.createReadStream(filepath);

    res.writeHead(200, {
      "Content-Type": "video/mp4",
    });

    stream.pipe(res);

    stream.on("error", () => {
      res.statusCode = 500;
      res.end("File error");
    });
    return true;
  }
  return false;
};
