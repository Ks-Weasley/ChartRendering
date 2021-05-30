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
        display: true,
        stacked: true,
        barPercentage: 1,
        scaleLabel: {
          display: true,
          labelString: "Month",
        },
        gridLines: {
          circular: true,
          display: true,
          lineWidth: 2.0,
        },
        ticks: {
          enabled: true,
          fontColor: "#666",
          fontFamily: "Arial',serif",
          fontSize: 20,
        },
      },
    ],
    yAxes: [
      {
        display: true,
        stacked: true,
        barPercentage: 1,
        categoryPercentage: 0.6,
        scaleLabel: {
          display: true,
          labelString: "Value",
        },
        gridLines: {
          circular: true,
          display: true,
          lineWidth: 2.0,
        },
        ticks: {
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
          font: {
            weight: "bold",
          },
        },
        value: {
          color: "green",
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
  opts.scales.xAxes[0].gridLines.lineWidth = data.scales.xAxes.gridLines.lineWidth;

  opts.scales.yAxes[0].gridLines.display = data.scales.yAxes.gridLines.display;
  opts.scales.yAxes[0].gridLines.lineWidth = data.scales.yAxes.gridLines.lineWidth;

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
