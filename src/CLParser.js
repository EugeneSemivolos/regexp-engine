const fs = require('fs');

class CLParser {
  static getRegExp(args) {
    if (!args[2]) throw new Error("Enter the regular Expression");
    return args[2];
  }

  static getText(args) {
    const field = args[3];
    if (!field) throw new Error("Enter the path to file or the text to search");
    try {
      const fileText = fs.readFileSync(field).toString();
      return fileText;
    } catch {
      return field;
    }
  }
}

module.exports = CLParser;