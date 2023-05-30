const CLParser = require("../../src/CLParser");
var path = require("path");

describe('Testing CLIParser', () => {
  test('No arguments', () => {
    const data = ['npm','start'];
    expect(() => {
      CLParser.getRegExp(data);
    }).toThrow();
    expect(() => {
      CLParser.getText(data);
    }).toThrow();

    const data2 = ['npm','start', '', ''];
    expect(() => {
      CLParser.getRegExp(data2);
    }).toThrow();
    expect(() => {
      CLParser.getText(data2);
    }).toThrow();
  });

  test('Only one argument', () => {
    const data = ['npm','start', '/regexp/'];
    expect(CLParser.getRegExp(data)).toMatch('/regexp/');
    expect(() => {
      CLParser.getText(data);
    }).toThrow();
  });

  test('Second argument is the path', () => {
    const data = ['npm','start', '/regexp/', `${path.join(__dirname, 'test.txt')}`];
    expect(CLParser.getRegExp(data)).toMatch('/regexp/');
    expect(CLParser.getText(data)).toMatch('Hello world!');
  });

  test('Second argument is a text', () => {
    const data = ['npm','start', '/regexp/', 'Find in me!'];
    expect(CLParser.getRegExp(data)).toMatch('/regexp/');
    expect(CLParser.getText(data)).toMatch('Find in me!');
  });
});