const express = require("express");
const path = require("path")
const articles = require("./articles.json")

const app = express();



app.set('view engine', 'ejs');
app.use(express.json())
app.set('views', __dirname + '/views')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))


app.get("/", (req, res) => {
  res.render("index", {articles})
})

app.get("/contact", (req, res) => {
  res.render("contact")

})

app.get("/about", (req, res) => {
  res.render("about")
})

app.get("/articles", (req, res) => {
  res.render("posts", {articles})
})

app.get("/articles/add", (req, res) => {
  res.render("addArticle")
})

app.get("/articles/:slug", (req, res) => {
  const slug = req.params.slug;
  const post = articles.find(article => article.slug === slug)
  if (post) {
    res.render("post", {article: post})
  } else {
    res.render("404")
  }
})

app.post("/articles", (req, res) => {
    console.log(req.body);

  res.send("ok")
})

app.delete("/articles/:slug", (req, res) => {
  const slug = req.params.slug;
  const post = articles.find(article => article.slug === slug)
  if (post) {
    articles.splice(articles.indexOf(post), 1)
    res.status(200).send()
  } else {
    res.status(404).send()
  }
})

app.get("/*", (req, res)=> {
  res.render("404")
})

const port = 3001;



app.listen(port, function () {
  console.log("le server ecoute sur le port", port);
  console.info(`l'application est disponible sur l'addresse http://localhost:${port}`);
});
