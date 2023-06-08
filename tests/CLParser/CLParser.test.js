const CLParser = require("../../src/CLParser");
var path = require("path");

describe('Testing CLIParser', () => {
  test('No arguments', () => {
    const data = ['npm','run'];
    expect(() => {
      CLParser.parseCommandLine(data);
    }).toThrow('Enter command');
  });

  test('Only command', () => {
    const data = ['npm','run', 'match'];
    expect(() => {
      CLParser.parseCommandLine(data);
    }).toThrow('Enter the regular Expression');
  });

  test('Only command and RegExp', () => {
    const data = ['npm','run', 'match', '/find/'];
    expect(() => {
      CLParser.parseCommandLine(data);
    }).toThrow('Enter the path to file or the text to search');
  });

  test('There is text to replace but command is match', () => {
    const data = ['npm','run', 'match', '/find/', 'REPLACE', 'This is text to find smth'];
    expect(() => {
      CLParser.parseCommandLine(data);
    }).toThrow('When command is match, there is only regexp and text to search.');
  });

  test('There is no text to replace but command is replace', () => {
    const data = ['npm','run', 'replace', '/find/', 'This is text to find smth'];
    expect(() => {
      CLParser.parseCommandLine(data);
    }).toThrow('Enter the path to file or the text to search');
  });

  test('Test match function', () => {
    const data = ['npm','run', 'match', '/[pc]o+le*/', 'Try to find pool. You are cool. What is pole?'];
    
    const { cmd, regExp, inputText } = CLParser.parseCommandLine(data);
    expect(cmd).toBe('match');
    expect(regExp).toBe('/[pc]o+le*/');
    expect(inputText).toBe('Try to find pool. You are cool. What is pole?');
  });

  test('Test replace function', () => {
    const data = ['npm','run', 'replace', '/[pc]o+le*/', 'smth', 'Try to find pool. You are cool. What is pole?'];
    
    const { cmd, regExp, textToReplace, inputText } = CLParser.parseCommandLine(data);
    expect(cmd).toBe('replace');
    expect(regExp).toBe('/[pc]o+le*/');
    expect(textToReplace).toBe('smth');
    expect(inputText).toBe('Try to find pool. You are cool. What is pole?');
  });

  test('Test path to file where search is needed', () => {
    const data = ['npm','run', 'match', '/[pc]o+le*/', './tests/CLParser/test.txt'];
    
    const { cmd, regExp, textToReplace, inputText } = CLParser.parseCommandLine(data);
    expect(cmd).toBe('match');
    expect(regExp).toBe('/[pc]o+le*/');
    expect(textToReplace).toBe('');
    expect(inputText).toBe('Hello world!');
  });
});