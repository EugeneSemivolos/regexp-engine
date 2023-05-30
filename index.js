const fs = require('fs');

function getRegExp(args) {
  if (!args[2]) throw new Error("Enter the regular Expression");
  return args[2];
}

function getText(args) {
  const field = args[3];
  if (!field) throw new Error("Enter the path to file or the text to search");
  try {
    const fileText = fs.readFileSync(field).toString();
    return fileText;
  } catch {
    return field;
  }
}

function main() {
  const regExp = getRegExp(process.argv);
  const text = getText(process.argv)
  console.log(regExp, "\n", text);
}
main();