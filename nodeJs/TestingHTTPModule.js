//primitive data types in javascript
/* 
const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("it's omar testing the express js");
});

app.listen(3000);
 */

var http = require("http");
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/HTML" });
    res.end("testing this little thing");
  })
  .listen(3012);
