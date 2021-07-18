export const toTitleCase = (toTransform) => {
  return toTransform.replace(/\b([a-z])/g, function (_, initial) {
    return initial.toUpperCase();
  });
};
