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

  test('RegExp with one symbol set', () => {
    const expr = '/m[iao]ke/';
    const str = 'I can make something';
    
    const [matched, matchList] = match(expr, str);
    expect(matched).toBe(true);
    expect(matchList.length).toBe(1);
    const [pos, length] = matchList[0];
    expect(pos).toBe(6);
    expect(length).toBe(4);
  });

  test('RegExp with few symbol sets', () => {
    const expr = '/[123][abc][xyz]/';
    const str = 'Can regexp find 2cx in this text?';
    
    const [matched, matchList] = match(expr, str);
    expect(matched).toBe(true);
    expect(matchList.length).toBe(1);
    const [pos, length] = matchList[0];
    expect(pos).toBe(16);
    expect(length).toBe(3);
  });

  test('Multiple matching with few sets in RegExp', () => {
    const expr = '/[123][abc][xyz]/';
    const str = '1bz 4bx 3cx 2ay';
    
    const [matched, matchList] = match(expr, str);
    expect(matched).toBe(true);
    expect(matchList.length).toBe(3);

    let [pos, length] = matchList[0];
    expect(pos).toBe(0);
    expect(length).toBe(3);

    [pos, length] = matchList[1];
    expect(pos).toBe(8);
    expect(length).toBe(3);

    [pos, length] = matchList[2];
    expect(pos).toBe(12);
    expect(length).toBe(3);
  });

  test('Dot in RegExp', () => {
    const expr = '/[Cc].t/';
    const str = 'Find cat and Cut';

    const [matched, matchList] = match(expr, str);
    expect(matched).toBe(true);
    expect(matchList.length).toBe(2);

    let [pos, length] = matchList[0];
    expect(pos).toBe(5);
    expect(length).toBe(3);

    [pos, length] = matchList[1];
    expect(pos).toBe(13);
    expect(length).toBe(3);
  });

  test('Star in RegExp', () => {
    const expr = '/ab*c/';
    const str = 'Find ac abc abbbbc adc';

    const [matched, matchList] = match(expr, str);
    expect(matched).toBe(true);
    expect(matchList.length).toBe(3);

    let [pos, length] = matchList[0];
    expect(pos).toBe(5);
    expect(length).toBe(2);

    [pos, length] = matchList[1];
    expect(pos).toBe(8);
    expect(length).toBe(3);

    [pos, length] = matchList[2];
    expect(pos).toBe(12);
    expect(length).toBe(6);
  });

  test('Plus in RegExp', () => {
    const expr = '/ab+c/';
    const str = 'Find ac abc abbbbc adc';

    const [matched, matchList] = match(expr, str);
    expect(matched).toBe(true);
    expect(matchList.length).toBe(2);

    let [pos, length] = matchList[0];
    expect(pos).toBe(8);
    expect(length).toBe(3);

    [pos, length] = matchList[1];
    expect(pos).toBe(12);
    expect(length).toBe(6);
  });

  test('Question mark in RegExp', () => {
    const expr = '/ab?c/';
    const str = 'Find ac abc abbbbc adc';

    const [matched, matchList] = match(expr, str);
    expect(matched).toBe(true);
    expect(matchList.length).toBe(2);

    let [pos, length] = matchList[0];
    expect(pos).toBe(5);
    expect(length).toBe(2);

    [pos, length] = matchList[1];
    expect(pos).toBe(8);
    expect(length).toBe(3);
  });

  test('Operators and sets in RegExp', () => {
    const expr = '/[ali]+one?/';
    const str = 'Does it find alone or lion? May one or alion? ';

    const [matched, matchList] = match(expr, str);
    expect(matched).toBe(true);
    expect(matchList.length).toBe(3);

    let [pos, length] = matchList[0];
    expect(pos).toBe(13);
    expect(length).toBe(5);

    [pos, length] = matchList[1];
    expect(pos).toBe(22);
    expect(length).toBe(4);

    [pos, length] = matchList[2];
    expect(pos).toBe(39);
    expect(length).toBe(5);
  });
});