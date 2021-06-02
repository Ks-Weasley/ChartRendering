// Draws the graph using chart.js

var opts = {
  responsive: false,
  //maintainAspectRatio : true,
  scaleShowGridLines: false,
  legend: {
    display: true,
    position: "top",
  },
  title: {
    display: true,
    text: "My Chart",
  },
  tooltips: {
    mode: "index",
    intersect: false,
  },
  hover: {
    mode: "nearest",
    intersect: true,
  },
  scales: {
    xAxes: [
      {
        position: "bottom",
        display: true,
        stacked: true,
        barPercentage: 1,
        scaleLabel: {
          display: true,
          labelString: "Month",
        },
        gridLines: {
          drawBorder: false,
          zeroLineWidth: 1,
          zeroLineColor: "black",
          zeroLineBorderDash: [1],
          drawTicks: true,
          borderDash: [1],
          color: "black",
          circular: true,
          display: true,
          lineWidth: 2.0,
        },
        ticks: {
          display: true,
          fontColor: "#666",
          fontFamily: "Arial',serif",
          fontSize: 20,
        },
      },
    ],
    yAxes: [
      {
        position: "left",
        display: true,
        stacked: true,
        barPercentage: 1,
        categoryPercentage: 0.6,
        scaleLabel: {
          display: true,
          labelString: "Value",
        },
        gridLines: {
          drawBorder: false,
          zeroLineBorderDash: [1],
          zeroLineColor: "red",
          borderDash: [1],
          drawTicks: true,
          color: "black",
          circular: true,
          display: true,
          lineWidth: 2.0,
        },
        ticks: {
          reverse: true,
          display: true,
          fontFamily: "Arial',serif",
          fontSize: 20,
        },
      },
    ],
  },
  plugins: {
    datalabels: {
      color: "black",
      labels: {
        title: {
          display: false,
          font: {
            weight: "bold",
          },
        },
      },
    },
  },
};

