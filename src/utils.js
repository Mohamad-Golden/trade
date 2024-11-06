export default function roundNumber(num, decimal) {
  const coefficient = decimal ? 10 ** decimal : 1;
  return Math.round((num + Number.EPSILON) * coefficient) / coefficient;
}
