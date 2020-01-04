export const getRandomNumber = (min=1, max=100) => {
  return Math.round(min + Math.random() * (max - min));
}

export const capitalize = text => {
  if (typeof text !== 'string') return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}