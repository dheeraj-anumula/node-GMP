/* eslint-disable no-console */
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Enter input to reverse');

rl.on('line', (line) => {
  console.log(line.split('').reverse().join(''), '\n');
});
