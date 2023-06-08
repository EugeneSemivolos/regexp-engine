const CLParser = require("./src/CLParser");
const { matchByRegExp } = require("./src/match");
const { replaceByRegExp } = require("./src/replace");

function main() {
  const { cmd, regExp, textToReplace, inputText } = CLParser.parseCommandLine(process.argv);

  if (cmd === 'match') {
    const matchList = matchByRegExp(regExp, inputText);
    for (const [i, item] of matchList.entries()) {
      const [pos, length] = item;
      const matchedStr = inputText.slice(pos, pos + length);
      console.log(`${i + 1} match: ${matchedStr}`);
    }
  } else if (cmd === 'replace') {
    const replacedStr = replaceByRegExp(regExp, textToReplace, inputText);
    console.log(replacedStr);
  } else {
    return console.log('There is no command you sent');
  }
}
main();