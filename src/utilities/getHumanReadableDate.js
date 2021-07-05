/**
 * Convert's a trip creation date timestamp to human readable text in below format.
 * DD MM YYYY
 *
 * @param {number} timestamp
 * @returns {string}
 */
const getHumanReadableDate = (timestamp, language = 'en-GB') => {
  try {
    const formattedTimestamp = new Date(timestamp).getTime();

    const date = Intl.DateTimeFormat(language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(formattedTimestamp);

    return date;
  } catch (error) {
    return '';
  }
};

export default getHumanReadableDate;
