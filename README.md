
# Comparison of Node.js Core Modules: `http`, `http2`, and `https`

## 1. Purpose of Each Module

| Module   | Purpose                                                                                  |
|----------|------------------------------------------------------------------------------------------|
| **http** | Implements the HTTP/1.1 protocol to create HTTP servers and clients (unsecured).         |
| **http2**| Implements the newer HTTP/2 protocol offering improved performance and features.          |
| **https**| Extends the `http` module to support HTTP over TLS/SSL (HTTPS), providing secure HTTP/1.1.|

---

## 2. Key Technical Differences: HTTP/1.1 vs HTTP/2

| Feature                  | HTTP/1.1 (used by `http`/`https`)                | HTTP/2 (used by `http2`)                          |
|--------------------------|--------------------------------------------------|--------------------------------------------------|
| **Protocol Version**     | Text-based                                        | Binary protocol                                   |
| **Multiplexing**         | One request per TCP connection at a time         | Multiple requests/responses multiplexed over one connection |
| **Header Compression**   | No (headers sent as plain text, redundant)        | HPACK compression reduces overhead               |
| **Server Push**          | Not supported                                     | Supported (server can preemptively send resources)|
| **Connection Management**| Multiple TCP connections needed                   | Single persistent TCP connection                   |
| **Performance**          | Slower due to head-of-line blocking               | Faster with reduced latency and better resource utilization |

---

## 3. When to Use Each Module in Real-World Applications

| Module   | Use Cases                                                                                                  |
|----------|------------------------------------------------------------------------------------------------------------|
| **http** | Simple HTTP/1.1 web servers, REST APIs, or legacy systems where HTTP/2 is not required or supported.         |
| **https**| When you need secure HTTP/1.1 communication (TLS/SSL) for encrypting data over the network (e.g., web apps handling sensitive data).|
| **http2**| For modern web apps or APIs where performance matters—leveraging multiplexing, server push, and header compression; recommended for HTTP/2 capable clients and servers, often with TLS enabled.|

---

### Additional Notes

- The `http2` module supports both **secure** (via TLS) and **insecure** modes, but browsers require HTTP/2 over TLS, so secure usage is typical.
- The `https` module is essentially the secure variant of `http` for HTTP/1.1.
- For backward compatibility, `http` and `https` are still widely used.
