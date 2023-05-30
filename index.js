const fs = require('fs');

function getRegExp(args) {
  if (!args[2]) throw new Error("Enter the regular Expression");
  return args[2];
}

function getText(args) {
  const field = args[3];
  if (!field) throw new Error("Enter the path to file or the text to search");
  if (isPath(field)) {
    const fileText = fs.readFileSync(field).toString();
    return fileText;
  }
  return field;
}

function isPath(field) {
  //Linux or MacOS path
  if (field[0] === '/') return true;                                          // root directory
  if (field[0] === '.' && field[1] === '/') return true;                      // currect directory
  if (field[0] === '.' && field[1] === '.' && field[2] === '/') return true;  // escape from directory

  //Windows path
  if (field[1] === ':' && field[2] === '\\') return true;                     // root directory
  if (field[0] === '.' && field[1] === '\\') return true;                     // currect directory
  if (field[0] === '.' && field[1] === '.' && field[2] === '\\') return true; // escape from directory
  return false;
}

function main() {
  const regExp = getRegExp(process.argv);
  const text = getText(process.argv)
  console.log(regExp, "\n", text);
}
main();