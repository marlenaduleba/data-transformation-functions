const {
  addValues,
  stringifyValue,
  invertBoolean,
  convertToNumber,
  coerceToType,
} = require("./dataTransformations");

// tests for addValues function
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

  test("should merge two objects with unique keys", () => {
    expect(addValues({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  test("should overwrite properties from the first object with properties from the second object", () => {
    expect(addValues({ a: 1, b: 3 }, { b: 2, c: 4 })).toEqual({
      a: 1,
      b: 2,
      c: 4,
    });
  });

  test("should handle empty objects", () => {
    expect(addValues({}, {})).toEqual({});
    expect(addValues({}, { a: 1 })).toEqual({ a: 1 });
    expect(addValues({ b: 2 }, {})).toEqual({ b: 2 });
  });

  test("should throw an error if objects cannot be merged (like with conflicting types)", () => {
    // Assuming we are not handling objects with non-serializable values like functions
    const objectWithFunction = { a: function () {} };
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

// tests for stringifyValue function
describe("stringifyValue", () => {
  test("should convert a string to string", () => {
    expect(stringifyValue("hello")).toBe("hello");
  });

  test("should convert a number to string", () => {
    expect(stringifyValue(123)).toBe("123");
  });

  test("should convert a boolean to string", () => {
    expect(stringifyValue(true)).toBe("true");
    expect(stringifyValue(false)).toBe("false");
  });

  test("should convert null to string", () => {
    expect(stringifyValue(null)).toBe("null");
  });

  test("should convert undefined to string", () => {
    expect(stringifyValue(undefined)).toBe("undefined");
  });
  test("converts an array to JSON string", () => {
    expect(stringifyValue([1, 2, 3])).toBe("[1,2,3]");
  });

  test("should convert an object to JSON string", () => {
    expect(stringifyValue({ a: 1, b: 2 })).toBe('{"a":1,"b":2}');
  });

  test("should handle cyclic references gracefully", () => {
    const cyclicObj = { a: 1 };
    cyclicObj.b = cyclicObj; // Introduce cyclic reference
    expect(stringifyValue(cyclicObj)).toBe('{"a":1,"b":[Circular]}');
  });
});

// tests for invertBoolean function
describe("invertBoolean", () => {
  test("inverts true to false", () => {
    expect(invertBoolean(true)).toBe(false);
  });

  test("throws error on non-boolean", () => {
    expect(() => invertBoolean(123)).toThrow("Value must be a boolean.");
  });
});

// tests for convertToNumber function
describe("convertToNumber", () => {
  test("converts string to number", () => {
    expect(convertToNumber("12")).toBe(12);
  });

  test("converts number to number", () => {
    expect(convertToNumber(12)).toBe(12);
  });

  test("converts floating point string to number", () => {
    expect(convertToNumber("3.14")).toBe(3.14);
  });

  test("converts scientific notation string to number", () => {
    expect(convertToNumber("2.5e3")).toBe(2500);
  });

  test("converts string with special characters to number", () => {
    expect(convertToNumber("1,000")).toBe(1000);
  });

  test("throws error on string with space", () => {
    expect(() => convertToNumber("12 34")).toThrow(
      "Cannot convert value to a number."
    );
  });

  test("throws error on undefined value", () => {
    expect(() => convertToNumber(undefined)).toThrow(
      "Cannot convert value to a number."
    );
  });

  test("throws error on non-convertible types", () => {
    expect(() => convertToNumber("abc")).toThrow(
      "Cannot convert value to a number."
    );
  });
});

// tests for coerceToType function
describe("coerceToType", () => {
  test("coerces string to number", () => {
    expect(coerceToType("123", "number")).toBe(123);
  });

  test("coerces string to boolean", () => {
    expect(coerceToType("true", "boolean")).toBe(true);
  });

  test("coerces string to object", () => {
    expect(coerceToType('{"key": "value"}', "object")).toEqual({
      key: "value",
    });
  });

  test("throws error on invalid JSON string", () => {
    expect(() => coerceToType("{key: 'value'}", "object")).toThrow(
      "Cannot coerce value to an object."
    );
  });

  test("throws error on invalid coercion", () => {
    expect(() => coerceToType("abc", "object")).toThrow(
      "Cannot coerce value to an object."
    );
  });
});
