function addValues(val1, val2) {
  if (typeof val1 !== typeof val2) {
    throw new Error("Values must be of the same type for addition.");
  }
  if (typeof val1 === "string") {
    return val1 + val2;
  } else if (typeof val1 === "number") {
    return val1 + val2;
  } else if (Array.isArray(val1) && Array.isArray(val2)) {
    return [...val1, ...val2];
  } else if (
    typeof val1 === "object" &&
    val1 !== null &&
    typeof val2 === "object" &&
    val2 !== null
  ) {
    return { ...val1, ...val2 };
  } else {
    throw new Error("Addition of given types is not supported.");
  }
}

function stringifyValue(value) {
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }
  return String(value);
}

function invertBoolean(value) {
  if (typeof value !== "boolean") {
    throw new Error("Value must be a boolean.");
  }
  return !value;
}

function convertToNumber(value) {
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error("Cannot convert value to a number.");
  }
  return num;
}

function coerceToType(value, type) {
  switch (type) {
    case "string":
      return String(value);
    case "number":
      return Number(value);
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
    coerceToType
};
