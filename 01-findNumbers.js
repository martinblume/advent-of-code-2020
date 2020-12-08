const fs = require('fs');

const data = fs.readFileSync('01-input.txt', 'UTF-8');
const lines = data.split(/\r?\n/).map((x) => Number(x));

const findMatchingPair = () => {
  for (const a of lines) {
    for (const b of lines) {
      for (const c of lines) {
        if (a + b + c == 2020) {
          return [a, b, c]
        }
      }
    }
  }
  throw ('Could not find a matching pair')
}

const findNumbers = () => {
  const [a, b, c] = findMatchingPair()
  console.log(a * b * c)
}

module.exports = findNumbers()