class LineChart {
  data = {
    labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
    datasets: [
      {
        data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false,
      },
      {
        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
        label: "Asia",
        borderColor: "#8e5ea2",
        fill: false,
      },
      {
        data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
        label: "Europe",
        borderColor: "#3cba9f",
        fill: false,
      },
      {
        data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
        label: "Latin America",
        borderColor: "#e8c3b9",
        fill: false,
      },
      {
        data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
        label: "North America",
        borderColor: "#c45850",
        fill: false,
      },
    ],
  };
  static options;
  constructor(opts) {
    this.options = opts;
  }
  drawXGridLinesOnTop(axis, options, xScale) {
    // Draw X grid lines
    axis
      .append("g")
      .attr("class", "gridX")
      .attr("transform", "translate(0, 0)")
      .call(
        d3
          .axisTop(xScale)
          .tickSizeInner(
            options.scales.xAxis.gridLines.display ? -options.chartHeight : 0
          )
          .tickSizeOuter(
            options.scales.xAxis.gridLines.display ? -options.chartHeight : 0
          )
          .tickFormat((d) => "")
      );
  }
  drawXGridLinesOnBottom(axis, options, xScale) {
    // Draw X grid lines
    axis
      .append("g")
      .attr("class", "gridX")
      .attr("transform", "translate(0," + options.chartHeight + ")")
      .call(
        d3
          .axisBottom(xScale)
          .tickSizeInner(
            options.scales.xAxis.gridLines.display ? -options.chartHeight : 0
          )
          .tickSizeOuter(
            options.scales.xAxis.gridLines.display ? -options.chartHeight : 0
          )
          .tickFormat((d) => "")
      );
  }
  drawYGridLinesOnRight(axis, options, myData, yScale) {
    // Draw Y grid lines
    axis
      .append("g")
      .attr("class", "gridY")
      .attr("transform", "translate(" + options.chartWidth + ", 0)")
      .call(
        d3
          .axisRight(yScale)
          .tickSizeOuter(
            options.scales.yAxis.gridLines.display ? -options.chartWidth : 0
          )
          .tickSizeInner(
            options.scales.yAxis.gridLines.display ? -options.chartWidth : 0
          )
          .ticks(myData.labels.length)
          .tickFormat((d) => "")
      );
  }

