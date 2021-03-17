const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const userRouter = require("./routes/user.routes");

const PORT = process.env.PORT || 3001;
const app = express();

// VIEW ENGINE
app.use(expressLayouts);
app.set("view engine", "ejs");

// EXPRESS JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// INDEX VIEWS (ROUTING)
app.use("/", userRouter);

// PAGE NOT FOUND : 404
app.use((req, res, next) => {
  res.status(404).render("pages/404", {
    status: 404,
    message: "PAGE NOT FOUND !!!",
  });
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON : http://localhost:${PORT}`);
});
