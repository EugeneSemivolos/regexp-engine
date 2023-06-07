const isStart = (char) => char === '^';

const isEnd = (char) => char === '$';

const isStar = (char) => char === '*';

const isPlus = (char) => char === '+';

const isQuestion = (char) => char === '?';

const isOperator = (char) => isStar(char) || isPlus(char) || isQuestion(char);

const isDot = (char) => char === '.';

const isEscapeSequence = (term) => term[0] === '\\';

const isOpenAlternate = (char) => char === '(';

const isCLoseAlternate = (char) => char === ')';

const isAlpha = (ch) => (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");

const isDigit = (ch) => (ch >= "0" && ch <= "9");

const isLiteral = (ch) => isAlpha(ch) || isDigit(ch) || ' :/'.includes(ch);

const isSet = (term) => isOpenSet(term[0]) && isCloseSet(term.slice(-1));

const isAlternate = (term) => isOpenAlternate(term[0]) && isCLoseAlternate(term.slice(-1));

const isUnit = (term) => isLiteral(term[0]) || isDot(term[0]) || isSet(term) || isEscapeSequence(term);

const isOpenSet = (char) => char === '[';

const isCloseSet = (char) => char === ']';

const splitSet = (set_head) => set_head.slice(1, -1).split('');

const splitAlternate = (alternate) => alternate.slice(1, -1).split('|');

function removeSlashWrapper(expr) {
  if (expr[0] === '/' && expr.slice(-1) === '/') {
    return expr.slice(1, -1);
  } else {
    throw new Error('Incorrect RegExp. The RegExp must be wrapped in slashes');
  }
}

function duplicate(str, n) {
  let res = '';
  for (let i = 0; i < n; i++) {
    res += str;
  }
  return res;
}

function splitExpr(expr) {
  let head = '';
  let operator = '';
  let rest = '';
  let last_expr_pos = 0;

  if (isOpenSet(expr[0])) {
    last_expr_pos = expr.indexOf(']') + 1;
    head = expr.slice(0, last_expr_pos);
  } else if (isOpenAlternate(expr[0])) {
    last_expr_pos = expr.indexOf(')') + 1;
    head = expr.slice(0, last_expr_pos);
  } else if (isEscapeSequence(expr)) {
    last_expr_pos += 2;
    head = expr.slice(0, 2);
  } else {
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

  if (str.length === 0) return false;
  if (isLiteral(head)) return expr[0] === str[0];
  if (isDot(head)) return true;
  if (isEscapeSequence(head)) {
    if (head === '\\a') return isAlpha(str[0]);
    if (head === '\\d') return isDigit(str[0]);
    return false;
  }
  if (isSet(head)) {
    const set_terms = splitSet(head);
    return set_terms.includes(str[0]);
  }
  return false;
}

function matchMultiple(expr, str, match_length, min_length = 0, max_length = -1) {
  const [head, operator, rest] = splitExpr(expr);
  let submatch_length = -1;

  while (max_length === -1 || (submatch_length < max_length)) {
    const [subexpr_matched] = matchExpr(
      duplicate(head, submatch_length + 1), 
      str, 
      match_length
    );
    if (!subexpr_matched) break;
    submatch_length++;
  }

  while (submatch_length >= min_length) {
    const [matched, new_match_length] = matchExpr(
        duplicate(head, submatch_length) + rest, 
        str, 
        match_length
    );
    if (matched) return [matched, new_match_length];
    submatch_length--;
  }

  return [false, 0];
}

function matchAlternate(expr, str, matchLength) {
  const [head, operator, rest] = splitExpr(expr);
  const options = splitAlternate(head);
  for (const option of options) {
    const [isMatched, newMatchLength] = matchExpr(
      option + rest, 
      str,
      matchLength
    );
    if (isMatched) return [isMatched, newMatchLength];
  }
  return [false, 0];
}

function matchExpr(expr, str, match_length = 0) {
  if (expr.length === 0) return [true, match_length];
  if (isEnd(expr[0])) {
    return !str.length ? [true, match_length] : [false, 0];
  }

  const [head, operator, rest] = splitExpr(expr);

  if (isStar(operator)) return matchMultiple(expr, str, match_length, 0);
  if (isPlus(operator)) return matchMultiple(expr, str, match_length, 1);
  if (isQuestion(operator)) return matchMultiple(expr, str, match_length, 0, 1);

  if (isAlternate(head)) return matchAlternate(expr, str, match_length);

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
  if (matchList.length !== 0) return [true, matchList];
  return [false, []];
}

function main() {
  const expr = '/^http://(\\a|\\d)+.(com|net|org)/';
  const str = 'http://zone03.com/hey/there';
  console.log(`\nRegex: ${expr}\nString: ${str}`);

  const [isMatched, matchList] = match(expr, str);
  if (isMatched) {
    for (const item of matchList) {
      const [pos, length] = item;
      console.log(`Match: ${str.slice(pos, pos + length)}`);
    }
  } else {
    console.log("Match: not found");
  }
  console.log();
}
//main();

module.exports = { match };