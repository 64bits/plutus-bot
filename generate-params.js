const { encode } = require('js-base64');
const referenceParams = require('./reference-params');
const randomColor = require('randomcolor');

function generateSymbolObject(symbol, period) {
  return {
    "symbol":`${symbol}`,
    "symbolObject":{
      "symbol":`${symbol}`
    },
    "periodicity":1,
    "interval":period[0],
    "timeUnit":null,
    "setSpan":{
      "multiplier":parseInt(period[1], 10),
      "base":period[2],
      "periodicity":{
        "period":1,
        "interval":period[0]
      },
      "maintainPeriodicity":true,
      "forceLoad":true
    },
    "id":`${symbol}`,
    "parameters":{
      "color": randomColor({ luminosity: 'dark' }),
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

module.exports = function ({ symbols, period }) {
  let parsedPeriod = period ? period.split(',') : ['day', '3', 'month'];
  let currentParams = JSON.parse(JSON.stringify(referenceParams(parsedPeriod)));
  symbols.forEach((symbol) => {
    currentParams.symbols.push(generateSymbolObject(symbol, parsedPeriod))
  });
  return encode(JSON.stringify(currentParams));
};
