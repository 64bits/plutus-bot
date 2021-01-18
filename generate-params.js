const { encode } = require('js-base64');
const referenceParams = require('./reference-params');
const randomColor = require('randomcolor');

function generateSymbolObject(symbol) {
  return {
    "symbol":`${symbol}`,
    "symbolObject":{
      "symbol":`${symbol}`
    },
    "periodicity":1,
    "interval":"day",
    "timeUnit":null,
    "setSpan":{
      "multiplier":3,
      "base":"month",
      "periodicity":{
        "period":1,
        "interval":"day"
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

module.exports = function ({ symbols }) {
  let currentParams = JSON.parse(JSON.stringify(referenceParams));
  symbols.forEach((symbol) => {
    currentParams.symbols.push(generateSymbolObject(symbol))
  });
  return encode(JSON.stringify(currentParams));
};
