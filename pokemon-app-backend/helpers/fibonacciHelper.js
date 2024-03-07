const generateRenamedName = (name, count) => {
  const fib = fibonacci(count);
  return `${name}-${fib}`;
};

const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

module.exports = {
  generateRenamedName,
};
