import http from "node:http";

const port: number = 3000;

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");

  if (request.method === "GET") {
    if (request.url === "/") {
      response.statusCode = 200;
      response.end(JSON.stringify({ message: "Welcome to the server" }));
    } else if (request.url === "/about") {
      response.statusCode = 200;
      response.end(JSON.stringify({ message: "This is the about route" }));
    } else {
      response.statusCode = 404;
      response.end(JSON.stringify({ error: "Route not found" }));
    }
  } else {
    response.statusCode = 405;
    response.end(JSON.stringify({ error: "Method not allowed" }));
  }
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
