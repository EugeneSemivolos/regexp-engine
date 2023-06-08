const CLParser = require("../../src/CLParser");
const { matchByRegExp } = require('../../src/match');
const { replaceByRegExp } = require('../../src/replace');

describe('Testing Integration', () => {
  test('Test match() function with path to file', () => {
    const data = ['npm','run', 'match', '/(c[aeo]+t|do*g)/', './tests/Integration/test1.txt'];
    
    const { cmd, regExp, inputText } = CLParser.parseCommandLine(data);
    expect(cmd).toBe('match');

    const matchList = matchByRegExp(regExp, inputText);
    let [pos, length] = matchList[0];
    expect(pos).toBe(0);
    expect(length).toBe(3);

    [pos, length] = matchList[1];
    expect(pos).toBe(4);
    expect(length).toBe(3);

    [pos, length] = matchList[2];
    expect(pos).toBe(11);
    expect(length).toBe(4);

    [pos, length] = matchList[3];
    expect(pos).toBe(16);
    expect(length).toBe(5);
  });

  test('Test match() function directly with the text', () => {
    const data = ['npm','run', 'match', '/I am a (cat|dog)/', 'So I am a cat or I am a dog, whatever'];
    
    const { cmd, regExp, inputText } = CLParser.parseCommandLine(data);
    expect(cmd).toBe('match');

    const matchList = matchByRegExp(regExp, inputText);
    expect(matchList.length).toBe(2);

    let [pos, length] = matchList[0];
    expect(pos).toBe(3);
    expect(length).toBe(10);

    [pos, length] = matchList[1];
    expect(pos).toBe(17);
    expect(length).toBe(10);
  });

  test('Test replace() function directly with the text', () => {
    const data = ['npm','run', 'replace', '/I am a (cat|dog)/', 'hero', 'So I am a cat or I am a dog, whatever'];
    
    const { cmd, regExp, textToReplace, inputText } = CLParser.parseCommandLine(data);
    expect(cmd).toBe('replace');

    const resStr = replaceByRegExp(regExp, textToReplace, inputText);
    expect(resStr).toBe('So hero or hero, whatever');
  });

  test('Test replace() function with path to file', () => {
    const data = ['npm','run', 'replace', '/\\d+/', '(encoded)', './tests/Integration/test2.txt'];
    
    const { cmd, regExp, textToReplace, inputText } = CLParser.parseCommandLine(data);
    expect(cmd).toBe('replace');

    const resStr = replaceByRegExp(regExp, textToReplace, inputText);
    expect(resStr).toMatch('passwd for gmail: (encoded)');
  });
});