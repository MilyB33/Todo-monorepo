import moment from "moment";

export const formatDate = (date: string) => {
  if (moment(date) > moment().add(4, "days")) {
    return moment(date).calendar();
  } else return moment(date).format("YYYY-MM-DD HH:mm");
};
