// src/utils/dateUtils.js  (Example path)

/**
 * Gets the current date/time and formats it as YYYY-MM-DDTHH:mm:ss
 * using the system's local timezone.
 * @returns {string} The formatted timestamp string.
 */
export function getFormattedTimestamp() {
    const now = new Date();
  
    const year = now.getFullYear();
    // getMonth() is 0-indexed (0=Jan, 11=Dec), so add 1
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    // Construct the string in the desired format
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
  