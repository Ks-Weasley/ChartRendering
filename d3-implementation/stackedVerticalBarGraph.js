class StackedVerticalBarGraph {
  data = [
    {
      label: "2014",
      men_count: 727,
      women_count: 238,
      children_count: 1238,
    },
    {
      label: "2015",
      men_count: 589,
      women_count: 553,
      children_count: 553,
    },
    {
      label: "2016",
      men_count: 537,
      women_count: 746,
      children_count: 746,
    },
    {
      label: "2017",
      men_count: 543,
      women_count: 884,
      children_count: 234,
    },
    {
      label: "2018",
      men_count: 574,
      women_count: 903,
      children_count: 574,
    },
  ];
  colors = ["#FBB65B", "#513551", "#de3163"];
  keys = ["men_count", "women_count", "children_count"];
  stack = d3.stack().keys(this.keys);
  stackedDataset = this.stack(this.data);

  static options;
  constructor(opts) {
    this.options = opts;
  }

  drawXGridLinesOnLeft(g, options, myData, xScale) {
    g = g.attr("class", "gridX");
    const w =
      ((options.chartInnerPadding * options.chartWidth) / (myData.length + 1)) *
      0.5;

    // Grid X lines
    g.selectAll(".gridX")
      .data(myData)
      .join("path")
      .attr("d", function (d, i) {
        var y;
        var pos = "M0 0L0 " + options.chartHeight;
        if (i != myData.length - 1) {
          y = xScale(d.label) + xScale.bandwidth() + w;
          pos = "M" + y + " " + 0 + " L " + y + " " + options.chartHeight;
        }
        return pos;
      })
      .style("stroke", options.scales.xAxes.gridLines.color)
      .style(
        "stroke-width",
        options.scales.xAxes.gridLines.display
          ? options.scales.xAxes.gridLines.width
          : 0
      );
  }
  drawXGridLinesOnRight(g, options, myData, xScale) {
    g = g.attr("class", "gridX");
    const w =
      ((options.chartInnerPadding * options.chartWidth) / (myData.length + 1)) *
      0.5;

    // Grid X lines
    g.selectAll(".gridX")
      .data(myData)
      .join("path")
      .attr("d", function (d, i) {
        var y;
        var pos =
          "M" +
          options.chartWidth +
          " 0L" +
          options.chartWidth +
          " " +
          options.chartHeight;
        if (i != myData.length - 1) {
          y = xScale(d.label) + xScale.bandwidth() + w;
          pos = "M" + y + " " + 0 + " L " + y + " " + options.chartHeight;
        }
        return pos;
      })
      .style("stroke", options.scales.xAxes.gridLines.color)
      .style(
        "stroke-width",
        options.scales.xAxes.gridLines.display
          ? options.scales.xAxes.gridLines.width
          : 0
      );
  }
  drawYGridLines_BaseOnLeft(axis, options, myData, yScale) {
    // Grid Y lines
    axis
      .append("g")
      .attr("class", "gridY")
      .attr("transform", "translate(0, 0)")
      .call(
        d3
          .axisLeft(yScale)
          .tickSizeInner(
            options.scales.yAxes.gridLines.display ? -options.chartWidth : 0
          )
          .tickSizeOuter(
            options.scales.yAxes.gridLines.display ? -options.chartWidth : 0
          )
          .tickFormat(function (d) {
            return "";
          })
          .ticks(myData.length)
      );
  }
  drawYGridLines_BaseOnRight(axis, options, myData, yScale) {
    axis
      .append("g")
      .attr("class", "gridY")
      .attr("transform", "translate(" + options.chartWidth + ", 0)")
      .call(
        d3
          .axisRight(yScale)
          .tickSizeInner(
            options.scales.yAxes.gridLines.display ? -options.chartWidth : 0
          )
          .tickSizeOuter(
            options.scales.yAxes.gridLines.display ? -options.chartWidth : 0
          )
          .tickFormat(function (d) {
            return "";
          })
          .ticks(myData.length)
      );
  }

  axisLeftBottom(axis, options, myData, colors = this.colors) {
    // Defining X Axis
    var xScale = d3
      .scaleBand()
      .domain(
        myData.map(function (d) {
          return d.label;
        })
      )
      .range([0, options.chartWidth])
      .padding(options.chartInnerPadding);

    // Defining Y Axis
    var yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.stackedDataset[this.keys.length - 1], function (d) {
          return d[1];
        }),
      ])
      .range([options.chartHeight, 0]);
    // Drawing X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + options.chartHeight + ")")
      .call(
        d3
          .axisBottom(xScale)
          .ticks(myData.length)
          .tickSizeInner(options.scales.xAxes.ticks ? 6 : 0)
          .tickSizeOuter(options.scales.xAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.xAxes.labels) return d;
            else return "";
          })
      )
      .append("text")
      .attr("x", options.chartWidth)
      .attr("y", 50)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.xAxes.scaleLabel.display
          ? options.scales.xAxes.scaleLabel.text
          : ""
      );

    // Drawing Y Axis
    axis
      .append("g")
      .attr("class", "yAxis")
      .call(
        d3
          .axisLeft(yScale)
          .tickSizeOuter(options.scales.yAxes.ticks ? 6 : 0)
          .tickSizeInner(options.scales.yAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.yAxes.labels) return d;
            else return "";
          })
          .ticks(myData.length)
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(options.chartHeight / 2))
      .attr("y", -35)
      .attr("dy", "-1.5em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.yAxes.scaleLabel.display
          ? options.scales.yAxes.scaleLabel.text
          : ""
      );

    var g = axis.append("g");

    this.drawXGridLinesOnRight(g, options, myData, xScale);
    this.drawYGridLines_BaseOnRight(axis, options, myData, yScale);

    // Plotting the data
    axis = axis.append("g").classed("bar", true);
    g = axis
      .selectAll(".bar")
      .data(this.stackedDataset)
      .join("g")
      .classed("series", true)
      .style("fill", function (d, i) {
        return colors[i];
      });

    g.selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
      .attr("y", (d) => yScale(d[1]))
      .attr("x", (d) => xScale(d.data.label));
  }
  axisLeftTop(
    axis,
    marginWidth,
    options,
    myData,
    colors = this.colors
  ) {
    // Defining X Axis
    var xScale = d3
      .scaleBand()
      .domain(
        myData.map(function (d) {
          return d.label;
        })
      )
      .range([0, options.chartWidth])
      .padding(options.chartInnerPadding);

    // Defining Y Axis
    var yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.stackedDataset[this.keys.length - 1], function (d) {
          return d[1];
        }),
      ])
      .range([0, options.chartHeight]);

    // Drawing X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .call(
        d3
          .axisTop(xScale)
          .ticks(myData.length)
          .tickSizeInner(options.scales.xAxes.ticks ? 6 : 0)
          .tickSizeOuter(options.scales.xAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.xAxes.labels) return d;
            else return "";
          })
      )
      .append("text")
      .attr("x", options.chartWidth)
      .attr("y", -30)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.xAxes.scaleLabel.display
          ? options.scales.xAxes.scaleLabel.text
          : ""
      );

    // Drawing Y Axis
    axis
      .append("g")
      .attr("class", "yAxis")
      .call(
        d3
          .axisLeft(yScale)
          .tickSizeOuter(options.scales.yAxes.ticks ? 6 : 0)
          .tickSizeInner(options.scales.yAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.yAxes.labels) return d;
            else return "";
          })
          .ticks(myData.length)
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -marginWidth / 2)
      .attr("x", -(options.chartHeight / 2))
      .attr("y", -35)
      .attr("dy", "-1.5em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.yAxes.scaleLabel.display
          ? options.scales.yAxes.scaleLabel.text
          : ""
      );
    
    var g = axis
      .append("g");
    
    this.drawXGridLinesOnRight(g, options, myData, xScale);
    this.drawYGridLines_BaseOnRight(axis, options, myData, yScale);
    

    // Plotting the myData
    axis = axis.append("g").classed("bar", true);
    var g = axis
      .selectAll(".bar")
      .data(this.stackedDataset)
      .join("g")
      .classed("series", true)
      .style("fill", function (d, i) {
        return colors[i];
      });

    g.selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(d[1]) - yScale(d[0]))
      .attr("y", (d) => yScale(d[0]))
      .attr("x", (d) => xScale(d.data.label));
  }

  axisRightBottom(
    axis,
    options,
    myData,
    colors = this.colors
  ) {
    // Defining X Axis
    var xScale = d3
      .scaleBand()
      .domain(
        myData.map(function (d) {
          return d.label;
        })
      )
      .range([0, options.chartWidth])
      .padding(options.chartInnerPadding);

    // Defining Y Axis
    var yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.stackedDataset[this.keys.length - 1], function (d) {
          return d[1];
        }),
      ])
      .range([options.chartHeight, 0]);
    // Drawing X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + options.chartHeight + ")")
      .call(
        d3
          .axisBottom(xScale)
          .ticks(myData.length)
          .tickSizeInner(options.scales.xAxes.ticks ? 6 : 0)
          .tickSizeOuter(options.scales.xAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.xAxes.labels) return d;
            else return "";
          })
      )
      .append("text")
      .attr("x", 0)
      .attr("y", 50)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.xAxes.scaleLabel.display
          ? options.scales.xAxes.scaleLabel.text
          : ""
      );

    // Drawing Y Axis
    axis
      .append("g")
      .attr("class", "yAxis")
      .attr("transform", "translate(" + options.chartWidth + ", 0)")
      .call(
        d3
          .axisRight(yScale)
          .tickSizeOuter(options.scales.yAxes.ticks ? 6 : 0)
          .tickSizeInner(options.scales.yAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.yAxes.labels) return d;
            else return "";
          })
          .ticks(myData.length)
      )
      .append("text")
      // .attr("transform", "rotate(-90)")
      .attr("x", -10)
      .attr("y", 5)
      .attr("dy", "-1.5em")
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      .text(
        options.scales.yAxes.scaleLabel.display
          ? options.scales.yAxes.scaleLabel.text
          : ""
      );

    var g = axis
      .append("g");

    this.drawXGridLinesOnLeft(g, options, myData, xScale);
    this.drawYGridLines_BaseOnLeft(axis, options, myData, yScale);

    // Plotting the myData
    axis = axis.append("g").classed("bar", true);
    var g = axis
      .selectAll(".bar")
      .data(this.stackedDataset)
      .join("g")
      .classed("series", true)
      .style("fill", function (d, i) {
        return colors[i];
      });

    g.selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
      .attr("y", (d) => yScale(d[1]))
      .attr("x", (d) => xScale(d.data.label));
  }

  axisRightTop(
    axis,
    marginWidth,
    options,
    myData,
    colors = this.colors
  ) {
    // Defining X Axis
    var xScale = d3
      .scaleBand()
      .domain(
        myData.map(function (d) {
          return d.label;
        })
      )
      .range([0, options.chartWidth])
      .padding(options.chartInnerPadding);

    // Defining Y Axis
    var yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.stackedDataset[this.keys.length - 1], function (d) {
          return d[1];
        }),
      ])
      .range([0, options.chartHeight]);
    // Drawing X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .call(
        d3
          .axisTop(xScale)
          .ticks(myData.length)
          .tickSizeInner(options.scales.xAxes.ticks ? 6 : 0)
          .tickSizeOuter(options.scales.xAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.xAxes.labels) return d;
            else return "";
          })
      )
      .append("text")
      .attr("x", 0)
      .attr("y", -10)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.xAxes.scaleLabel.display
          ? options.scales.xAxes.scaleLabel.text
          : ""
      );

    // Drawing Y Axis
    axis
      .append("g")
      .attr("class", "yAxis")
      .attr("transform", "translate(" + options.chartWidth + ", 0)")
      .call(
        d3
          .axisRight(yScale)
          .tickSizeOuter(options.scales.yAxes.ticks ? 6 : 0)
          .tickSizeInner(options.scales.yAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.yAxes.labels) return d;
            else return "";
          })
          .ticks(myData.length)
      )
      .append("text")
      .attr("x", 10)
      .attr("y", options.chartHeight)
      .attr("dy", "-1.5em")
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      // .attr("transform", "rotate(180)")
      .text(
        options.scales.yAxes.scaleLabel.display
          ? options.scales.yAxes.scaleLabel.text
          : ""
      );

    var g = axis
      .append("g");

    this.drawXGridLinesOnLeft(g, options, myData, xScale);
    this.drawYGridLines_BaseOnLeft(axis, options, myData, yScale);

    
    // Plotting the data
    axis = axis.append("g").classed("bar", true);
    var g = axis
      .selectAll(".bar")
      .data(this.stackedDataset)
      .join("g")
      .classed("series", true)
      .style("fill", function (d, i) {
        return colors[i];
      });

    g.selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(d[1]) - yScale(d[0]))
      .attr("y", (d) => yScale(d[0]))
      .attr("x", (d) => xScale(d.data.label));
  }

  adjuster(options, axis, svg) {
    // Remove X Axis if not visible
    if (!options.scales.xAxes.display) axis.select(".xAxis>.domain").remove();

    // Remove Y Axis if not visible
    if (!options.scales.yAxes.display) axis.select(".yAxis>.domain").remove();

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
        this.options.scales.xAxes.display
          ? this.options.scales.xAxes.thickness
          : 0
      )
      .attr(
        "stroke-dasharray",
        this.options.scales.xAxes.type["stroke-dasharray"]
      )
      .attr("stroke-linecap", this.options.scales.xAxes.type["stroke-linecap"])
      .attr("stroke", this.options.scales.xAxes.color);
    axis
      .selectAll(".xAxis>.tick")
      .attr("stroke", this.options.scales.xAxes.color);

    // Setting Y Axis properties
    axis
      .selectAll(".yAxis>.domain")
      .attr(
        "stroke-width",
        this.options.scales.yAxes.display
          ? this.options.scales.yAxes.thickness
          : 0
      )
      .attr(
        "stroke-dasharray",
        this.options.scales.yAxes.type["stroke-dasharray"]
      )
      .attr("stroke-linecap", this.options.scales.yAxes.type["stroke-linecap"])
      .attr("stroke", this.options.scales.yAxes.color);
    axis
      .selectAll(".yAxis>.tick")
      .attr("stroke", this.options.scales.yAxes.color);
      
    // Setting Grid X Width
    svg
      .selectAll(".gridX")
      .attr(
        "stroke-width",
        this.options.scales.xAxes.gridLines.display
          ? this.options.scales.xAxes.gridLines.width
          : 0
      )
      .attr(
        "stroke-dasharray",
        this.options.scales.xAxes.gridLines.type["stroke-dasharray"]
      )
      .attr(
        "stroke-linecap",
        this.options.scales.xAxes.gridLines.type["stroke-linecap"]
      )
      .attr("stroke", this.options.scales.xAxes.gridLines.color);
    
    //  Setting Grid Y Axis
    svg
      .selectAll(".gridY")
      .attr(
        "stroke-width",
        this.options.scales.yAxes.gridLines.display
          ? this.options.scales.yAxes.gridLines.width
          : 0
      )
      .attr(
        "stroke-dasharray",
        this.options.scales.yAxes.gridLines.type["stroke-dasharray"]
      )
      .attr(
        "stroke-linecap",
        this.options.scales.yAxes.gridLines.type["stroke-linecap"]
      )
      .attr("stroke", this.options.scales.yAxes.gridLines.color);
      svg
        .selectAll(".gridY line")
        .attr("stroke", this.options.scales.yAxes.gridLines.color);
  }

  main() {
    const title = this.options.title.text;
    const titleFontSize = 12;
    const legendFontSize = 10;
    const marginWidth = 100;
    const marginHeight = 100;
    const colors = this.colors;

    // Clear the space
    d3.select("#d3JS svg").remove();

    // Define svg height and width
    var svg = d3
      .select("#d3JS")
      .append("svg")
      .attr("height", this.options.chartHeight + 2 * marginHeight)
      .attr("width", this.options.chartWidth + 2 * marginWidth);

    let axis = svg
      .append("g")
      .attr(
        "transform",
        "translate(" + marginWidth + " , " + marginHeight + ")"
      );
    // Title
    if (this.options.title.display)
      axis
        .append("g")
        .append("text")
        .attr(
          "x",
          this.options.chartWidth / 2 - title.length * (titleFontSize / 2)
        )
        .attr("y", -50)
        .attr("class", "title")
        .attr("font-size", titleFontSize)
        .text(this.options.title.text);

    const legendWidth = d3.sum(this.data, function (d) {
      return 10 + 5 + d.label.length * legendFontSize + 5;
    });
    console.log(legendWidth);
    // Legend Top
    var width = 0;
    if (this.options.legend.display && this.options.legend.position === "top") {
      var legend = axis.append("g").attr("class", "legendClass");

      legend = legend
        .selectAll(".legend")
        .data(this.keys)
        .join("g")
        .attr("transform", function (d) {
          const res =
            "translate(" + (width + legendWidth / 2) + " , " + -40 + ")";
          width += 10 + 5 + d.length * legendFontSize + 5;
          return res;
        });
      legend
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function (d, i) {
          return colors[i];
        });

      legend
        .append("text")
        .attr("class", "legend")
        .attr("x", 15)
        .attr("y", 10)
        .attr("font-size", legendFontSize)
        .text(function (d) {
          return d;
        });
    }

    // Legend Bottom
    if (
      this.options.legend.display &&
      this.options.legend.position === "bottom"
    ) {
      // To calculate translate for legend => width of the entire chart/2 - (width of the legend)
      // To center the text
      // Width of the legend = 5 (for the distance between indicator and text) + 10(width of indicator) +text length
      var legend = axis.append("g").attr("class", "legendClass");
      const tempOptions = this.options;
      legend = legend
        .selectAll(".legend")
        .data(this.keys)
        .join("g")
        .attr("transform", function (d) {
          const res =
            "translate(" +
            (width + legendWidth / 2) +
            " , " +
            (tempOptions.chartHeight + marginHeight / 2) +
            ")";
          width += 10 + 5 + d.length * legendFontSize + 5;
          return res;
        });
      legend
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function (d, i) {
          return colors[i];
        });

      legend
        .append("text")
        .attr("class", "legend")
        .attr("x", 15)
        .attr("y", 10)
        .attr("font-size", legendFontSize)
        .text(function (d) {
          return d;
        });
    }

    // Finding axis alignment
    if (
      this.options.scales.xAxes.align === "bottom" &&
      this.options.scales.yAxes.align === "left"
    )
      this.axisLeftBottom(axis, this.options, this.data);
    else if (
      this.options.scales.xAxes.align === "bottom" &&
      this.options.scales.yAxes.align === "right"
    )
      this.axisRightBottom(axis, this.options, this.data);
    else if (
      this.options.scales.xAxes.align === "top" &&
      this.options.scales.yAxes.align === "left"
    )
      this.axisLeftTop(axis,marginWidth, this.options, this.data);
    else this.axisRightTop(axis, marginWidth, this.options, this.data);

    this.adjuster(this.options, axis, svg);
  }
}
