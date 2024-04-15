function canBeMerged(obj) {
  return Object.values(obj).every(
    (val) =>
      ["string", "number", "boolean", "bigint", "undefined", "symbol"].includes(
        typeof val
      ) || val === null
  );
}

module.exports = {
  canBeMerged,
};
