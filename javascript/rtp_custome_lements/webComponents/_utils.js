/**
 * Checks if an array consists only of objects.
 * @param {Array} arr - The array to check.
 * @returns {boolean} True if the array contains only objects, false otherwise.
 */
export const rtpIsListObjects = (arr) =>
  Array.isArray(arr) && arr.every((item) => typeof item === "object");

/**
 * Checks if a value is a non-empty string.
 * @param {*} str - The value to check.
 * @returns {boolean} True if the value is a non-empty string, false otherwise.
 */
export const rtpIsString = (str) =>
  str && typeof str === "string" && str.length > 0;

/**
 * Finds the object with the most keys in an array of objects.
 * @param {Array} arr - An array of objects.
 * @returns {Object} The object with the most keys.
 */
export const rtpBiggestObject = (arr) =>
  arr.reduce(
    (prev, curr) => (Object.keys(prev) < Object.keys(curr) ? curr : prev),
    {}
  );

/**
 * Finds the object with the most keys in an array of objects.
 * @param {Array} arr - An array of objects.
 * @returns {Object} The object with the most keys.
 */
export const rtpUpperFirstChar = (str) => {
  if (rtpIsString(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  return str;
};

/**
 * Creates a promise that resolves after a specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise} A promise that resolves after the specified delay.
 */
export const rtpDelay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Converts a date into a time string (hours and minutes).
 * @param {Date|string|number} date - The date to convert.
 * @returns {string} The time string in 'HH:MM' format.
 */
export const rtpTransforDateTime = (date) =>
  `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;

/**
 * Converts a date into a date string (day and month).
 * @param {Date|string|number} date - The date to convert.
 * @returns {string} The date string in 'DD/MM' format.
 */
export const rtpTransforDate = (date) =>
  `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}`;


export const rtpUniques = (arrOne,arrTwo) => [...new Set([...arrOne,...arrTwo])];

export const rtpMinusArray = (arrOne,arrTwo) => {
  const hash = arrTwo.reduce((prev,curr)=>{prev[curr]=true;return prev; },{})
  return arrOne.filter((el)=>!(hash[el]))
};
