const http = require("http");

// Import routes
const dataRoute = require("./routes/data");
const uploadRoute = require("./routes/upload");
const downloadRoute = require("./routes/download");
const jsonRoute = require("./routes/json");
const upperRoute = require("./routes/upper");
const movieRoute = require("./routes/movie");
const proxyRoute = require("./routes/proxy");

const routes = [
  dataRoute,
  uploadRoute,
  downloadRoute,
  jsonRoute,
  upperRoute,
  movieRoute,
  proxyRoute,
];

const server = http.createServer((req, res) => {
  for (const route of routes) {
    if (route(req, res)) return; // stop if handled
  }
  res.statusCode = 404;
  res.end("Not Found");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
