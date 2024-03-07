const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.get("/catchProbability", pokemonController.catchProbability);
router.post("/releasePokemon", pokemonController.releasePokemon);
router.post("/renamePokemon", pokemonController.renamePokemon);

module.exports = router;
