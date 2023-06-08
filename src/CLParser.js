const fs = require('fs');

class CLParser {
  
  static getCommand(args) {
    if (args[2]) return args[2];
    else throw new Error("Enter command (match/replace)")
  }
  
  static getRegExp(args) {
    if (!args[3]) throw new Error("Enter the regular Expression");
    return args[3];
  }

  static getInputText(args) {
    const cmd = this.getCommand(args);
    let field;
    if (cmd === 'replace') {
      field = args[5];
    } else if (cmd === 'match') {
      if (args[5]) throw new Error("When command is match, there is only regexp and text to search.");
      field = args[4];
    }
    if (!field) throw new Error("Enter the path to file or the text to search");
    try {
      const fileText = fs.readFileSync(field).toString();
      return fileText;
    } catch {
      return field;
    }
  }

  static getTextToReplace(args) {
    return args[2] === 'replace' ? args[4] : '';
  }

  static parseCommandLine(args) {
    const cmd = this.getCommand(args);
    const regExp = this.getRegExp(args);
    const textToReplace = this.getTextToReplace(args);
    const inputText = this.getInputText(args);

    return { cmd, regExp, textToReplace, inputText };
  }
}

module.exports = CLParser;