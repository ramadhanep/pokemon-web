const fibonacciHelper = require("../helpers/fibonacciHelper");

const catchProbability = (req, res) => {
  const probability = Math.random() < 0.5 ? "success" : "fail";
  res.json({ probability });
};

const releasePokemon = (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  res.json({ number: randomNumber });
};

const renamePokemon = (req, res) => {
  const { name, renameCount } = req.body;
  const fib = fibonacciHelper.fibonacci(renameCount);
  const newName = `${name}-${fib}`;
  res.json({ newName, fiboNumber: fib });
};

module.exports = {
  catchProbability,
  releasePokemon,
  renamePokemon,
};
