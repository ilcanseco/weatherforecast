export const convertKelvinToCelcius = temp => {
  return Number.parseInt(temp - 273.15);
};

export const indexToDay = dayIndex => {
  switch (dayIndex) {
    case 1:
      return "Mon";

    case 2:
      return "Tue";

    case 3:
      return "Wed";

    case 4:
      return "Thu";

    case 5:
      return "Fri";

    case 6:
      return "Sat";

    default:
      return "Sun";
  }
};

export const handleRefresh = () => {
  document.location.reload(true);
};
