import moment from "moment";

export const parseServerDate = (date: number): string => {
  return moment(date, "x").format("DD.MM.YYYY hh:mm");
};
