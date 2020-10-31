const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const _ = require("lodash");
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

app.get("/:note", (req, res) => {
  const notes = _.lowerCase(req.params.note);
  postz.forEach((post) => {
    const noteTitle = _.lowerCase(post.title);
    if (noteTitle === notes) {
      res.render("page", {
        note: post.note,
        title: post.title,
      });
    }
  });
});

app.listen(3000, () => console.log("The server id running on port 3000"));
