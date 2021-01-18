module.exports = (period) => ({
  "interval":period[0],
  "periodicity":1,
  "timeUnit":period[1],
  "candleWidth":18.387096774193548,
  "flipped":false,
  "volumeUnderlay":true,
  "adj":true,
  "crosshair":true,
  "chartType":"line",
  "extended":true,
  "marketSessions":{
    // "pre":true,
    // "post":true
  },
  "aggregationType":"ohlc",
  "chartScale":"percent",
  "panels":{
    "chart":{
      "percent":1,
      "display":"U",
      "chartName":"chart",
      "index":0,
      "yAxis":{
        "name":"chart",
        "position":null
      },
      "yaxisLHS":[

      ],
      "yaxisRHS":[
        "chart",
        "‌vol undr‌"
      ]
    }
  },
  "setSpan":{
    "multiplier":period[2],
    "base":period[3],
    "periodicity":{
      "period":1,
      "interval":period[0],
      "timeUnit": period[1],
    },
    "maintainPeriodicity":true,
    "forceLoad":true
  },
  "lineWidth":2,
  "stripedBackground":true,
  "events":true,
  "color":"#0081f2",
  "stripedBackgroud":true,
  "eventMap":{
    "corporate":{
      "divs":true,
      "splits":true
    },
    "sigDev":{

    }
  },
  "symbols":[
    // Included later
  ],
  "customRange":null,
  "studies":{
    "‌vol undr‌":{
      "type":"vol undr",
      "inputs":{
        "id":"‌vol undr‌",
        "display":"‌vol undr‌"
      },
      "outputs":{
        "Up Volume":"#00b061",
        "Down Volume":"#ff333a"
      },
      "panel":"chart",
      "parameters":{
        "widthFactor":0.45,
        "chartName":"chart",
        "panelName":"chart"
      }
    }
  }
});
