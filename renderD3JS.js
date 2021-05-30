// Draws the graph using d3.js
class RenderD3JS {
  constructor() {}
  static options = {
    chartWidth: 600,
    chartHeight: 600,
    chartTheme: "#5083B4",
    chartInnerPadding: 0.4,
    chartType: "bar",
    legend: {
      display: true,
      position: "bottom",
    },
    title: {
      display: true,
      text: "My Chart",
    },
    values: {
      display: true,
      absolute: true,
      percentage: false,
      smooth: true,
    },
    scales: {
      xAxes: {
        display: true,
        color: "black",
        thickness: 1,
        align: "bottom",
        type: "solid",
        line: true,
        ticks: true,
        // Labels associated with the tick
        labels: true,
        // Label defining the axis
        scaleLabel: {
          display: true,
          text: "Vertical Label",
          color: "balck",

        },
        gridLines: {
          display: true,
          lineWidth: 0.5,
          color: "black",
          type: "solid",
        },
      },
      yAxes: {
        display: true,
        color: "black",
        thickness: 1,
        align: "left",
        type: "solid",
        line: true,
        ticks: true,
        // Labels associated with the tick
        labels: true,
        // Label defining the axis
        scaleLabel: {
          display: true,
          text: "Vertical Label",
          color: "balck",
        },
        gridLines: {
          display: true,
          lineWidth: 0.5,
          color: "black",
          type: "solid",
        },
      },
    },
  };

  dataProcessing(data) {
    this.options = data;

    this.options.scales.xAxes.gridLines.width =
      data.scales.xAxes.gridLines.lineWidth;
    this.options.scales.yAxes.gridLines.width =
      data.scales.yAxes.gridLines.lineWidth;

    if (this.options.scales.xAxes.display === false) {
      this.options.scales.xAxes.scaleLabel.display = false;
      this.options.scales.xAxes.line = false;
      this.options.scales.xAxes.ticks = false;
      this.options.scales.xAxes.labels = false;
      this.options.scales.xAxes.thickness = 0;
    }
    if (this.options.scales.yAxes.display === false) {
      this.options.scales.yAxes.scaleLabel.display = false;
      this.options.scales.yAxes.line = false;
      this.options.scales.yAxes.ticks = false;
      this.options.scales.yAxes.labels = false;
      this.options.scales.yAxes.thickness = 0;
    }
    // setting line decorator value - X Axis
    // Grid lines
    if (this.options.scales.xAxes.gridLines.type == "dotted")
      this.options.scales.xAxes.gridLines.type = {
        "stroke-dasharray":
          this.options.chartHeight *
            this.options.scales.xAxes.gridLines.width *
            0.002 +
          " , " +
          this.options.chartHeight * this.options.scales.xAxes.gridLines.width * 0.02,
        "stroke-linecap": "round",
      };
    else if (this.options.scales.xAxes.gridLines.type == "dashed")
      this.options.scales.xAxes.gridLines.type = {
        "stroke-dasharray":
          this.options.chartHeight *
            this.options.scales.xAxes.gridLines.width *
            0.01 +
          " , " +
          this.options.chartHeight * this.options.scales.xAxes.gridLines.width * 0.01,
        "stroke-linecap": "square",
      };
    else
      this.options.scales.xAxes.gridLines.type = {
        "stroke-dasharray": "0, 0",
        "stroke-linecap": "square",
      };
    // X Axis
    if (this.options.scales.xAxes.type == "dotted")
      this.options.scales.xAxes.type = {
        "stroke-dasharray":
          this.options.chartHeight *
            this.options.scales.xAxes.thickness *
            0.002 +
          " , " +
          this.options.chartHeight * this.options.scales.xAxes.thickness * 0.02,
        "stroke-linecap": "round",
      };
    else if (this.options.scales.xAxes.type == "dashed")
      this.options.scales.xAxes.type = {
        "stroke-dasharray":
          this.options.chartHeight *
            this.options.scales.xAxes.thickness *
            0.01 +
          " , " +
          this.options.chartHeight * this.options.scales.xAxes.thickness * 0.01,
        "stroke-linecap": "square",
      };
    else
      this.options.scales.xAxes.type = {
        "stroke-dasharray": "0, 0",
        "stroke-linecap": "square",
      };

    // setting line decorator value - Y Axis
    // Grid lines
    if (this.options.scales.yAxes.gridLines.type == "dotted")
      this.options.scales.yAxes.gridLines.type = {
        "stroke-dasharray":
          this.options.chartWidth *
            this.options.scales.yAxes.gridLines.width *
            0.002 +
          " , " +
          this.options.chartHeight * this.options.scales.yAxes.gridLines.width * 0.02,
        "stroke-linecap": "round",
      };
    else if (this.options.scales.yAxes.gridLines.type == "dashed")
      this.options.scales.yAxes.gridLines.type = {
        "stroke-dasharray":
          this.options.chartWidth * this.options.scales.yAxes.gridLines.width * 0.01 +
          " , " +
          this.options.chartHeight * this.options.scales.yAxes.gridLines.width * 0.01,
        "stroke-linecap": "square",
      };
    else
      this.options.scales.yAxes.gridLines.type = {
        "stroke-dasharray": "0, 0",
        "stroke-linecap": "square",
      };
    // Y axis
    if (this.options.scales.yAxes.type == "dotted")
      this.options.scales.yAxes.type = {
        "stroke-dasharray":
          this.options.chartWidth *
            this.options.scales.yAxes.thickness *
            0.002 +
          " , " +
          this.options.chartHeight * this.options.scales.yAxes.thickness * 0.02,
        "stroke-linecap": "round",
      };
    else if (this.options.scales.yAxes.type == "dashed")
      this.options.scales.yAxes.type = {
        "stroke-dasharray":
          this.options.chartWidth * this.options.scales.yAxes.thickness * 0.01 +
          " , " +
          this.options.chartHeight * this.options.scales.yAxes.thickness * 0.01,
        "stroke-linecap": "square",
      };
    else
      this.options.scales.yAxes.type = {
        "stroke-dasharray": "0, 0",
        "stroke-linecap": "square",
      };
  }

  main(data) {
    var graph;
    this.dataProcessing(data);
    // Drawing the chart
    if (this.options.chartType === "doughnut") {
      graph = new DoughnutChart(this.options);
      graph.main();
    } else if (this.options.chartType === "horizontalBar") {
      graph = new HorizontalBarGraph(this.options);
      graph.main();
    } else if (this.options.chartType === "pie") {
      graph = new PieChart(this.options);
      graph.main();
    } else if (this.options.chartType === "stacked hbar") {
      graph = new StackedHorizontalBarGraph(this.options);
      graph.main();
    } else if (this.options.chartType === "stacked vbar") {
      graph = new StackedVerticalBarGraph(this.options);
      graph.main();
    } else if (this.options.chartType === "bar") {
      graph = new VerticalBarGraph(this.options);
      graph.main();
    } else if(this.options.chartType === "line") {
      graph = new LineChart(this.options);
      graph.main();
    }
  }
}