  drawYGridLinesOnLeft(axis, options, myData, yScale) {
    // Draw Y grid lines
    axis
      .append("g")
      .attr("class", "gridY")
      .attr("transform", "translate(0, 0)")
      .call(
        d3
          .axisLeft(yScale)
          .tickSizeOuter(
            options.scales.yAxis.gridLines.display ? -options.chartWidth : 0
          )
          .tickSizeInner(
            options.scales.yAxis.gridLines.display ? -options.chartWidth : 0
          )
          .ticks(myData.labels.length)
          .tickFormat((d) => "")
      );
  }
  axisLeftTop(axis, options, myData) {
    // Define X Axis
    let xScale = d3
      .scaleBand()
      .domain(myData.labels)
      .range([0, options.chartWidth]);

    // Define Y Axis
    let yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(myData.datasets, function (d) {
          return d3.max(d.data);
        }),
      ])
      .range([0, options.chartHeight]);

    // Draw X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0,0)")
      .call(
        d3
          .axisTop(xScale)
          .tickSizeInner(options.scales.xAxis.ticks ? 6 : 0)
          .tickSizeOuter(options.scales.xAxis.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.xAxis.labels) return d;
            else return "";
          })
      )

      // defining label
      .append("text")
      .attr("x", options.chartWidth)
      .attr("y", -10)
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      .text(
        options.scales.xAxis.scaleLabel.display
          ? options.scales.xAxis.scaleLabel.text
          : ""
      );
    // Draw Y Axis
    axis
      .append("g")
      .attr("class", "yAxis")
      .attr("transform", "translate(0,0)")
      .call(
        d3
          .axisLeft(yScale)
          .ticks(myData.labels.length)
          .tickSizeOuter(options.scales.yAxis.ticks ? 6 : 0)
          .tickSizeInner(options.scales.yAxis.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.yAxis.labels) return d;
            else return "";
          })
      )
      .append("text")
      .attr("x", -(options.chartHeight / 2))
      .attr("y", -35)
      .attr("dy", "-1.5em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.yAxis.scaleLabel.display
          ? options.scales.yAxis.scaleLabel.text
          : ""
      );
    this.drawXGridLinesOnBottom(axis, options, xScale);
    this.drawYGridLinesOnRight(axis, options, myData, yScale);

    // Line generator
    const xWidth = xScale.bandwidth() / 2;
    var lineGenerator = d3
      .line()
      .curve(options.values.smooth ? d3.curveCardinal : d3.curveLinear)
      .defined(function (d) {
        return d !== null;
      })
      .x(function (d, i) {
        return xScale(myData.labels[i]) + xWidth;
      })
      .y(function (d, i) {
        return yScale(d);
      });

    // Plotting the line for the given dataset
    axis
      .selectAll(".line")
      .data(myData.datasets)
      .join("g")
      .attr("class", (d) => d.label.split(" ").join("_"))
      .append("path")
      .attr("class", "line")
      .attr("d", function (d, i) {
        return lineGenerator(d.data);
      })
      .attr("fill", "none")
      .attr("stroke", function (d) {
        return d.borderColor;
      })
      .attr("stroke-width", 2);
    // Plotting points for the lines
    if (options.values.display)
      for (let i = 0; i < myData.datasets.length; i++) {
        const d = myData.datasets[i];
        axis
          .select("." + d.label.split(" ").join("_"))
          .append("g")
          .attr("class", "values")
          .selectAll(".pointValues")
          .data(d.data)
          .join("text")
          .attr(
            "x",
            (d, i) => xScale(myData.labels[i]) + xScale.bandwidth() / 2
          )
          .attr("y", (d, i) => yScale(d))
          .text((d) => d)
          .attr("font-size", 10)
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle");
      }
  }
  axisLeftBottom(axis, options, myData) {
    // Define X Axis
    let xScale = d3
      .scaleBand()
      .domain(myData.labels)
      .range([0, this.options.chartWidth]);

    // Define Y Axis
    let yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(myData.datasets, function (d) {
          return d3.max(d.data);
        }),
      ])
      .range([this.options.chartHeight, 0]);

    // Draw X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + options.chartHeight + ")")
      .call(
        d3
          .axisBottom(xScale)
          .tickSizeInner(options.scales.xAxis.ticks ? 6 : 0)
          .tickSizeOuter(options.scales.xAxis.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.xAxis.labels) return d;
            else return "";
          })
      )

      // defining label
      .append("text")
      .attr("x", options.chartWidth)
      .attr("y", 50)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.xAxis.scaleLabel.display
          ? options.scales.xAxis.scaleLabel.text
          : ""
      );
    // Draw Y Axis
    axis
      .append("g")
      .attr("class", "yAxis")
      .call(
        d3
          .axisLeft(yScale)
          .ticks(myData.labels.length)
          .tickSizeOuter(options.scales.yAxis.ticks ? 6 : 0)
          .tickSizeInner(options.scales.yAxis.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.yAxis.labels) return d;
            else return "";
          })
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(options.chartHeight / 2))
      .attr("y", -35)
      .attr("dy", "-1.5em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.yAxis.scaleLabel.display
          ? options.scales.yAxis.scaleLabel.text
          : ""
      );
    this.drawXGridLinesOnTop(axis, options, xScale);
    this.drawYGridLinesOnRight(axis, options, myData, yScale);

    // Line generator
    const xWidth = xScale.bandwidth() / 2;
    var lineGenerator = d3
      .line()
      .curve(options.values.smooth ? d3.curveCardinal : d3.curveLinear)
      .defined(function (d) {
        return d !== null;
      })
      .x(function (d, i) {
        return xScale(myData.labels[i]) + xWidth;
      })
      .y(function (d, i) {
        return yScale(d);
      });

    // Plotting the line for the given dataset
    axis
      .selectAll(".line")
      .data(myData.datasets)
      .join("g")
      .attr("class", (d) => d.label.split(" ").join("_"))
      .append("path")
      .attr("class", "line")
      .attr("d", function (d, i) {
        return lineGenerator(d.data);
      })
      .attr("fill", "none")
      .attr("stroke", function (d) {
        return d.borderColor;
      })
      .attr("stroke-width", 2);

    // Plotting value for the lines
    if (options.values.display)
      for (let i = 0; i < myData.datasets.length; i++) {
        const d = myData.datasets[i];
        axis
          .select("." + d.label.split(" ").join("_"))
          .append("g")
          .attr("class", "values")
          .selectAll(".pointValues")
          .data(d.data)
          .join("text")
          .attr(
            "x",
            (d, i) => xScale(myData.labels[i]) + xScale.bandwidth() / 2
          )
          .attr("y", (d, i) => yScale(d))
          .text((d) => d)
          .attr("font-size", 10)
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle");
      }
  }

  axisRightTop(axis, options, myData) {
    // Define X Axis
    let xScale = d3
      .scaleBand()
      .domain(myData.labels)
      .range([0, options.chartWidth]);

    // Define Y Axis
    let yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(myData.datasets, function (d) {
          return d3.max(d.data);
        }),
      ])
      .range([0, options.chartHeight]);

    // Draw X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0,0)")
      .call(
        d3
          .axisTop(xScale)
          .tickSizeInner(options.scales.xAxis.ticks ? 6 : 0)
          .tickSizeOuter(options.scales.xAxis.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.xAxis.labels) return d;
            else return "";
          })
      )

      // defining label
      .append("text")
      .attr("x", 0)
      .attr("y", -10)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.xAxis.scaleLabel.display
          ? options.scales.xAxis.scaleLabel.text
          : ""
      );
    // Draw Y Axis
    axis
      .append("g")
      .attr("class", "yAxis")
      .attr("transform", "translate(" + options.chartWidth + ", 0)")
      .call(
        d3
          .axisRight(yScale)
          .ticks(myData.labels.length)
          .tickSizeOuter(options.scales.yAxis.ticks ? 6 : 0)
          .tickSizeInner(options.scales.yAxis.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.yAxis.labels) return d;
            else return "";
          })
      )
      .append("text")
      // .attr("transform", "rotate(-90)")
      .attr("x", 10)
      .attr("y", options.chartHeight)
      .attr("dy", "-1.5em")
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      .text(
        options.scales.yAxis.scaleLabel.display
          ? options.scales.yAxis.scaleLabel.text
          : ""
      );

    this.drawXGridLinesOnBottom(axis, options, xScale);
    this.drawYGridLinesOnRight(axis, options, myData, yScale);

    // Line generator
    const xWidth = xScale.bandwidth() / 2;
    var lineGenerator = d3
      .line()
      .curve(options.values.smooth ? d3.curveCardinal : d3.curveLinear)
      .defined(function (d) {
        return d !== null;
      })
      .x(function (d, i) {
        return xScale(myData.labels[i]) + xWidth;
      })
      .y(function (d, i) {
        return yScale(d);
      });
    var line = lineGenerator(myData.datasets[1].data);

    // Plotting the line for the given dataset
    axis
      .selectAll(".line")
      .data(myData.datasets)
      .join("g")
      .attr("class", (d) => d.label.split(" ").join("_"))
      .append("path")
      .attr("class", "line")
      .attr("d", function (d, i) {
        return lineGenerator(d.data);
      })
      .attr("fill", "none")
      .attr("stroke", function (d) {
        return d.borderColor;
      })
      .attr("stroke-width", 2);

    if (options.values.display)
      for (let i = 0; i < myData.datasets.length; i++) {
        const d = myData.datasets[i];
        axis
          .select("." + d.label.split(" ").join("_"))
          .append("g")
          .attr("class", "values")
          .selectAll(".pointValues")
          .data(d.data)
          .join("text")
          .attr(
            "x",
            (d, i) => xScale(myData.labels[i]) + xScale.bandwidth() / 2
          )
          .attr("y", (d, i) => yScale(d))
          .text((d) => d)
          .attr("font-size", 10)
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle");
      }
  }

  axisRightBottom(axis, options, myData) {
    // Define X Axis
    let xScale = d3
      .scaleBand()
      .domain(myData.labels)
      .range([0, options.chartWidth]);

    // Define Y Axis
    let yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(myData.datasets, function (d) {
          return d3.max(d.data);
        }),
      ])
      .range([options.chartHeight, 0]);

    // Draw X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + options.chartHeight + ")")
      .call(
        d3
          .axisBottom(xScale)
          .tickSizeInner(options.scales.xAxis.ticks ? 6 : 0)
          .tickSizeOuter(options.scales.xAxis.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.xAxis.labels) return d;
            else return "";
          })
      )

      // defining label
      .append("text")
      .attr("x", 0)
      .attr("y", 50)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.xAxis.scaleLabel.display
          ? options.scales.xAxis.scaleLabel.text
          : ""
      );
    // Draw Y Axis
    axis
      .append("g")
      .attr("class", "yAxis")
      .attr("transform", "translate(" + options.chartWidth + ", 0)")
      .call(
        d3
          .axisRight(yScale)
          .ticks(myData.labels.length)
          .tickSizeOuter(options.scales.yAxis.ticks ? 6 : 0)
          .tickSizeInner(options.scales.yAxis.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.yAxis.labels) return d;
            else return "";
          })
      )
      .append("text")
      // .attr("transform", "rotate(-90)")
      .attr("x", 10)
      .attr("y", 5)
      .attr("dy", "-1.5em")
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      .text(
        options.scales.yAxis.scaleLabel.display
          ? options.scales.yAxis.scaleLabel.text
          : ""
      );

    this.drawXGridLinesOnTop(axis, options, xScale);
    this.drawYGridLinesOnLeft(axis, options, myData, yScale);

    // Line generator
    const xWidth = xScale.bandwidth() / 2;
    var lineGenerator = d3
      .line()
      .curve(options.values.smooth ? d3.curveCardinal : d3.curveLinear)
      .defined(function (d) {
        return d !== null;
      })
      .x(function (d, i) {
        return xScale(myData.labels[i]) + xWidth;
      })
      .y(function (d, i) {
        return yScale(d);
      });
    var line = lineGenerator(myData.datasets[1].data);

    // Plotting the line for the given dataset
    axis
      .selectAll(".line")
      .data(myData.datasets)
      .join("g")
      .attr("class", (d) => d.label.split(" ").join("_"))
      .append("path")
      .attr("class", "line")
      .attr("d", function (d, i) {
        return lineGenerator(d.data);
      })
      .attr("fill", "none")
      .attr("stroke", function (d) {
        return d.borderColor;
      })
      .attr("stroke-width", 2);

    // Plotting value for the lines
    if (options.values.display)
      for (let i = 0; i < myData.datasets.length; i++) {
        const d = myData.datasets[i];
        axis
          .select("." + d.label.split(" ").join("_"))
          .append("g")
          .attr("class", "values")
          .selectAll(".pointValues")
          .data(d.data)
          .join("text")
          .attr(
            "x",
            (d, i) => xScale(myData.labels[i]) + xScale.bandwidth() / 2
          )
          .attr("y", (d, i) => yScale(d))
          .text((d) => d)
          .attr("font-size", 10)
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle");
      }
  }
  adjuster(options, axis, svg) {
    // Remove X Axis if not visible
    if (!options.scales.xAxis.display) axis.select(".xAxis>.domain").remove();

    // Remove Y Axis if not visible
    if (!options.scales.yAxis.display) axis.select(".yAxis>.domain").remove();

    // Remove X grid domain
    svg.selectAll(".gridX>.domain").remove();

    // Remove Y grid domain
    svg.selectAll(".gridY>.domain").remove();
    svg.selectAll(".gridY > :first-child").remove();
    
    // Setting X Axis properties
    axis
      .selectAll(".xAxis>.domain")
      .attr(
        "stroke-width",
        this.options.scales.xAxis.display
          ? this.options.scales.xAxis.thickness
          : 0
      )
      .attr(
        "stroke-dasharray",
        this.options.scales.xAxis.type["stroke-dasharray"]
      )
      .attr("stroke-linecap", this.options.scales.xAxis.type["stroke-linecap"])
      .attr("stroke", this.options.scales.xAxis.color);
    axis
      .selectAll(".xAxis>.tick")
      .attr("stroke", this.options.scales.xAxis.color);

    // Setting Y Axis properties
    axis
      .selectAll(".yAxis>.domain")
      .attr(
        "stroke-width",
        this.options.scales.yAxis.display
          ? this.options.scales.yAxis.thickness
          : 0
      )
      .attr(
        "stroke-dasharray",
        this.options.scales.yAxis.type["stroke-dasharray"]
      )
      .attr("stroke-linecap", this.options.scales.yAxis.type["stroke-linecap"])
      .attr("stroke", this.options.scales.yAxis.color);
    axis
      .selectAll(".yAxis>.tick")
      .attr("stroke", this.options.scales.yAxis.color);

    // Setting Grid X Width
    svg
      .selectAll(".gridX")
      .attr(
        "stroke-width",
        this.options.scales.xAxis.gridLines.display
          ? this.options.scales.xAxis.gridLines.width
          : 0
      )
      .attr(
        "stroke-dasharray",
        this.options.scales.xAxis.gridLines.type["stroke-dasharray"]
      )
      .attr(
        "stroke-linecap",
        this.options.scales.xAxis.gridLines.type["stroke-linecap"]
      )
      .attr("stroke", this.options.scales.xAxis.gridLines.color);
    svg
      .selectAll(".gridX line")
      .attr("stroke", this.options.scales.xAxis.gridLines.color);
    //  Setting Grid Y Axis
    svg
      .selectAll(".gridY")
      .attr(
        "stroke-width",
        this.options.scales.yAxis.gridLines.display
          ? this.options.scales.yAxis.gridLines.width
          : 0
      )
      .attr(
        "stroke-dasharray",
        this.options.scales.yAxis.gridLines.type["stroke-dasharray"]
      )
      .attr(
        "stroke-linecap",
        this.options.scales.yAxis.gridLines.type["stroke-linecap"]
      )
      .attr("stroke", this.options.scales.yAxis.gridLines.color);
    svg
      .selectAll(".gridY line")
      .attr("stroke", this.options.scales.xAxis.gridLines.color);
  }
  main() {
    const marginWidth = 100;
    const marginHeight = 100;
    const options = this.options;
    const myData = this.data;
    const title = options.title.text;
    const fontSize = 10;
    const titleFontSize = 12;

    // Clear the space
    d3.select("#d3JS svg").remove();

    // Define svg height and width
    var svg = d3
      .select("#d3JS")
      .append("svg")
      .attr("height", this.options.chartHeight + 2 * marginHeight)
      .attr("width", this.options.chartWidth + 2 * marginWidth);
    let axis = d3
      .select("svg")
      .append("g")
      .attr("transform", "translate(" + marginWidth + "," + marginHeight + ")");
    // Title
    if (this.options.title.display)
      axis
        .append("g")
        .append("text")
        .attr("x", this.options.chartWidth / 2 - title.length * 6)
        .attr("y", -50)
        .attr("class", "title")
        .attr("font-size", titleFontSize)
        .text(title);

    var width = 0;
    // Legend Top
    if (this.options.legend.display && this.options.legend.position === "top") {
      var legend = axis.append("g").attr("transform", "translate(0, 0)");

      legend = legend
        .selectAll(".legend")
        .data(this.data.datasets)
        .join("g")
        .attr("class", "legend")
        .attr("transform", function (d) {
          const res = "translate(" + width + " , " + -40 + ")";
          width += 10 + 5 + d.label.length * fontSize + 5;
          return res;
        });
      legend
        .append("rect")
        .attr("class", "legendIndicator")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function (d) {
          return d.borderColor;
        });

      legend
        .append("text")
        .attr("class", "legendDescriptor")
        .attr("x", 15)
        .attr("y", 10)
        .attr("font-size", fontSize)
        .text(function (d) {
          return d.label;
        });
    }

    // Legend Bottom
    else if (
      this.options.legend.display &&
      this.options.legend.position === "bottom"
    ) {
      // To calculate translate for legend => this.options.chartWidth of the entire chart/2 - (this.options.chartWidth of the legend)
      // To center the text
      // this.options.chartWidth of the legend = 5 (for the distance between indicator and text) + 10(this.options.chartWidth of indicator) +text length
      var legend = axis
        .append("g")
        .attr("transform", "translate(0, " + this.options.chartHeight + ")");

      legend = legend
        .selectAll(".legend")
        .data(this.data.datasets)
        .join("g")
        .attr("class", "legend")
        .attr("transform", function (d) {
          const res = "translate(" + width + " , " + marginHeight / 2 + ")";
          width += 10 + 5 + d.label.length * fontSize + 5;
          return res;
        });
      legend
        .append("rect")
        .attr("class", "legendIndicator")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function (d) {
          return d.borderColor;
        });

      legend
        .append("text")
        .attr("class", "legendDescriptor")
        .attr("x", 15)
        .attr("y", 10)
        .attr("font-size", fontSize)
        .text(function (d) {
          return d.label;
        });
    }

    // Finding axis alignment
    if (
      this.options.scales.xAxis.align === "bottom" &&
      this.options.scales.yAxis.align === "left"
    )
      this.axisLeftBottom(axis, this.options, this.data);
    else if (
      this.options.scales.xAxis.align === "bottom" &&
      this.options.scales.yAxis.align === "right"
    )
      this.axisRightBottom(axis, this.options, this.data);
    else if (
      this.options.scales.xAxis.align === "top" &&
      this.options.scales.yAxis.align === "left"
    )
      this.axisLeftTop(axis, this.options, this.data);
    else this.axisRightTop(axis, this.options, this.data);

    // Adjuster
    this.adjuster(this.options, axis, svg);
  }
}
