const {
  addValues,
  stringifyValue,
  invertBoolean,
  convertToNumber,
  coerceToType,
} = require("./dataTransformations");

describe("addValues", () => {
  test("adds two numbers", () => {
    expect(addValues(5, 3)).toBe(8);
  });

  test("concatenates two strings", () => {
    expect(addValues("hello", "world")).toBe("helloworld");
  });

  test("should concatenate two arrays", () => {
    expect(addValues([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
  });

  test("should handle empty arrays", () => {
    expect(addValues([], [])).toEqual([]);
    expect(addValues([], [1, 2])).toEqual([1, 2]);
    expect(addValues([1, 2], [])).toEqual([1, 2]);
  });

  test('should merge two objects with unique keys', () => {
    expect(addValues({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  test('should overwrite properties from the first object with properties from the second object', () => {
    expect(addValues({ a: 1, b: 3 }, { b: 2, c: 4 })).toEqual({ a: 1, b: 2, c: 4 });
  });

  test('should handle empty objects', () => {
    expect(addValues({}, {})).toEqual({});
    expect(addValues({}, { a: 1 })).toEqual({ a: 1 });
    expect(addValues({ b: 2 }, {})).toEqual({ b: 2 });
  });

  test('should throw an error if objects cannot be merged (like with conflicting types)', () => {
    // Assuming we are not handling objects with non-serializable values like functions
    const objectWithFunction = { a: function() {} };
    const normalObject = { b: 2 };
    expect(() => addValues(objectWithFunction, normalObject)).toThrow(Error);
  });

  test("adds two BigInt values", () => {
    expect(addValues(BigInt(10), BigInt(20))).toBe(BigInt(30));
  });

  test("throws error on mismatched types", () => {
    expect(() => addValues(5, "test")).toThrow(
      "Values must be of the same type for addition."
    );
  });
});

describe("stringifyValue", () => {
  test("converts an array to JSON string", () => {
    expect(stringifyValue([1, 2, 3])).toBe("[1,2,3]");
  });

  test("converts a number to string", () => {
    expect(stringifyValue(123)).toBe("123");
  });
});

describe("invertBoolean", () => {
  test("inverts true to false", () => {
    expect(invertBoolean(true)).toBe(false);
  });

  test("throws error on non-boolean", () => {
    expect(() => invertBoolean(123)).toThrow("Value must be a boolean.");
  });
});

describe("convertToNumber", () => {
  test("converts string to number", () => {
    expect(convertToNumber("12")).toBe(12);
  });

  test("throws error on non-convertible types", () => {
    expect(() => convertToNumber("abc")).toThrow(
      "Cannot convert value to a number."
    );
  });
});

describe("coerceToType", () => {
  test("coerces string to number", () => {
    expect(coerceToType("123", "number")).toBe(123);
  });

  test("throws error on invalid coercion", () => {
    expect(() => coerceToType("abc", "object")).toThrow(
      "Cannot coerce value to an object."
    );
  });
});
