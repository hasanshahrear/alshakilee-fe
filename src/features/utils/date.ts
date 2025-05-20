import { DateTime } from "luxon";
import { TIMEZONE } from "../config";

export const dateFromISO = (iso: string) =>
  DateTime.fromISO(iso).setZone(TIMEZONE).toFormat("yyyy LLL dd, hh:mm a");
