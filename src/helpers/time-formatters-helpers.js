export function msToHHMMSSTimeFormat(time) {
  return new Date(time).toISOString().slice(11, 19);
}

export function HHMMSSTimeFormatToMS(time) {
  return time
    .split(":")
    .reverse()
    .map((x) => Number.parseInt(x))
    .reduce((previousValue, currentValue, index) => {
      return previousValue + currentValue * 60 ** index;
    });
}
