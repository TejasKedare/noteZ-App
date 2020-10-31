const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const postz = [];

app.get("/", (req, res) => {
  res.render("notes", { postContent: postz });
});

app.post("/", (req, res) => {
  let posts = {
    note: req.body.notesList,
    title: req.body.title,
  };

  postz.push(posts);

  res.redirect("/");
});

app.listen(3000, () => console.log("The server id running on port 3000"));
