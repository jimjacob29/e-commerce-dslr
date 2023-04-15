export const getRatingNumbers = (count: number) => {
  if (!count) {
    return 0;
  }
  if (count < 1000) {
    return `${count}`;
  } else if (count >= 1000 && count < 100000) {
    return `${(count / 1000).toFixed(1)}K`;
  } else {
    return `${(count / 100000).toFixed(1)}M`;
  }
};
