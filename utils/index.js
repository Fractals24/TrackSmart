/**
 * Formats a number into Indian currency format with suffixes (e.g., 1L, 1.5Cr).
 * @param {number} num - The number to format.
 * @returns {string} - The formatted number as a string.
 */

const formatNumber = (num) => {
  if (num >= 1e7) { // 1 Crore = 1e7
    return (num / 1e7).toFixed(1).replace(/\.0$/, "") + "Cr";
  }
  if (num >= 1e5) { // 1 Lakh = 1e5
    return (num / 1e5).toFixed(1).replace(/\.0$/, "") + "L";
  }
  if (num >= 1e3) { // Thousands
    return num.toLocaleString('en-IN');
  }
  return num.toString();
};

export default formatNumber;