const { match } = require('../../src/match');

describe('Testing function match()', () => {
  test('No expression', () => {
    const expr = '';
    const str = 'Nothing to search';

    expect(() => {
      match(expr, str);      
    }).toThrow('There is no RegExp');
  });

  test('No text to search', () => {
    const expr = '/RegExp/';
    const str = '';

    expect(() => {
      match(expr, str);      
    }).toThrow('Text to search is empty');
  });

  test('Incorrect RegExp', () => {
    const expr = '[123]*go';
    const str = '21go';

    expect(() => {
      match(expr, str);      
    }).toThrow('Incorrect RegExp');
  });

  test('One simple matching', () => {
    const expr = '/world/';
    const str = 'Hello, world!';
    
    const [matched, matchList] = match(expr, str);
    expect(matched).toBe(true);
    expect(matchList.length).toBe(1);
    const [pos, length] = matchList[0];
    expect(pos).toBe(7);
    expect(length).toBe(5);
  });

  test('Multiple simple matching', () => {
    const expr = '/is/';
    const str = 'This is Cris!';
    
    const [matched, matchList] = match(expr, str);
    expect(matched).toBe(true);
    expect(matchList.length).toBe(3);

    let [pos, length] = matchList[0];
    expect(pos).toBe(2);
    expect(length).toBe(2);

    [pos, length] = matchList[1];
    expect(pos).toBe(5);
    expect(length).toBe(2);

    [pos, length] = matchList[2];
    expect(pos).toBe(10);
    expect(length).toBe(2);
  });

  
});