export const formatTime = (ms) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const cantHoras = Math.floor(totalSeconds / 3600);
  const restHoras = totalSeconds % 3600;
  const cantMinut = Math.floor(restHoras / 60);
  const cantSegun = restHoras % 60;
  const pad = (value) => value.toString().padStart(2, '0');
  return `${pad(cantHoras)}:${pad(cantMinut)}:${pad(cantSegun)}`;
};

/**
 * Returns the day number of the next day.
 * @example If today is the 2nd, it returns 3.
 * @example On December 31st it returns 1 (January).
 */
export const nextDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.getDate();
};

/**
 * Milliseconds left until 00:05 of the next month, when the navigation time
 * of the Nauta connection is renewed.
 */
export const msToNextFirstDate = (currentDate = new Date()) => {
  const nextMonthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1,
    0,
    5,
    0,
    0
  );
  return nextMonthStart.getTime() - currentDate.getTime();
};

/**
 * Date of the next renewal (00:05 of the next month).
 */
export const nextFirstDate = (currentDate = new Date()) =>
  new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1, 0, 5, 0, 0);
