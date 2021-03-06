// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8070;
const sassMiddleware = require("./lib/sass-middleware");
const checkSessionMiddleware = require('./middlewares/checkSessionMiddleware')
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');

const usersRoutes = require("./routes/users");
const NEDRoutes = require('./routes/new_edit_delete');
const websitePasswordDetails = require('./routes/view');
const adminRoutes = require('./routes/admin');
const res = require("express/lib/response");

app.use(morgan("dev"));
//* set up view-engine and parser.
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
//* Set up SASS.
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
//* Serve files on public folder in .ejs.
app.use(express.static("public"));
//* Set up cookie-session.
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
//* Check every incoming request's session.
app.use(checkSessionMiddleware);

app.get("/", (req, res) => {
  if (res.locals.isAuth) {
    return res.redirect("/home");
  }
  return res.render('main');
});

app.use(usersRoutes);

app.use(NEDRoutes);
app.use(websitePasswordDetails);
app.use(adminRoutes);

app.use(( req, res, next) => {
  res.status(404).render('404');
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});