export const priorityKeys = (key: number) => {
  console.log('key', key);
  switch (key) {
    case 0:
      return 'High';
    case 1:
      return 'Medium';
    case 2:
      return 'Low';
    default:
      return 'Unknown';
  }
};
