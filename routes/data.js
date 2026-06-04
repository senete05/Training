// data.js
const User = require("./user");

async function dataRoute(req, res) {
  if (req.method === "POST" && req.url === "/data") {
    let chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", async () => {
      try {
        const body = Buffer.concat(chunks).toString();
        const json = JSON.parse(body);

        // Save to database
        const user = new User({ name: json.name, email: json.email });
        await user.save();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Saved to DB", user }));
      } catch (err) {
        res.statusCode = 400;
        res.end("Invalid JSON or DB error");
      }
    });
    return true;
  }
  return false;
}

module.exports = dataRoute;
