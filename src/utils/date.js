import {
    addDays,
    format,
} from "date-fns";

export function formatDate(date) {
  return format(date, "dd/MM/yyyy");
}

export function getThreeDaysBefore(date) {
  return addDays(date, -3);
}