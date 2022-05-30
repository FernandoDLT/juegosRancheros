const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const figlet = require("figlet");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  function createfile(filename, contentType) {
    fs.readFile(filename, (err, data) => {
      res.writeHead(200, { "Content-Type": contentType });
      res.write(data);
      res.end();
    });
  }
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  switch (page) {
    case "/":
      createfile("index.html", "text/html");
      break;
    case "/otherpage.html":
      createfile("otherpage.html", "text/html");
      break;
    case "/otherotherpage":
      createfile("otherotherpage.html", "text/html");
      break;
    case "/tic-tac-toe/index.html":
      createfile("tic-tac-toe/index.html", "text/html");
      break;
    case "/rock-paper-scissors/index.html":
      createfile("rock-paper-scissors/index.html", "text/html");
      app.use(express.static("images"));
      app.use("./images", express.static("images"));
      // app.use(express.static(__dirname + "/images/"));
      // let publicDir = require("path").join(__dirname, "/public");
      // app.use(express.static(publicDir));
      break;
    case "/api":
      res.writeHead(200, { "Content-Type": "application/json" });

      if ("student" in params) {
        let adjArray = [
          "colorful",
          "happy",
          "enthusiastic",
          "agreeable",
          "funky",
        ];
        let verbArray = ["dancing", "walking", "working", "coding", "playing"];
        if (adjArray.includes(params["student"])) {
          let num = Math.floor(Math.random() * adjArray.length);
          const objToJson = {
            name: adjArray[num],
            status: verbArray[num],
            currentOccupation: "Leon",
          };
          res.end(JSON.stringify(objToJson));
        } else if (params["student"] == "game") {
          const objToJson = {
            name: "tic-tac-toe",
            status: "/tic-tac-toe/index.html",
            currentOccupation: "play both",
          };
          res.end(JSON.stringify(objToJson));
        } else if (params["student"] == "rock" || "paper") {
          const objToJson = {
            name: "rock-paper-scissors",
            status: "/rock-paper-scissors/index.html",
            currentOccupation: "play both",
          };
          res.end(JSON.stringify(objToJson));
        } else {
          const objToJson = {
            name: "unknown",
            status: "unknown",
            currentOccupation: "unknown",
          };
          res.end(JSON.stringify(objToJson));
        }
      }

      break;
    case "/css/style.css":
      fs.readFile("css/style.css", (err, data) => {
        res.write(data);
        res.end();
      });
      break;
    case "/tic-tac-toe/style.css":
      fs.readFile("tic-tac-toe/style.css", (err, data) => {
        res.write(data);
        res.end();
      });
      break;
    case "/rock-paper-scissors/style.css":
      fs.readFile("rock-paper-scissors/style.css", (err, data) => {
        res.write(data);
        res.end();
      });
      break;
    case "/js/main.js":
      createfile("js/main.js", "text/javascript");
      break;
    case "/tic-tac-toe/app.js":
      createfile("tic-tac-toe/app.js", "text/javascript");
      break;
    case "/rock-paper-scissors/app.js":
      createfile("rock-paper-scissors/app.js", "text/javascript");
      break;
    default:
      figlet("404!!", function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        res.write(data);
        res.end();
      });
  }
});

// port is dynamic based on env
server.listen(port);
