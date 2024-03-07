const primeHelper = require("../helpers/primeHelper");
const fibonacciHelper = require("../helpers/fibonacciHelper");

const catchProbability = (req, res) => {
  const probability = Math.random() < 0.5 ? "success" : "fail";
  res.json({ probability });
};

const releasePokemon = (req, res) => {
  const { number } = req.body;
  const isPrime = primeHelper.checkPrime(number);
  res.json({ release: isPrime });
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
