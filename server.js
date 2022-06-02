const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const figlet = require("figlet");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: false }));
const user = [];
app.use(express.json());
// app.use(express.bodyParser());
// app.set("views", __dirname + "/views/");
// app.set("view engine", "ejs");
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.render(`index.ejs`, { name: req.body.name });
//   // res.json(user.name);
// });
// app.get("/intro", (req, res) => {
//   res.render("intro.ejs");
// });

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
    default:
      if (page.endsWith("/")) {
        route(res, "/index.html", "text/html");
      } else if (page.endsWith(".html")) {
        route(res, page, "text/html");
      } else if (page.endsWith(".js")) {
        route(res, page, "text/javascript");
      } else if (page.endsWith(".css")) {
        route(res, page, "text/css");
      } else if (page.endsWith(".png")) {
        route(res, page, "image/png");
      } else if (page.endsWith(".jpg")) {
        route(res, page, "image/jpeg");
      } else if (page.endsWith(".gif")) {
        route(res, page, "image/gif");
      } else {
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
  }
});

function route(res, page, contentType) {
  let destination = page.replace("/", ""); // Remove first slash
  fs.readFile(destination, function (err, data) {
    res.writeHead(200, { "Content-Type": contentType });
    res.write(data);
    res.end();
  });
}
//  }
//});

app.post("/intro", async (req, res) => {
  try {
    user.push({
      id: Date.now().toString(),
      name: req.body.name,
    });
    // res.send('welcome, ' + req.body.name)
    console.log(user);
    // res.json(user);
    res.redirect("/");
  } catch (e) {
    res.redirect("/intro");
  }
  // res.json(user);
});

server.listen(port);
