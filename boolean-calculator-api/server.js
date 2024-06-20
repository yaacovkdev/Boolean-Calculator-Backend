const path = require("path");
const express = require("express");
const cors = require("cors");
const BooleanCalculator = require(path.join(
  __dirname,
  "../bcp-source/BooleanCalculator"
)).default;

const app = express();
require("express-ws")(app);

app.use(express.text());
app.use(express.json());
app.use(cors());

app.ws("/", function (ws, req) {
  ws.on("message", function (msg) {
    const data = JSON.parse(msg);
    const calculation = BooleanCalculator(data);

    if (calculation.length > 12 && typeof calculation != "string") {
      ws.send(
        JSON.stringify({ status: 400, message: "Calculated Data Too Large!" })
      );
    } else if (typeof calculation === "string") {
      ws.send(
        JSON.stringify({ status: 406, message: `Error: ${calculation}` })
      );
    } else {
      ws.send(JSON.stringify({ status: 200, data: calculation }));
    }
  });
});

app.listen(8080, function () {
  console.log("App started");
});
