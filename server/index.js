//TODO: ADD LINTING
import express from "express";
import axios from "axios";

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api", (req, res) => {
  const apiKey1 = "4e32683c731192c4";
  const apiKey2 = "2d5f375478a9fe88";
  const apiKey3 = "98afe38fcac76e87";
  axios({
    url: `https://coinlib.io/api/v1/coinlist?key=${apiKey1}&pref=USD&order=rank_asc`,
    method: "get",
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
