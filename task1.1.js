const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Enter input to reverse');

rl.on('line', (line) => {
  console.log(line.split('').reverse().join(''), '\n');
});
