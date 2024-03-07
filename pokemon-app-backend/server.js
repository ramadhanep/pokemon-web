const express = require("express");
const bodyParser = require("body-parser");
const pokemonRoutes = require("./routes/pokemonRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use("/api", pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