function fillOptions(data) {
  // Title settings
  opts.title.display = data.title.text.length == 0 ? false: true;
  opts.title.text = data.title.text;

  // Value label settings
  opts.plugins.datalabels.labels.title.display = (data.values.enabled === "true");

  // Legend settings
  opts.legend.display = (data.legend.enabled === "true");
  opts.legend.position = data.legend.verticalAlign;
  
  // 
  opts.scales.xAxes[0].gridLines.display = (data.xAxis.gridLines.enabled === "true");
  opts.scales.xAxes[0].gridLines.lineWidth =
    data.xAxis.gridLines.width;

  opts.scales.yAxes[0].gridLines.display = (data.yAxis.gridLines.enabled === "true");
  opts.scales.yAxes[0].gridLines.lineWidth =
    data.yAxis.gridLines.width;

  opts.scales.xAxes[0].ticks.display = (data.xAxis.labels.enabled === "true");
  opts.scales.yAxes[0].ticks.display = (data.yAxis.labels.enabled === "true");

  opts.scales.xAxes[0].gridLines.color = data.xAxis.gridLines.color;
  opts.scales.yAxes[0].gridLines.color = data.yAxis.gridLines.color;

  opts.scales.xAxes[0].color = data.xAxis.lineColor;
  opts.scales.yAxes[0].color = data.yAxis.lineColor;

  opts.scales.xAxes[0].position = data.xAxis.opposite === "true" ? "top" : "bottom";
  opts.scales.yAxes[0].position = data.yAxis.opposite === "true" ? "right" : "left";

  opts.scales.xAxes[0].gridLines.drawTicks = data.xAxis.tickLength == 0 ? false: true;
  opts.scales.yAxes[0].gridLines.drawTicks = data.yAxis.tickLength == 0 ? false: true;

  // Axis Y color and thickness
  opts.scales.xAxes[0].gridLines.zeroLineColor = data.yAxis.lineColor;
  opts.scales.xAxes[0].gridLines.zeroLineWidth = data.yAxis.lineWidth;
  // Axis X color and thickness
  opts.scales.yAxes[0].gridLines.zeroLineColor = data.xAxis.lineColor;
  opts.scales.yAxes[0].gridLines.zeroLineWidth = data.xAxis.lineWidth;

  // Grid X lines
  opts.scales.xAxes[0].gridLines.borderDash =
    data.xAxis.gridLines.dashType == "dotted"
      ? [
          data.chart.height * data.xAxis.gridLines.width * 0.002,
          data.chart.height * data.xAxis.gridLines.width * 0.02,
        ]
      : data.xAxis.gridLines.dashType == "dashed"
      ? [
          data.chart.height * data.xAxis.gridLines.width * 0.01,
          data.chart.height * data.xAxis.gridLines.width * 0.01,
        ]
      : [data.chart.width];

  // Grid Y lines
  opts.scales.yAxes[0].gridLines.borderDash =
    data.yAxis.gridLines.dashType == "dotted"
      ? [
          data.chart.width * data.yAxis.gridLines.width * 0.002,
          data.chart.width * data.yAxis.gridLines.width * 0.02,
        ]
      : data.yAxis.gridLines.dashType == "dashed"
      ? [
          data.chart.width * data.yAxis.gridLines.width * 0.01,
          data.chart.width * data.yAxis.gridLines.width * 0.01,
        ]
      : [data.chart.height];

  // Y Axis type of line
  opts.scales.xAxes[0].gridLines.zeroLineBorderDash =
    data.yAxis.dashType == "dotted"
      ? [
          data.chart.height * data.yAxis.lineWidth * 0.002,
          data.chart.height * data.yAxis.lineWidth * 0.02,
        ]
      : data.yAxis.dashType == "dashed"
      ? [
          data.chart.height * data.yAxis.lineWidth * 0.01,
          data.chart.height * data.yAxis.lineWidth * 0.01,
        ]
      : [data.chart.height];
  // X Axis type of line
  opts.scales.yAxes[0].gridLines.zeroLineBorderDash =
    data.xAxis.dashType == "dotted"
      ? [
          data.chart.width * data.xAxis.lineWidth * 0.002,
          data.chart.width * data.xAxis.lineWidth * 0.02,
        ]
      : data.xAxis.dashType == "dashed"
      ? [
          data.chart.width * data.xAxis.lineWidth * 0.01,
          data.chart.width * data.xAxis.lineWidth * 0.01,
        ]
      : [data.chart.width];
  
  // No need to reverse the Y Axis for line chart
  if (data.chart.type == "line") opts.scales.yAxes[0].ticks.reverse = false;
  // No axis is required for pie and doughnut charts
  if (data.chart.type == "doughnut" || data.chart.type == "pie") {
    opts.scales.xAxes[0].display = false;
    opts.scales.yAxes[0].display = false;
  }

  var ctype = data.chart.type;

  opts.scales.xAxes[0].display = data.xAxis.enabled;
  opts.scales.xAxes[0].scaleLabel.display =
    data.xAxis.title.text.length ? false:true ;
  opts.scales.xAxes[0].scaleLabel.labelString =
    data.xAxis.title.text;

  opts.scales.yAxes[0].display = data.yAxis.enabled;
  opts.scales.yAxes[0].scaleLabel.display =
    data.yAxis.title.text.length ? false:true ;
  opts.scales.yAxes[0].scaleLabel.labelString =
    data.yAxis.title.text;
  if (ctype == "stacked hbar" || ctype == "stacked vbar") {
    opts.scales.xAxes[0].stacked = true;
    opts.scales.yAxes[0].stacked = true;
  }
  return;
}

function renderChartJS(data) {
  fillOptions(data);

  const chartWidth = data.chart.width;
  const chartHeight = data.chart.height;

  // generate chart
  var canvasElement = document.getElementById("canvas");
  const ctx = canvasElement.getContext("2d");

  // clear the previous drawings
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // set chart size
  canvasElement.width = parseInt(chartWidth);
  canvasElement.height = chartHeight;
  var chartType = data.chart.type;
  const chartData = setChartData(chartType);
  
  if (chartType === "stacked hbar") chartType = "horizontalBar";
  else if (chartType === "stacked vbar") chartType = "bar";
  
  
  console.log(JSON.stringify(opts));
  new Chart(ctx, {
    type: chartType,
    data: chartData,
    options: opts,
  });
}

function setChartData(chartType) {
  "use strict";

  // Chart type
  if (chartType === "line") return chartData.lineData;
  else if (chartType === "bar") return chartData.vbarData;
  else if (chartType === "pie") return chartData.pieData;
  else if (chartType === "radar") return chartData.radarData;
  else if (chartType === "doughnut") return chartData.doughnutData;
  else if (chartType === "horizontalBar") return chartData.hbarData;
  else if (chartType === "verticalBar") return chartData.vbarData;
  return chartData.hbarstackedData;
}
