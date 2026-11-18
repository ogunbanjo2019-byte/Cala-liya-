const http = require("node:http" );
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname);
const port = Number(process.env.PORT || 3000);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const server = http.createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost" ).pathname);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  const requestedFile = path.resolve(root, `.${pathname}`);
  if (requestedFile !== root && !requestedFile.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  let file = requestedFile;
  try {
    if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  } catch {
    file = path.join(root, "index.html");
  }

  fs.stat(file, (error, stats) => {
    if (error || !stats.isFile()) file = path.join(root, "index.html");
    fs.stat(file, (fallbackError, fallbackStats) => {
      if (fallbackError || !fallbackStats.isFile()) {
        response.writeHead(404).end("Not found");
        return;
      }
      const type = contentTypes[path.extname(file).toLowerCase()] || "application/octet-stream";
      response.writeHead(200, {
        "Content-Type": type,
        "Content-Length": fallbackStats.size,
        "Cache-Control": "no-store",
      });
      if (request.method === "HEAD") response.end();
      else fs.createReadStream(file).pipe(response);
    });
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Cala Laiya draft listening on 0.0.0.0:${port}`);
});