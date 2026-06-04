const { Transform } = require("stream");

const upper = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

function upperRoute(req, res) {
  if (req.method === "POST" && req.url === "/upper") {
    req.pipe(upper).pipe(res);
    return true; // handled
  }
  return false; // not handled
}

module.exports = upperRoute;
