const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const figlet = require("figlet");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/public");
app.use(express.static("public/assets/"));

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
      break;
    case "/rock-paper-scissors/images/rock.png":
      createfile("rock-paper-scissors/images/rock.png", "image/gif");
      break;
    case "/rock-paper-scissors/images/paper.png":
      createfile("rock-paper-scissors/images/paper.png", "image/gif");
      break;
    case "/rock-paper-scissors/images/scissors.png":
      createfile("rock-paper-scissors/images/scissors.png", "image/gif");
      break;
    case "/images/logo.png":
      createfile("images/logo.png", "image/gif");
      break;
    case "/assets/css/images/header.svg":
      createfile("assets/css/images/header.svg", "image/svg+xml");
      break;
    case "/images/bee.png":
      createfile("images/bee.png", "image/gif");
      break;
    case "/images/rock.png":
      createfile("images/rock.png", "image/gif");
      break;
    case "/images/snake.png":
      createfile("images/snake.png", "image/gif");
      break;
    case "/images/tic.png":
      createfile("images/tic.png", "image/gif");
    case "/images/banner.png":
      createfile("images/banner.png", "image/gif");
      break;
    case "/api":
      res.writeHead(200, { "Content-Type": "application/json" });

      if (params["games"] == "game") {
        const objToJson = {
          name: "tic-tac-toe",
          status: "/tic-tac-toe/index.html",
          currentOccupation: "play both",
        };
        res.end(JSON.stringify(objToJson));
      } else if (
        params["student"] == "rock" ||
        params["student"] == "paper" ||
        params["student"] == "scissors"
      ) {
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

      break;
    case "/css/style.css":
      fs.readFile("css/style.css", (err, data) => {
        res.write(data);
        res.end();
      });
      break;
    case "/assets/css/main.css":
      fs.readFile("assets/css/main.css", (err, data) => {
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
    case "/assets/js/main.js":
      createfile("assets/js/main.js", "text/javascript");
      break;
    case "/assets/js/breakpoints.min.js":
      createfile("assets/js/breakpoints.min.js", "text/javascript");
      break;
    case "/assets/js/browser.min.js":
      createfile("assets/js/browser.min.js", "text/javascript");
      break;
    case "/assets/js/jquery.dropotron.min.js":
      createfile("assets/js/jquery.dropotron.min.js", "text/javascript");
      break;
    case "/assets/js/jquery.min.js":
      createfile("assets/js/jquery.min.js", "text/javascript");
      break;
    case "/assets/js/util.js":
      createfile("assets/js/util.js", "text/javascript");
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
