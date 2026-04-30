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

export function parseVideoTimeToSeconds(rawTime) {
  if (rawTime === null || rawTime === undefined) {
    return;
  }

  const value = String(rawTime).trim();
  if (!value) {
    return;
  }

  if (/^\d+$/.test(value)) {
    return Number.parseInt(value, 10);
  }

  const normalized = value.toLowerCase();
  const timeRegex = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
  const matches = normalized.match(timeRegex);

  if (!matches) {
    return;
  }

  const [, hours = "0", minutes = "0", seconds = "0"] = matches;
  const hasAtLeastOneUnit =
    hours !== "0" || minutes !== "0" || seconds !== "0";

  if (!hasAtLeastOneUnit) {
    return;
  }

  return (
    Number.parseInt(hours, 10) * 3600 +
    Number.parseInt(minutes, 10) * 60 +
    Number.parseInt(seconds, 10)
  );
}
