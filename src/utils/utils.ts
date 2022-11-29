import dayjs from "dayjs";

/**
 * function checks if data (given as timestamp) is in past.
 * @param {number} day - date as timestamp
 * @returns {boolean}
 */

const checkTimestampInPast = (day: number | null) => {
  if (day === null) return false;
  const selectedDay = day + (24 * 60 * 60);
  const today = dayjs().unix();
  if (today > selectedDay) {
    return true;
  };
  return false;
}

export { checkTimestampInPast };