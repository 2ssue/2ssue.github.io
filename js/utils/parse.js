export const parseParams = (search) => {
  if (!search) return;
  return search
    .substr(1)
    .split('&')
    .map((value) => value.split('='))
    .reduce((acc, value) => {
      acc[decodeURIComponent(value[0].trim())] = decodeURIComponent(
        value[1].trim(),
      );
      return acc;
    }, {});
};
