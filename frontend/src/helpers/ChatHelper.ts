export const truncateTitle = (title: string, length: number = 20): string => {
  return title.length > length ? title.substring(0, length) + "..." : title;
};
