const fs = require("fs");
const path = require("path");

function movieRoute(req, res) {
  if (req.method === "GET" && req.url === "/movie") {
    const file = path.join(__dirname, "movie.mp4");
    const stat = fs.statSync(file);
    const range = req.headers.range;

    if (!range) {
      res.statusCode = 416;
      return res.end("Range header required");
    }

    const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : stat.size - 1;

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${stat.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    });

    fs.createReadStream(file, { start, end }).pipe(res);
    return true; // handled
  }
  return false; // not handled
}

module.exports = movieRoute;
