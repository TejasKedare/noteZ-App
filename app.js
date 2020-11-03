const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const _ = require("lodash");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/noteZ", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const notesSchema = {
  title: String,
  note: String,
};

const Note = mongoose.model("Note", notesSchema);

app.get("/", (req, res) => {
  Note.find({}, (err, post) => {
    if (!err) {
      res.render("notes", { postContent: post });
    } else {
      console.log(err);
    }
  });
});

app.post("/", (req, res) => {
  const note = new Note({
    title: req.body.title,
    note: req.body.notesList,
  });
  note.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.post("/delete", (req, res) => {
  const deleteID = req.body.deleteItem;
  Note.findByIdAndRemove(deleteID, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("successfully deleted");
    }
  });
  res.redirect("/");
});

// app.get("/:note", (req, res) => {
//   const notes = _.lowerCase(req.params.note);
//   postz.forEach((post) => {
//     const noteTitle = _.lowerCase(post.title);
//     if (noteTitle === notes) {
//       res.render("page", {
//         note: post.note,
//         title: post.title,
//       });
//     }
//   });
// });

app.listen(3000, () => console.log("The server id running on port 3000"));
