const CLParser = require("./src/CLParser");

function main() {
  const regExp = CLParser.getRegExp(process.argv);
  const text = CLParser.getText(process.argv)
  console.log(regExp, "\n", text);
}
main();