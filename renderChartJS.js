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
  opts.title.display = data.title.display;
  opts.title.text = data.title.text;

  opts.legend.display = data.legend.display;
  opts.legend.position = data.legend.position;

  opts.scales.xAxes[0].gridLines.display = data.scales.xAxes.gridLines.display;
  opts.scales.xAxes[0].gridLines.lineWidth =
    data.scales.xAxes.gridLines.lineWidth;

  opts.scales.yAxes[0].gridLines.display = data.scales.yAxes.gridLines.display;
  opts.scales.yAxes[0].gridLines.lineWidth =
    data.scales.yAxes.gridLines.lineWidth;

  opts.scales.xAxes[0].ticks.display = data.scales.xAxes.labels;
  opts.scales.yAxes[0].ticks.display = data.scales.yAxes.labels;

  opts.scales.xAxes[0].gridLines.color = data.scales.xAxes.gridLines.color;
  opts.scales.yAxes[0].gridLines.color = data.scales.yAxes.gridLines.color;

  opts.scales.xAxes[0].color = data.scales.xAxes.color;
  opts.scales.yAxes[0].color = data.scales.yAxes.color;

  opts.scales.xAxes[0].position = data.scales.xAxes.align;
  opts.scales.yAxes[0].position = data.scales.yAxes.align;

  opts.scales.xAxes[0].gridLines.drawTicks = data.scales.xAxes.ticks;
  opts.scales.yAxes[0].gridLines.drawTicks = data.scales.yAxes.ticks;

  // Axis Y color and thickness
  opts.scales.xAxes[0].gridLines.zeroLineColor = data.scales.yAxes.color;
  opts.scales.xAxes[0].gridLines.zeroLineWidth = data.scales.yAxes.thickness;
  // Axis X color and thickness
  opts.scales.yAxes[0].gridLines.zeroLineColor = data.scales.xAxes.color;
  opts.scales.yAxes[0].gridLines.zeroLineWidth = data.scales.xAxes.thickness;

  // Grid X lines
  opts.scales.xAxes[0].gridLines.borderDash =
    data.scales.xAxes.gridLines.type == "dotted"
      ? [
          data.chartHeight * data.scales.xAxes.gridLines.lineWidth * 0.002,
          data.chartHeight * data.scales.xAxes.gridLines.lineWidth * 0.02,
        ]
      : data.scales.xAxes.gridLines.type == "dashed"
      ? [
          data.chartHeight * data.scales.xAxes.gridLines.lineWidth * 0.01,
          data.chartHeight * data.scales.xAxes.gridLines.lineWidth * 0.01,
        ]
      : [data.chartWidth];

  // Grid Y lines
  opts.scales.yAxes[0].gridLines.borderDash =
    data.scales.yAxes.gridLines.type == "dotted"
      ? [
          data.chartWidth * data.scales.yAxes.gridLines.lineWidth * 0.002,
          data.chartWidth * data.scales.yAxes.gridLines.lineWidth * 0.02,
        ]
      : data.scales.yAxes.gridLines.type == "dashed"
      ? [
          data.chartWidth * data.scales.yAxes.gridLines.lineWidth * 0.01,
          data.chartWidth * data.scales.yAxes.gridLines.lineWidth * 0.01,
        ]
      : [data.chartHeight];

  // Y Axis type of line
  opts.scales.xAxes[0].gridLines.zeroLineBorderDash =
    data.scales.yAxes.type == "dotted"
      ? [
          data.chartHeight * data.scales.yAxes.thickness * 0.002,
          data.chartHeight * data.scales.yAxes.thickness * 0.02,
        ]
      : data.scales.yAxes.type == "dashed"
      ? [
          data.chartHeight * data.scales.yAxes.thickness * 0.01,
          data.chartHeight * data.scales.yAxes.thickness * 0.01,
        ]
      : [data.chartHeight];
  // X Axis type of line
  opts.scales.yAxes[0].gridLines.zeroLineBorderDash =
    data.scales.xAxes.type == "dotted"
      ? [
          data.chartWidth * data.scales.xAxes.thickness * 0.002,
          data.chartWidth * data.scales.xAxes.thickness * 0.02,
        ]
      : data.scales.xAxes.type == "dashed"
      ? [
          data.chartWidth * data.scales.xAxes.thickness * 0.01,
          data.chartWidth * data.scales.xAxes.thickness * 0.01,
        ]
      : [data.chartWidth];
  opts.plugins.datalabels.labels.title.display = data.values.display;

  // No need to reverse the Y Axis for line chart
  if (data.chartType == "line") opts.scales.yAxes[0].ticks.reverse = false;
  // No axis is required for pie and doughnut charts
  if (data.chartType == "doughnut" || data.chartType == "pie") {
    opts.scales.xAxes[0].display = false;
    opts.scales.yAxes[0].display = false;
  }

  var ctype = data.chartType;

  opts.scales.xAxes[0].display = data.scales.xAxes.display;
  opts.scales.xAxes[0].scaleLabel.display =
    data.scales.xAxes.scaleLabel.display;
  opts.scales.xAxes[0].scaleLabel.labelString =
    data.scales.xAxes.scaleLabel.text;

  opts.scales.yAxes[0].display = data.scales.yAxes.display;
  opts.scales.yAxes[0].scaleLabel.display =
    data.scales.yAxes.scaleLabel.display;
  opts.scales.yAxes[0].scaleLabel.labelString =
    data.scales.yAxes.scaleLabel.text;
  if (ctype == "stacked hbar" || ctype == "stacked vbar") {
    opts.scales.xAxes[0].stacked = true;
    opts.scales.yAxes[0].stacked = true;
  }
  return;
}

function renderChartJS(data) {
  fillOptions(data);

  const chartWidth = data.chartWidth;
  const chartHeight = data.chartHeight;

  // generate chart
  var canvasElement = document.getElementById("canvas");
  const ctx = canvasElement.getContext("2d");

  // clear the previous drawings
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // set chart size
  canvasElement.width = parseInt(chartWidth);
  canvasElement.height = chartHeight;
  var chartType = data.chartType;
  if (chartType === "stacked hbar") chartType = "horizontalBar";
  else if (chartType === "stacked vbar") chartType = "bar";

  console.log(JSON.stringify(opts));
  new Chart(ctx, {
    type: chartType,
    data: data.chartData,
    options: opts,
  });
}
