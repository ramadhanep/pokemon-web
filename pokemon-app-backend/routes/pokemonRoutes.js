const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.post("/catchProbability", pokemonController.catchProbability);
router.post("/releasePokemon", pokemonController.releasePokemon);
router.post("/renamePokemon", pokemonController.renamePokemon);

module.exports = router;
