export default function (page) {
  return !isNaN(page) && Number.isInteger(page) && page > 0;
}
