const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const request = require("request");

app.get("/api", (req, res) => {
  //   res.json({ message: "Hello from server!" });
  let data = "empty";
  request(
    "https://coinlib.io/api/v1/coinlist?key=2d5f375478a9fe88&pref=USD&page=1&order=rank_asc",
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("success");
        console.log(body);
        return;
      }
      console.log("error");
      console.log(error);
      console.log(response.statusCode);
      console.log(response.body);
    }
  );
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
