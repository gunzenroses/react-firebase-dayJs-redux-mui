import dayjs from "dayjs";

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