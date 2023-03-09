export const convertToActualDate = (date: string) => {
  const newDate = new Date(parseInt(date));
  return newDate.toLocaleDateString();
};
