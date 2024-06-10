export const formatDateToMonthYear = (date: string): string => {
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
  return formatter.format(new Date(date));
};

export const formatDateToDateString = (date: string): string => new Date(date).toDateString();
