function parseJson(req) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      try {
        const body = Buffer.concat(chunks).toString();
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

async function jsonRoute(req, res) {
  if (req.method === "POST" && req.url === "/json") {
    try {
      const data = await parseJson(req);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ received: data }));
    } catch {
      res.statusCode = 400;
      res.end("Invalid JSON");
    }
    return true; // handled
  }
  return false; // not handled
}

module.exports = jsonRoute;
