const express = require("express");
const path = require("path")
const {  validationResult, body } = require('express-validator');
const methodOverride = require('method-override');

const articles = require("./articles.json")

const app = express();



app.set('view engine', 'ejs');
app.use(express.json())
app.set('views', __dirname + '/views')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))




//  les validations
//  author: min 3 caractères, max 255, caractères echappement des caractères spéciaux
//  title: min 3 caractères, max 255, caractères echappement des caractères spéciaux
//  description: min 3 caractères, max 500, caractères echappement des caractères spéciaux
//  urlToImage: url valide
//    content: min 3 caractères, max 5000, caractères echappement des caractères spéciaux
function createArticleChain(){
    return [
        body("author").isLength({min: 3, max: 255}).withMessage("Le nom de l'auteur doit avoir minimum 3 et maximum 255 caracteres").escape(),
        body("title").isLength({min: 3, max: 255}).withMessage("Le title de l'article de doit avoir minimum 3 et maximum 255 caracteres").escape(),
        body("description").isLength({min: 3, max: 500}).withMessage("Le titre de l'article dois avoir minimum 3 et maximum 500 caracteres").escape(),
        body("urlToImage").isURL().withMessage("L'url de l'image doit etre une url valide valide"),
        body("content").isLength({min: 3, max: 5000}).withMessage("Le contenu de l'article dois avoir minimum 3 et maximum 5000 caracteres").escape()
    ]

}


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

app.post("/articles", createArticleChain(), (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const article = req.body
    article.slug = article.title.toLowerCase().replace(/ /g, "-")
    articles.push(article)
    res.status(201).send()


})

app.delete("/articles/:slug", (req, res) => {
  const slug = req.params.slug;
  const post = articles.find(article => article.slug === slug)
  if (post) {
      articles.splice(articles.indexOf(post), 1)
      res.redirect('/articles')
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
