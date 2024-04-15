const { canBeMerged } = require("./helpers");

function addValues(val1, val2) {
  if (typeof val1 !== typeof val2) {
    throw new Error("Values must be of the same type for addition.");
  }
  if (typeof val1 === "string") {
    return val1 + val2;
  } else if (typeof val1 === "number") {
    return val1 + val2;
  } else if (typeof val1 === "bigint") {
    return val1 + val2;
  } else if (Array.isArray(val1) && Array.isArray(val2)) {
    return [...val1, ...val2];
  } else if (
    typeof val1 === "object" &&
    val1 !== null &&
    typeof val2 === "object" &&
    val2 !== null
  ) {
    if (!canBeMerged(val1) || !canBeMerged(val2)) {
      throw new Error("Objects contain non-mergable properties.");
    }
    return { ...val1, ...val2 };
  } else {
    throw new Error("Addition of given types is not supported.");
  }
}

function stringifyValue(value) {
  const visited = new Set();

  const stringify = (val) => {
    if (typeof val === "object" && val !== null) {
      if (visited.has(val)) {
        return "[Circular]";
      }
      visited.add(val);
      if (Array.isArray(val)) {
        const arrString = val.map((item) => stringify(item)).join(",");
        return `[${arrString}]`;
      } else {
        const keys = Object.keys(val);
        const objString = keys
          .map((key) => `${JSON.stringify(key)}:${stringify(val[key])}`)
          .join(",");
        return `{${objString}}`;
      }
    }
    return String(val);
  };

  return stringify(value);
}

function invertBoolean(value) {
  if (typeof value !== "boolean") {
    throw new Error("Value must be a boolean.");
  }
  return !value;
}

function convertToNumber(value) {
  if (typeof value === "string") {
    value = value.trim().replace(/,/g, "");

    if (value === "") return 0;

    if (/^[\d.-]+(?:e-?\d+)?$/.test(value)) {
      const parsed = parseFloat(value);
      if (!isNaN(parsed)) {
        return parsed;
      }
    }
    throw new Error("Cannot convert value to a number.");
  }

  const num = Number(value);
  if (isNaN(num)) {
    throw new Error("Cannot convert value to a number.");
  }
  return num;
}

function coerceToType(value, type) {
  switch (type) {
    case "string":
      return stringifyValue(value);
    case "number":
      return convertToNumber(value);
    case "boolean":
      return Boolean(value);
    case "object":
      try {
        return JSON.parse(value);
      } catch {
        throw new Error("Cannot coerce value to an object.");
      }
    default:
      throw new Error(`Unsupported type conversion to ${type}.`);
  }
}

module.exports = {
  addValues,
  stringifyValue,
  invertBoolean,
  convertToNumber,
  coerceToType,
};
