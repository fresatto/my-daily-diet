"use client";

import { toZonedTime } from "date-fns-tz";

export function getTimeZone() {
  return new Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function parseDateToLocalUTC(date: string) {
  try {
    const isISODate = date.includes("T");

    if (isISODate) {
      return new Date(date);
    }

    const timeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;

    const dateInUtc = date.replace(" ", "T") + "Z";

    return toZonedTime(dateInUtc, timeZone);
  } catch (error) {
    throw new Error("Erro ao converter data para UTC" + error);
  }
}
