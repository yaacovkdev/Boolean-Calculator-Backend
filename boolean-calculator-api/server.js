const path = require('path');
const express = require('express');
const cors = require('cors');
const BooleanCalculator = require('../bcp-source/BooleanCalculator').default;

const app = express();
app.use(express.text());
app.use(express.json());
app.use(cors());

// app.use('/', express.static(path.join(__dirname, '/build')));

app.post('/stuff', (req, res) => {
  console.log(req.body);

  const calculation = BooleanCalculator(req.body);
  
  res.status(200).send(calculation);
});

app.listen(8080, function() {
  console.log("App started");
})