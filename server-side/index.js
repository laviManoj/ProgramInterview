const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const mongoURI =
  "mongodb+srv://traveller:Password123@traveller.ots9ysb.mongodb.net/?retryWrites=true&w=majority";

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get("/movies", async (req, res) => {
  const client = await MongoClient.connect(mongoURI);
  const moviesModel = client.db("test").collection("movies");
  try {
    const movies = await moviesModel.find({}).toArray();
    res.send(movies);
    console.log(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

app.post("/customer", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ message: " Name and email are required" });
  } else {
    res.json({ message: "movies created successfully" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "something went wrong" });
});

app.listen(port, () => console.log(`Server is up and runnng ${port}`));
