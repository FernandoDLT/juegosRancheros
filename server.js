const http = require("http");
const cors = require("cors");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const figlet = require("figlet");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 8000;
const user = [];
app.use(cors());
app.use(express.json());
// app.use(express.bodyParser());
// app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({ secret: "mySecret", resave: false, saveUninitialized: false })
);

app.get("/", ckeckAuthentication, (req, res) => {
  var name = req.session.name;
  res.render(`index.ejs`, { name });
  // res.json(user.name);
});
app.get("/intro", (req, res) => {
  res.render("intro.ejs");
});
app.post("/intro", nckeckAuthentication, async (req, res) => {
  try {
    req.session.name = req.body.name;
    // res.send('welcome, ' + req.body.name)
    return res.redirect("/");
  } catch (e) {
    return res.redirect("/intro");
  }
});

function ckeckAuthentication(req, res, next) {
  if (req.session.name) {
    return next();
  }
  res.redirect("/intro");
}
function nckeckAuthentication(req, res, next) {
  if (req.session.name) {
    return res.redirect("/");
  }
  next();
}
app.get("*", function (req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  if (err.status === 404) {
    var data = {
      title: "404 Not Found",
      content: "Oops, page not found!",
    };
    figlet("404!!", function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  } else {
    return next();
  }
});
app.listen(port);
// const server = http.createServer((req, res) => {
//   function createfile(filename, contentType) {
//     fs.readFile(filename, (err, data) => {
//       res.writeHead(200, { "Content-Type": contentType });
//       res.write(data);
//       res.end();
//     });
//   }
//   const page = url.parse(req.url).pathname;
//   const params = querystring.parse(url.parse(req.url).query);
//   console.log(page);
//   switch (page) {
//     case "/":
//       createfile("index.html", "text/html");
//       break;
//     default:
//       if (page.endsWith("/")) {
//         route(res, "/index.html", "text/html");
//       } else if (page.endsWith(".html")) {
//         route(res, page, "text/html");
//       } else if (page.endsWith(".js")) {
//         route(res, page, "text/javascript");
//       } else if (page.endsWith(".css")) {
//         route(res, page, "text/css");
//       } else if (page.endsWith(".png")) {
//         route(res, page, "image/png");
//       } else if (page.endsWith(".jpg")) {
//         route(res, page, "image/jpeg");
//       } else if (page.endsWith(".gif")) {
//         route(res, page, "image/gif");
//       } else if (page.endsWith(".svg")) {
//         route(res, page, "image/svg+xml");
//       } else if (page.endsWith(".ico")) {
//         route(res, page, "image/x-icon");
//       }else {
//         figlet("404!!", function (err, data) {
//           if (err) {
//             console.log("Something went wrong...");
//             console.dir(err);
//             return;
//           }
//           res.write(data);
//           res.end();
//         });
//       }
//   }
// });

// function route(res, page, contentType) {
//   let destination = page.replace("/", ""); // Remove first slash
//   fs.readFile(destination, function (err, data) {
//     if (data != undefined) {
//       res.writeHead(200, { "Content-Type": contentType });
//       res.write(data);
//     }
//     res.end();
//   });
// }
//  }
//});

// server.listen(port);
