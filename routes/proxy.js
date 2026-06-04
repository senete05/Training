const http = require("http");

function proxyRoute(req, res) {
  if (req.url.startsWith("/proxy")) {
    const proxyReq = http.request(
      {
        hostname: "example.com", // target server
        port: 80,
        path: req.url.replace("/proxy", ""), // forward path
        method: req.method,
        headers: req.headers,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
      },
    );

    req.pipe(proxyReq);

    proxyReq.on("error", () => {
      res.statusCode = 500;
      res.end("Proxy error");
    });

    return true; // handled
  }
  return false; // not handled
}

module.exports = proxyRoute;
