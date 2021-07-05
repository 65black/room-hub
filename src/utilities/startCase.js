/**
 * This function takes in a string and returns
 * the same string with the first letter of each word
 * transformed to uppercase.
 *
 * @param {string} input
 * @returns {string}
 */
export default function startCase(input) {
  const inputArray = input.split(' ');

  const transformed = inputArray.map((word) => {
    const firstLetter = word[0].toUpperCase();
    const rest = [...word].slice(1).join('');
    return `${firstLetter}${rest}`;
  });

  return transformed.join(' ');
}
