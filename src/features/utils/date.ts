import { DateTime } from "luxon";
import { TIMEZONE } from "../config";

export const dateFromISO = (iso: string) =>
  DateTime.fromISO(iso).setZone(TIMEZONE).toFormat("dd LLL yyyy , hh:mm a");
