import { toZonedTime } from "date-fns-tz";

export function parseDateToLocalUTC(date: string) {
  const timeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;

  const dateInUtc = date.replace(" ", "T") + "Z";

  return toZonedTime(dateInUtc, timeZone);
}
