const express = require("express");
const path = require("path");
const session = require("express-session");
const Store = require("connect-session-sequelize")(session.Store);
const exhbs = require("express-handlebars");

const sequelize = require("./config/connection");
const routes = require("./controllers");
//helpers if needed

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: true,
  store: new Store({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exhbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
});
