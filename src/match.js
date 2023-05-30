const doesUnitMatch = (expr, str) => expr[0] === str[0];

function matchExpr(expr, str, match_length = 0) {
  if (expr.length === 0) {
    return [true, match_length];
  }
  if (doesUnitMatch(expr, str)) {
    return matchExpr(expr.slice(1), str.slice(1), match_length + 1);
  } else {
    return [false, 0]
  }
}

function match(expr, str) {
  let pos = 0;
  
  while (pos < str.length - 1) {
    const [matched, match_length] =  matchExpr(expr, str.slice(pos));
      if (matched) {
        return [matched, pos, match_length];
      }
      pos++;
  }
  return [false, 0, 0];
}

function main() {
  const expr = 'world';
  const str = 'Hello, world!';
  console.log(`\nRegex: ${expr}\nString: ${str}`);

  const [matched, match_pos, match_length] = match(expr, str);
  if (matched) {
    console.log(`Match: ${str.slice(match_pos, match_pos + match_length)}`);
  } else {
    console.log("Match: not found");
  }
  console.log();
}
main();