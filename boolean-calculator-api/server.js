const express = require('express');
const cors = require('cors');
const BooleanCalculator = require('../bcp-source/BooleanCalculator').default;

const app = express();
app.use(express.text());
app.use(cors());

app.post('/', (req, res) => {
  console.log(req.body);

  //console.log(BooleanCalculator.main("p"));
  const calculation = BooleanCalculator(req.body);
  res.status(200).send(calculation);
});

app.listen(8080, function() {
  console.log("App started");
})