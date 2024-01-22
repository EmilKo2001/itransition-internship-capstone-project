const mostFreqStr = (array) => {
  const obj = {};

  array.forEach((ea) => {
    if (!obj[ea]) {
      obj[ea] = 1;
    } else {
      obj[ea]++;
    }
  });

  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .flat()
    .filter((key) => typeof key === "string");
};

module.exports = mostFreqStr;
