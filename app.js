// load express
const express = require("express");
const app = express();

// use ejs for views
app.set("view engine", "ejs");
app.use(express.static("public"));

// store posts
let posts = [];

// show homepage with posts
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// create new post
app.post("/add", (req, res) => {
  const { name, title, content } = req.body;
  const newPost = {
    id: Date.now().toString(),
    name,
    title,
    content,
    date: new Date().toLocaleString()
  };
  posts.push(newPost);
  res.redirect("/");
});

// show edit form
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.render("edit", { post });
});

// save edited post
app.post("/edit/:id", (req, res) => {
  const index = posts.findIndex(p => p.id === req.params.id);
  posts[index].name = req.body.name;
  posts[index].title = req.body.title;
  posts[index].content = req.body.content;
  posts[index].date = new Date().toLocaleString();
  res.redirect("/");
});

// delete post
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect("/");
});

// start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
