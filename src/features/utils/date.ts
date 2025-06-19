import { DateTime } from "luxon";
import { TIMEZONE } from "../config";

export const dateTimeFromISO = (iso: string) =>
  DateTime.fromISO(iso).setZone(TIMEZONE).toFormat("dd LLL yyyy , hh:mm a");
export const dateFromISO = (iso: string) =>
  DateTime.fromISO(iso).setZone(TIMEZONE).toFormat("dd LLL yyyy");
