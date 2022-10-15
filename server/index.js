const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const request = require("request");

app.get("/api", (req, res) => {
  //   res.json({ message: "Hello from server!" });
  request(
    "https://coinlib.io/api/v1/global?key=XXX&pref=EUR",
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      }
      console.log(error);
      console.log(response.statusCode);
      console.log(response.body);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
