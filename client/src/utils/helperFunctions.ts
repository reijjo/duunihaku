export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };
  return new Intl.DateTimeFormat("fi-FI", options).format(date);
};

export const toInputDateValue = (date: Date) => {
  return date.toISOString().split("T")[0];
};
