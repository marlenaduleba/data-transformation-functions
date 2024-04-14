const { addValues, stringifyValue, invertBoolean, convertToNumber, coerceToType } = require('./dataTransformations');

describe('addValues', () => {
  test('adds two numbers', () => {
    expect(addValues(5, 3)).toBe(8);
  });

  test('concatenates two strings', () => {
    expect(addValues('hello', 'world')).toBe('helloworld');
  });

  test('throws error on mismatched types', () => {
    expect(() => addValues(5, 'test')).toThrow('Values must be of the same type for addition.');
  });
});

describe('stringifyValue', () => {
  test('converts an array to JSON string', () => {
    expect(stringifyValue([1, 2, 3])).toBe('[1,2,3]');
  });

  test('converts a number to string', () => {
    expect(stringifyValue(123)).toBe('123');
  });
});

describe('invertBoolean', () => {
  test('inverts true to false', () => {
    expect(invertBoolean(true)).toBe(false);
  });

  test('throws error on non-boolean', () => {
    expect(() => invertBoolean(123)).toThrow('Value must be a boolean.');
  });
});

describe('convertToNumber', () => {
  test('converts string to number', () => {
    expect(convertToNumber('12')).toBe(12);
  });

  test('throws error on non-convertible types', () => {
    expect(() => convertToNumber('abc')).toThrow('Cannot convert value to a number.');
  });
});

describe('coerceToType', () => {
  test('coerces string to number', () => {
    expect(coerceToType('123', 'number')).toBe(123);
  });

  test('throws error on invalid coercion', () => {
    expect(() => coerceToType('abc', 'object')).toThrow('Cannot coerce value to an object.');
  });
});
