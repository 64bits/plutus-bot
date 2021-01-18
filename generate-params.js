const { encode } = require('js-base64');
const referenceParams = require('./reference-params');
const randomColor = require('./random-color');

const periods = {
  '1d': [1, 'minute', 1, 'day'],
  '5d': [5, 'minute', 5, 'day'],
  '1m': [1, 'day', 1, 'month'],
  '3m': [1, 'day', 3, 'month'],
  '6m': [1, 'day', 6, 'month'],
  '1y': [1, 'day', 1, 'year'],
  '2y': [1, 'week', 2, 'year'],
  '5y': [1, 'week', 5, 'year'],
  'max': [1, 'week', 1, 'all'],
};

function generateSymbolObject(symbol, period) {
  return {
    "symbol":`${symbol}`,
    "symbolObject":{
      "symbol":`${symbol}`
    },
    "periodicity":1,
    "interval":period[0] === 'minute' ? 5 : 1,
    "timeUnit":period[0],
    "setSpan":{
      "multiplier":parseInt(period[1], 10),
      "base":period[2],
      "periodicity":{
        "period":1,
        "interval":period[0] === 'minute' ? 5 : 1,
        "timeUnit":period[0],
      },
      "maintainPeriodicity":true,
      "forceLoad":true
    },
    "id":`${symbol}`,
    "parameters":{
      "color": randomColor(),
      "width":2,
      "isComparison":true,
      "shareYAxis":true,
      "chartName":"chart",
      "symbolObject":{
        "symbol":`${symbol}`
      },
      "panel":"chart",
      "fillGaps":false,
      "action":"add-series",
      "symbol":`${symbol}`,
      "gapDisplayStyle":"transparent",
      "name":`${symbol}`,
      "overChart":true,
      "useChartLegend":true,
      "heightPercentage":0.7,
      "opacity":1,
      "highlightable":true,
      "type":"line",
      "style":"stx_line_chart",
      "highlight":false
    }
  };
}

module.exports = function ({ symbols, userPeriod }) {
  let parsedPeriod = [1, 'day', 3, 'month'];
  if (userPeriod && Object.keys(periods).includes(userPeriod)) {
    parsedPeriod = periods[userPeriod];
  }
  let currentParams = JSON.parse(JSON.stringify(referenceParams(parsedPeriod)));
  symbols.forEach((symbol) => {
    currentParams.symbols.push(generateSymbolObject(symbol, parsedPeriod))
  });
  return encode(JSON.stringify(currentParams));
};

module.exports.allowedPeriods = Object.keys(periods);
