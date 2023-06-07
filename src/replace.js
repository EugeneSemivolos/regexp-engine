const { matchExpr, isStart, removeSlashWrapper } = require('./utils');

function replaceByRegExp(inputExpr, word, str) {
  if (inputExpr.length === 0 || inputExpr === '//') throw new Error('There is no RegExp. To solve it enter the RegExp');
  if (str.length === 0) throw new Error('Text to search is empty. To solve this problem enter the text');
  
  const expr = removeSlashWrapper(inputExpr);
  let resStr = str;
  
  if (isStart(expr[0])) {
    const [isMatched, length] =  matchExpr(expr.slice(1), resStr);
    if (isMatched) {
      resStr = word + resStr.slice(length);
    }
    return resStr;
  }

  for (let pos = 0; pos < resStr.length; pos++) {
    const [isMatched, length] = matchExpr(expr, resStr.slice(pos));
    if (isMatched) {
      resStr = resStr.slice(0, pos) + word + resStr.slice(pos + length);
      pos += word.length;
    }
  }
  return resStr;
}

module.exports = { replaceByRegExp };