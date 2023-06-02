const isStar = (char) => char === '*';

const isPlus = (char) => char === '+';

const isQuestion = (char) => char === '?';

const isOperator = (char) => isStar(char) || isPlus(char) || isQuestion(char);

const isLiteral = (ch) => (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || (ch >= "0" && ch <= "9");

const isSet = (term) => isOpenSet(term[0]) && isCloseSet(term.slice(-1));

const isUnit = (term) => isLiteral(term[0]) || isSet(term)

const isOpenSet = (char) => char === '[';

const isCloseSet = (char) => char === ']';

const splitSet = (set_head) => set_head.slice(1, -1).split('');

function removeSlashWrapper(expr) {
  if (expr[0] === '/' && expr.slice(-1) === '/') {
    return expr.slice(1, -1);
  } else {
    throw new Error('Incorrect RegExp. The RegExp must be wrapped in slashes');
  }
}

function splitExpr(expr) {
  let head = '';
  let operator = '';
  let rest = '';
  let last_expr_pos = 0;


  if (isOpenSet(expr[0])) {
    last_expr_pos = expr.indexOf(']') + 1;
    head = expr.slice(0, last_expr_pos);
  } else if (isLiteral(expr[0])) {
    last_expr_pos = 1;
    head = expr[0];
  }

  if (last_expr_pos < expr.length && isOperator(expr[last_expr_pos])) {
    operator = expr[last_expr_pos];
    last_expr_pos++;
  }

  rest = expr.slice(last_expr_pos);

  return [head, operator, rest];
}

function doesUnitMatch(expr, str) { 
  const [head, operator, rest] = splitExpr(expr);
  if (isLiteral(head)) {
    return expr[0] === str[0];
  } else if (isSet(head)) {
    const set_terms = splitSet(head);
    return set_terms.includes(str[0]);
  }
  return false;
}

function matchExpr(expr, str, match_length = 0) {
  if (expr.length === 0) {
    return [true, match_length];
  }

  const [head, operator, rest] = splitExpr(expr);

  if (isUnit(head)) {
    if (doesUnitMatch(expr, str)) {
      return matchExpr(rest, str.slice(1), match_length + 1);
    }
  } else {
    throw new Error(`Unknown token in expr ${expr}`);
  }
  return [false, 0]
}

function match(inputExpr, str) {
  if (inputExpr.length === 0 || inputExpr === '//') throw new Error('There is no RegExp. To solve it enter the RegExp');
  if (str.length === 0) throw new Error('Text to search is empty. To solve it enter the text');
  const expr = removeSlashWrapper(inputExpr);

  const matchList = [];
  for (let pos = 0; pos < str.length - 1; pos++) {
    const [isMatched, match_length] =  matchExpr(expr, str.slice(pos));
      if (isMatched) {
        matchList.push([pos, match_length]);
        pos += match_length;
      }
  }
  if (matchList.length !== 0) return [true, matchList];
  return [false, []];
}

function main() {
  const expr = '[H][E]*llo';
  const str = 'HEllo world';
  console.log(`\nRegex: ${expr}\nString: ${str}`);

  const [isMatched, match_pos, match_length] = match(expr, str);
  if (isMatched) {
    console.log(`Match: ${str.slice(match_pos, match_pos + match_length)}`);
  } else {
    console.log("Match: not found");
  }
  console.log();
}
//main();

module.exports = { match };