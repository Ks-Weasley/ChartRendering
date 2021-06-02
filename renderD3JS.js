// Draws the graph using d3.js
class RenderD3JS {
  
  options = {
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
      smooth: true,
    },
    scales: {
      xAxis: {
        display: true,
        color: "black",
        thickness: 1,
        align: "bottom",
        type: "solid",
        // Enables/disables only the line; other ticks will be availble; Currently not implemented but a single line of code;
        line: true,
        ticks: true,
        // Labels associated with the tick
        labels: true,
        // Label defining the axis
        scaleLabel: {
          display: true,
          text: "Vertical Label",
          color: "black",
        },
        gridLines: {
          display: true,
          width: 0.5,
          color: "black",
          type: "solid",
        },
      },
      yAxis: {
        display: true,
        color: "black",
        thickness: 1,
        align: "left",
        type: "solid",
        // Enables/disables only the line; other ticks will be availble; Currently not implemented but a single line of code;
        line: true,
        ticks: true,
        // Labels associated with the tick
        labels: true,
        // Label defining the axis
        scaleLabel: {
          display: true,
          text: "Vertical Label",
          color: "black",
        },
        gridLines: {
          display: true,
          width: 0.5,
          color: "black",
          type: "solid",
        },
      },
    },
  };
  constructor() {}
  
  dataPreprocessing(data) {
    // Chart items
    this.options.chartHeight = data.chart.height;
    this.options.chartWidth = data.chart.width;
    this.options.chartType = data.chart.type;

    // Title settings
    this.options.title.display = data.title.text.length == 0 ? false : true;
    this.options.title.text = data.title.text;

    // Legend settings
    this.options.legend.display = (data.legend.enabled === "true");
    this.options.legend.position = data.legend.verticalAlign;

    // Value settings
    this.options.values.display = (data.values.enabled === "true");
    this.options.values.absolute = (data.values.absolute === "true");
    this.options.values.smooth = (data.values.smooth === "true");

    // X Axis settings
    this.options.scales.xAxis.display = (data.xAxis.enabled === "true");
    this.options.scales.xAxis.color = data.xAxis.lineColor;
    this.options.scales.xAxis.thickness = data.xAxis.lineWidth;
    this.options.scales.xAxis.align =
      data.xAxis.opposite === "true" ? "top" : "bottom";
    this.options.scales.xAxis.type = data.xAxis.dashType;
    this.options.scales.xAxis.line = (data.xAxis.enabled === "true");
    this.options.scales.xAxis.ticks = data.xAxis.tickLength == 0 ? false : true;
    this.options.scales.xAxis.labels = (data.xAxis.labels.enabled === "true");
    this.options.scales.xAxis.scaleLabel.display = data.xAxis.title.text.length == 0
      ? false
      : true;
    this.options.scales.xAxis.scaleLabel.text = data.xAxis.title.text;
    this.options.scales.xAxis.scaleLabel.color = data.xAxis.title.color;
    this.options.scales.xAxis.gridLines.display = (
      data.xAxis.gridLines.enabled === "true"
    );
    this.options.scales.xAxis.gridLines.width = data.xAxis.gridLines.width;
    this.options.scales.xAxis.gridLines.color = data.xAxis.gridLines.color;
    this.options.scales.xAxis.gridLines.type = data.xAxis.gridLines.dashType;

    // Y Axis settings
    this.options.scales.yAxis.display = (data.yAxis.enabled === "true");
    this.options.scales.yAxis.color = data.yAxis.lineColor;
    this.options.scales.yAxis.thickness = data.yAxis.lineWidth;
    this.options.scales.yAxis.align =
      data.yAxis.opposite === "true" ? "right" : "left";
    this.options.scales.yAxis.type = data.yAxis.dashType;
    this.options.scales.yAxis.line = (data.yAxis.enabled === "true");
    this.options.scales.yAxis.ticks = data.yAxis.tickLength == 0 ? false : true;
    this.options.scales.yAxis.labels = (data.yAxis.labels.enabled === "true");
    this.options.scales.yAxis.scaleLabel.display = data.yAxis.title.text.length == 0
      ? false
      : true;
    this.options.scales.yAxis.scaleLabel.text = data.yAxis.title.text;
    this.options.scales.yAxis.scaleLabel.color = data.yAxis.title.color;
    this.options.scales.yAxis.gridLines.display = (
      data.yAxis.gridLines.enabled === "true"
    );
    this.options.scales.yAxis.gridLines.width = data.yAxis.gridLines.width;
    this.options.scales.yAxis.gridLines.color = data.yAxis.gridLines.color;
    this.options.scales.yAxis.gridLines.type = data.yAxis.gridLines.dashType;

    // Further setting

    // To disable all values if X Axis display is false
    if (this.options.scales.xAxis.display === false) {
      this.options.scales.xAxis.scaleLabel.display = false;
      this.options.scales.xAxis.line = false;
      this.options.scales.xAxis.ticks = false;
      this.options.scales.xAxis.labels = false;
      this.options.scales.xAxis.thickness = 0;
    }

    // To disable all values if Y Axis display is false
    if (this.options.scales.yAxis.display === false) {
      this.options.scales.yAxis.scaleLabel.display = false;
      this.options.scales.yAxis.line = false;
      this.options.scales.yAxis.ticks = false;
      this.options.scales.yAxis.labels = false;
      this.options.scales.yAxis.thickness = 0;
    }

    // DashType settings

    // X Axis
    if (this.options.scales.xAxis.type == "dotted")
      this.options.scales.xAxis.type = {
        "stroke-dasharray":
          this.options.chartHeight *
            this.options.scales.xAxis.thickness *
            0.002 +
          " , " +
          this.options.chartHeight * this.options.scales.xAxis.thickness * 0.02,
        "stroke-linecap": "round",
      };
    else if (this.options.scales.xAxis.type == "dashed")
      this.options.scales.xAxis.type = {
        "stroke-dasharray":
          this.options.chartHeight *
            this.options.scales.xAxis.thickness *
            0.01 +
          " , " +
          this.options.chartHeight * this.options.scales.xAxis.thickness * 0.01,
        "stroke-linecap": "square",
      };
    else
      this.options.scales.xAxis.type = {
        "stroke-dasharray": "0, 0",
        "stroke-linecap": "square",
      };

    // Y Axis
    if (this.options.scales.yAxis.type == "dotted")
      this.options.scales.yAxis.type = {
        "stroke-dasharray":
          this.options.chartWidth *
            this.options.scales.yAxis.thickness *
            0.002 +
          " , " +
          this.options.chartHeight * this.options.scales.yAxis.thickness * 0.02,
        "stroke-linecap": "round",
      };
    else if (this.options.scales.yAxis.type == "dashed")
      this.options.scales.yAxis.type = {
        "stroke-dasharray":
          this.options.chartWidth * this.options.scales.yAxis.thickness * 0.01 +
          " , " +
          this.options.chartHeight * this.options.scales.yAxis.thickness * 0.01,
        "stroke-linecap": "square",
      };
    else
      this.options.scales.yAxis.type = {
        "stroke-dasharray": "0, 0",
        "stroke-linecap": "square",
      };

    // X Grid lines
    if (this.options.scales.xAxis.gridLines.type == "dotted")
      this.options.scales.xAxis.gridLines.type = {
        "stroke-dasharray":
          this.options.chartHeight *
            this.options.scales.xAxis.gridLines.width *
            0.002 +
          " , " +
          this.options.chartHeight *
            this.options.scales.xAxis.gridLines.width *
            0.02,
        "stroke-linecap": "round",
      };
    else if (this.options.scales.xAxis.gridLines.type == "dashed")
      this.options.scales.xAxis.gridLines.type = {
        "stroke-dasharray":
          this.options.chartHeight *
            this.options.scales.xAxis.gridLines.width *
            0.01 +
          " , " +
          this.options.chartHeight *
            this.options.scales.xAxis.gridLines.width *
            0.01,
        "stroke-linecap": "square",
      };
    else
      this.options.scales.xAxis.gridLines.type = {
        "stroke-dasharray": "0, 0",
        "stroke-linecap": "square",
      };
    // Y Grid lines
    if (this.options.scales.yAxis.gridLines.type == "dotted")
      this.options.scales.yAxis.gridLines.type = {
        "stroke-dasharray":
          this.options.chartWidth *
            this.options.scales.yAxis.gridLines.width *
            0.002 +
          " , " +
          this.options.chartHeight *
            this.options.scales.yAxis.gridLines.width *
            0.02,
        "stroke-linecap": "round",
      };
    else if (this.options.scales.yAxis.gridLines.type == "dashed")
      this.options.scales.yAxis.gridLines.type = {
        "stroke-dasharray":
          this.options.chartWidth *
            this.options.scales.yAxis.gridLines.width *
            0.01 +
          " , " +
          this.options.chartHeight *
            this.options.scales.yAxis.gridLines.width *
            0.01,
        "stroke-linecap": "square",
      };
    else
      this.options.scales.yAxis.gridLines.type = {
        "stroke-dasharray": "0, 0",
        "stroke-linecap": "square",
      };
  }

  main(data) {
    var graph;
    this.dataPreprocessing(data);
   
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
    } else if (this.options.chartType === "line") {
      graph = new LineChart(this.options);
      graph.main();
    }
  }
}
