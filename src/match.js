const { matchExpr, isStart, removeSlashWrapper } = require('./utils');


function matchByRegExp(inputExpr, str) {
  if (inputExpr.length === 0 || inputExpr === '//') throw new Error('There is no RegExp. To solve it enter the RegExp');
  if (str.length === 0) throw new Error('Text to search is empty. To solve this problem enter the text');
  
  let expr = removeSlashWrapper(inputExpr);
  const matchList = [];
  let max_pos = str.length - 1;
  
  if (isStart(expr[0])) {
    max_pos = 0;
    expr = expr.slice(1);
  }

  for (let pos = 0; pos <= max_pos; pos++) {
    const [isMatched, match_length] =  matchExpr(expr, str.slice(pos));
    if (isMatched) {
      matchList.push([pos, match_length]);
      pos += match_length;
    }
  }
  return matchList;
}

module.exports = { matchByRegExp };