const { replaceByRegExp } = require('../../src/replace');

describe('Testing function replaceByRegExp()', () => {
  test('No expression', () => {
    const expr = '';
    const str = 'Nothing to search';

    expect(() => {
      replaceByRegExp(expr, 'test', str);      
    }).toThrow('There is no RegExp');
  });

  test('No text to search', () => {
    const expr = '/RegExp/';
    const str = '';

    expect(() => {
      replaceByRegExp(expr, 'test', str);      
    }).toThrow('Text to search is empty');
  });

  test('Incorrect RegExp', () => {
    const expr = '[123]*go';
    const str = '21go';

    expect(() => {
      replaceByRegExp(expr, 'test', str);      
    }).toThrow('Incorrect RegExp');
  });

  test('One simple replacement', () => {
    const expr = '/world/';
    const str = 'Hello, world!';
    
    const res = replaceByRegExp(expr, 'everyone', str);
    expect(res).toBe('Hello, everyone!');
  });

  test('Deleting or replacing for nothing', () => {
    const expr = '/[dmc]o+re* /';
    const str = 'more This door text core must be cor clear';
    
    const res = replaceByRegExp(expr, '', str);
    expect(res).toBe('This text must be clear');
  });

  test('Complex replacing', () => {
    const expr = '/a mail: (\\a|\\d| )*/';
    const str = 'Here is a mail: Very important mail. @stop';
    
    const res = replaceByRegExp(expr, 'nothing :)', str);
    expect(res).toBe('Here is nothing :). @stop');
  });

  test('Multiple replacing', () => {
    const expr = '/(cat|dog|fish)[sie]*/';
    const str = 'There are cats, dogies, fish and so on';
    
    const res = replaceByRegExp(expr, 'animal', str);
    expect(res).toBe('There are animal, animal, animal and so os');
  });

});