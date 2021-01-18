let colorIndex = 0;

const colors = [
  '#00894c',
  '#ae1125',
  '#006c84',
  '#e09c00',
  '#c73b0a',
  '#970064',
  '#4300ac',
  '#0061cb',
  '#79f4bd',
  '#ff8084',
  '#64f1d9',
  '#ffe786',
  '#ffbd74',
  '#ff80c5',
  '#ad6eff',
  '#72d3ff',
];

module.exports = function randomColor() {
  colorIndex = (colorIndex + 1) % colors.length;
  return colors[colorIndex];
}
