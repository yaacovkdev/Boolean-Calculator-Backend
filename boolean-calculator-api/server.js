const path = require("path");
const express = require("express");
const cors = require("cors");
const BooleanCalculator = require("../bcp-source/BooleanCalculator").default;

const app = express();
app.use(express.text());
app.use(express.json());
app.use(cors());

// app.use('/', express.static(path.join(__dirname, '/build')));

app.post("/stuff", (req, res) => {
  const calculation = BooleanCalculator(req.body);
  // console.log(calculation);
  if(calculation.length > 16 && typeof calculation != "string"){
    res.status(400).send('way too large!');
  } else {
    res.status(200).send(calculation);
  }
});

app.listen(8080, function () {
  console.log("App started");
});
