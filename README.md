### Homework 2: Data Transformation Functions

This JavaScript library provides advanced data transformation functions with the following features:

- **addValues:** Accepts two arguments of any type and performs the appropriate addition operation based on the types of the arguments. The function returns the result of the addition. If the addition is not possible, it throws an error.

- **stringifyValue:** Accepts a single argument of any type and converts it to a string representation. For objects and arrays, it uses JSON.stringify() for serialization. For other types, it uses the appropriate built-in methods or operations to convert them to strings.

- **invertBoolean:** Accepts a single boolean argument and returns its inverted value. If the argument is not a boolean, it throws an error.

- **convertToNumber:** Accepts a single argument of any type and attempts to convert it to a number. For strings, it uses parseFloat() or parseInt() for conversion. For other types, it uses appropriate operations or functions to perform the conversion. If the conversion is not possible, it throws an error.

- **coerceToType:** Accepts two arguments: value and type. It attempts to convert the value to the specified type using type coercion. The function returns the coerced value if successful. If the coercion is not possible, it throws an error.

*Optional:* Implement additional functions of your choice that demonstrate advanced type conversion scenarios or cater to specific use cases related to primitive types. You are encouraged to explore complex scenarios and push the limits of type conversion.
