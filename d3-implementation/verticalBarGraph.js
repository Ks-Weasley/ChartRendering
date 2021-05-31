class VerticalBarGraph {
  myData = {
    label: "Population",
    dataset: [
      {
        label: "Africa",
        value: 500,
      },
      {
        label: "Asia",
        value: 5267,
      },
      {
        label: "Europe",
        value: 2478,
      },
      {
        label: "Latin America",
        value: 784,
      },
      {
        label: "North America",
        value: 6000,
      },
    ],
  };
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

  axisLeftBottom(axis, options, myData) {
    var xScale = d3
      .scaleBand()
      .range([0, options.chartWidth])
      .padding(options.chartInnerPadding);
    var yScale = d3.scaleLinear().range([options.chartHeight, 0]);

    xScale.domain(
      myData.dataset.map(function (d) {
        return d.label;
      })
    );
    yScale.domain([
      0,
      d3.max(myData.dataset, function (d) {
        return d.value;
      }),
    ]);
    // Drawing X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + options.chartHeight + ")")
      .call(
        d3
          .axisBottom(xScale)
          .ticks(myData.dataset.length)
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
          .ticks(myData.dataset.length)
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
    this.drawXGridLinesOnRight(g, options, myData.dataset, xScale);
    this.drawYGridLines_BaseOnRight(axis, options, myData.dataset, yScale);

    // Plotting bar graph
    axis
      .selectAll(".bar")
      .data(myData.dataset)
      .join("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return xScale(d.label);
      })
      .attr("y", function (d) {
        return yScale(d.value);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return options.chartHeight - yScale(d.value);
      })
      .attr("fill", options.chartTheme);

    // Plotting values for the bar
    if (options.values.display)
      axis
        .selectAll(".barValue")
        .data(myData.dataset)
        .join("text")
        .attr("class", "barValue")
        .attr("x", (d) => xScale(d.label) + xScale.bandwidth() / 2)
        .attr(
          "y",
          (d) => yScale(d.value) + (options.chartHeight - yScale(d.value)) / 2
        )
        .attr("fill", "black")
        .attr("font-size", 10)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text((d) =>
          options.values.absolute
            ? d.value
            : parseFloat(
                (d.value / d3.sum(myData.dataset, (d) => d.value)) * 100
              ).toFixed(2)
        );
  }
  axisLeftTop(axis, marginWidth, options, myData) {
    var xScale = d3
      .scaleBand()
      .range([0, options.chartWidth])
      .padding(options.chartInnerPadding);
    var yScale = d3.scaleLinear().range([0, options.chartHeight]);

    xScale.domain(
      myData.dataset.map(function (d) {
        return d.label;
      })
    );
    yScale.domain([
      0,
      d3.max(myData.dataset, function (d) {
        return d.value;
      }),
    ]);
    // Drawing X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .call(
        d3
          .axisTop(xScale)
          .ticks(myData.dataset.length)
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
          .ticks(myData.dataset.length)
      )
      .append("text")
      .attr("x", -marginWidth / 2)
      .attr("y", options.chartHeight)
      .attr("dy", "-1.5em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      // .attr("transform", "rotate(180)")
      .text(
        options.scales.yAxes.scaleLabel.display
          ? options.scales.yAxes.scaleLabel.text
          : ""
      );

    var g = axis.append("g");

    this.drawXGridLinesOnRight(g, options, myData.dataset, xScale);
    this.drawYGridLines_BaseOnRight(axis, options, myData.dataset, yScale);

    // Plotting bar graph
    axis
      .selectAll(".bar")
      .data(myData.dataset)
      .join("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return xScale(d.label);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return yScale(d.value);
      })
      .attr("fill", options.chartTheme);
    // Plotting values for the bar
    if (options.values.display)
      axis
        .selectAll(".barValue")
        .data(myData.dataset)
        .join("text")
        .attr("class", "barValue")
        .attr("x", (d) => xScale(d.label) + xScale.bandwidth() / 2)
        .attr("y", (d) => yScale(d.value) - yScale(d.value) / 2)
        .attr("fill", "black")
        .attr("font-size", 10)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text((d) =>
          options.values.absolute
            ? d.value
            : parseFloat(
                (d.value / d3.sum(myData.dataset, (d) => d.value)) * 100
              ).toFixed(2)
        );
  }
  axisRightBottom(axis, marginWidth, options, myData) {
    var xScale = d3
      .scaleBand()
      .range([0, options.chartWidth])
      .padding(options.chartInnerPadding);
    var yScale = d3.scaleLinear().range([options.chartHeight, 0]);

    xScale.domain(
      myData.dataset.map(function (d) {
        return d.label;
      })
    );
    yScale.domain([
      0,
      d3.max(myData.dataset, function (d) {
        return d.value;
      }),
    ]);
    // Drawing X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0, " + options.chartHeight + ")")
      .call(
        d3
          .axisBottom(xScale)
          .ticks(myData.dataset.length)
          .tickSizeInner(options.scales.xAxes.ticks ? 6 : 0)
          .tickSizeOuter(options.scales.xAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.xAxes.labels) return d;
            else return "";
          })
      )
      .append("text")
      .attr("x", 0)
      .attr("y", 10)
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
      )
      .append("text")
      .attr("x", marginWidth / 2)
      .attr("y", 0)
      .attr("dy", "-1.5em")
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      .text(
        options.scales.yAxes.scaleLabel.display
          ? options.scales.yAxes.scaleLabel.text
          : ""
      );

    var g = axis.append("g");
    this.drawXGridLinesOnLeft(g, options, myData.dataset, xScale);
    this.drawYGridLines_BaseOnLeft(axis, options, myData.dataset, yScale);

    // Plotting bar graph
    axis
      .selectAll(".bar")
      .data(myData.dataset)
      .join("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return xScale(d.label);
      })
      .attr("y", function (d) {
        return yScale(d.value);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return options.chartHeight - yScale(d.value);
      })
      .attr("fill", options.chartTheme);
    // Plotting values for the bar
    if (options.values.display)
      axis
        .selectAll(".barValue")
        .data(myData.dataset)
        .join("text")
        .attr("class", "barValue")
        .attr("x", (d) => xScale(d.label) + xScale.bandwidth() / 2)
        .attr(
          "y",
          (d) => yScale(d.value) + (options.chartHeight - yScale(d.value)) / 2
        )
        .attr("fill", "black")
        .attr("font-size", 10)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text((d) =>
          options.values.absolute
            ? d.value
            : parseFloat(
                (d.value / d3.sum(myData.dataset, (d) => d.value)) * 100
              ).toFixed(2)
        );
  }
  axisRightTop(axis, marginWidth, options, myData) {
    var xScale = d3
      .scaleBand()
      .range([0, options.chartWidth])
      .padding(options.chartInnerPadding);
    var yScale = d3.scaleLinear().range([0, options.chartHeight]);

    xScale.domain(
      myData.dataset.map(function (d) {
        return d.label;
      })
    );
    yScale.domain([
      0,
      d3.max(myData.dataset, function (d) {
        return d.value;
      }),
    ]);
    // Drawing X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .call(
        d3
          .axisTop(xScale)
          .ticks(myData.dataset.length)
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
      )
      .append("text")
      .attr("x", marginWidth / 2)
      .attr("y", options.chartHeight)
      .attr("dy", "-1.5em")
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      .text(
        options.scales.yAxes.scaleLabel.display
          ? options.scales.yAxes.scaleLabel.text
          : ""
      );

    var g = axis.append("g");

    this.drawXGridLinesOnLeft(g, options, myData.dataset, xScale);
    this.drawYGridLines_BaseOnLeft(axis, options, myData.dataset, yScale);

    // Plotting bar graph
    axis
      .selectAll(".bar")
      .data(myData.dataset)
      .join("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return xScale(d.label);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return yScale(d.value);
      })
      .attr("fill", options.chartTheme);
    // Plotting values for the bar
    if (options.value.display)
      axis
        .selectAll(".barValue")
        .data(myData.dataset)
        .join("text")
        .attr("class", "barValue")
        .attr("x", (d) => xScale(d.label) + xScale.bandwidth() / 2)
        .attr("y", (d) => yScale(d.value) - yScale(d.value) / 2)
        .attr("fill", "black")
        .attr("font-size", 10)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text((d) =>
          options.values.absolute
            ? d.value
            : parseFloat(
                (d.value / d3.sum(myData.dataset, (d) => d.value)) * 100
              ).toFixed(2)
        );
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
    const width = this.options.chartWidth;
    const height = this.options.chartHeight;

    const maxLabelLength = d3.max(this.myData.dataset, function (d) {
      return d.label.length * 6;
    });
    const marginHeight = maxLabelLength * 2;
    const marginWidth = 100;
    // Clear the space
    d3.select("#d3JS svg").remove();

    // Define svg height and width
    var svg = d3
      .select("#d3JS")
      .append("svg")
      .attr("height", this.options.chartHeight + 2 * marginHeight)
      .attr("width", this.options.chartWidth + 2 * marginWidth);

    // Define entire graph location in the container
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
        .attr("font-size", 12)
        .text(this.options.title.text);

    // Legend Top
    if (this.options.legend.display && this.options.legend.position === "top") {
      var legend = axis
        .append("g")
        .attr(
          "transform",
          "translate(" +
            (this.options.chartWidth / 2 - (title.length * 10 + 15) / 2) +
            ", 0)"
        );
      legend
        .append("rect")
        .attr("class", "legend")
        .attr("x", 0)
        .attr("y", -40)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", this.options.chartTheme);

      legend
        .append("text")
        .attr("class", "legend")
        .attr("x", 15)
        .attr("y", -30)
        .attr("font-size", 10)
        .text("Population");
    }

    // Legend Bottom
    if (
      this.options.legend.display &&
      this.options.legend.position === "bottom"
    ) {
      // To calculate translate for legend => width of the entire chart/2 - (width of the legend)
      // To center the text
      // Width of the legend = 5 (for the distance between indicator and text) + 10(width of indicator) +text length
      var legend = axis
        .append("g")
        .attr(
          "transform",
          "translate(" +
            (width / 2 - (title.length * 10 + 15) / 2) +
            "," +
            height +
            ")"
        );
      legend
        .append("rect")
        .attr("class", "legend")
        .attr("x", 0)
        .attr("y", 40)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", this.options.chartTheme);

      legend
        .append("text")
        .attr("class", "legend")
        .attr("x", 15)
        .attr("y", 50)
        .attr("font-size", 10)
        .text("Population");
    }

    // Finding axis alignment
    if (
      this.options.scales.xAxes.align === "bottom" &&
      this.options.scales.yAxes.align === "left"
    )
      this.axisLeftBottom(axis, this.options, this.myData);
    else if (
      this.options.scales.xAxes.align === "bottom" &&
      this.options.scales.yAxes.align === "right"
    )
      this.axisRightBottom(axis, marginWidth, this.options, this.myData);
    else if (
      this.options.scales.xAxes.align === "top" &&
      this.options.scales.yAxes.align === "left"
    )
      this.axisLeftTop(axis, marginWidth, this.options, this.myData);
    else this.axisRightTop(axis, marginWidth, this.options, this.myData);

    this.adjuster(this.options, axis, svg);
  }
}
