const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb://mongo:27017/docker-node-mongo",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongodb connected"))
  .catch((e) => console.log(e));

const Item = require("./models/Item");

app.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.render("index", { items });
  } catch (e) {
    res.status(400).json({ msg: "No Items found" });
  }
});

app.post("/item/add", async (req, res) => {
  await new Item({ name: req.body.name }).save();

  res.redirect("/");
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
