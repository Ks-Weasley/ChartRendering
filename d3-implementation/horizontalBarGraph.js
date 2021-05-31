class HorizontalBarGraph {
  myData = [
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
  ];
  static options;

  constructor(opts) {
    this.options = opts;
  }

  drawXGridLinesOnBottom(axis, options, myData, linearScale) {
    // Defining X grid lines
    axis
      .append("g")
      .attr("class", "gridX")
      .attr("transform", "translate(0," + options.chartHeight + ")")
      .call(
        d3
          .axisBottom(linearScale)
          .tickSizeInner(
            options.scales.xAxes.gridLines.display ? -options.chartHeight : 0
          )
          .tickFormat(function (d) {
            return "";
          })
          .ticks(myData.length)
      );
  }
  drawXGridLinesOnTop(axis, options, myData, linearScale) {
    // Defining X grid lines
    axis
      .append("g")
      .attr("class", "gridX")
      .attr("transform", "translate(0, 0)")
      .call(
        d3
          .axisTop(linearScale)
          .tickSizeInner(
            options.scales.xAxes.gridLines.display ? -options.chartHeight : 0
          )
          .tickFormat(function (d) {
            return "";
          })
          .ticks(myData.length)
      );
  }
  drawYGridLines_BaseOnTop(g, options, myData, bandScale) {
    // Defining Y grid lines
    g = g.attr("class", "gridY");
    const w =
      ((options.chartInnerPadding * options.chartHeight) /
        (myData.length - 1)) *
      0.5;

    // Defining Y grid lines
    g.selectAll(".gridY")
      .data(myData)
      .join("path")
      .attr("d", function (d, i) {
        var y;
        var pos = (pos = "M0 0L" + options.chartWidth + " 0");
        if (i != myData.length - 1) {
          y = bandScale(d.label) + bandScale.bandwidth() + w;
          pos = "M0 " + y + "L " + options.chartWidth + " " + y;
        }
        return pos;
      })
      .style("stroke", options.scales.yAxes.gridLines.color)
      .style(
        "stroke-width",
        options.scales.yAxes.gridLines.display
          ? options.scales.yAxes.gridLines.width
          : 0
      );
  }
  drawYGridLines_BaseOnBottom(g, options, myData, bandScale) {
    // Defining Y grid lines
    g = g.attr("class", "gridY");
    const w =
      ((options.chartInnerPadding * options.chartHeight) /
        (myData.length - 1)) *
      0.5;

    // Defining Y grid lines
    g.selectAll(".gridY")
      .data(myData)
      .join("path")
      .attr("d", function (d, i) {
        var y;
        var pos = (pos =
          "M0 " +
          options.chartHeight +
          "L" +
          options.chartWidth +
          " " +
          options.chartHeight);
        if (i != myData.length - 1) {
          y = bandScale(d.label) + bandScale.bandwidth() + w;
          pos = "M0 " + y + "L " + options.chartWidth + " " + y;
        }
        return pos;
      })
      .style("stroke", options.scales.yAxes.gridLines.color)
      .style(
        "stroke-width",
        options.scales.yAxes.gridLines.display
          ? options.scales.yAxes.gridLines.width
          : 0
      );
  }

  axisLeftBottom(axis, options, myData) {
    let bandScale = d3
      .scaleBand()
      .domain(
        myData.map(function (d) {
          return d.label;
        })
      )
      .range([0, options.chartHeight])
      .paddingInner(options.chartInnerPadding);

    // Defines height of each band
    let linearScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(myData, function (d) {
          return d.value;
        }),
      ])
      .range([0, options.chartWidth]);

    // Y axis
    axis
      .append("g")
      .attr("class", "yAxis")
      .call(
        d3
          .axisLeft(bandScale)
          .tickSizeOuter(options.scales.yAxes.ticks ? 6 : 0)
          .tickSizeInner(options.scales.yAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.yAxes.labels) return d;
            else return "";
          })
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(options.chartHeight / 2))
      .attr("y", -50)
      .attr("dy", "-1.5em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.yAxes.scaleLabel.display
          ? options.scales.yAxes.scaleLabel.text
          : ""
      );

    // X axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + options.chartHeight + ")")
      .call(
        d3
          .axisBottom(linearScale)
          .ticks(myData.length)
          .tickSizeInner(options.scales.xAxes.ticks ? 6 : 0)
          .tickSizeOuter(options.scales.xAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.xAxes.labels) return d;
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
        options.scales.xAxes.scaleLabel.display
          ? options.scales.xAxes.scaleLabel.text
          : ""
      );
    var g = axis.append("g").attr("class", "gridY");
    this.drawXGridLinesOnTop(axis, options, myData, linearScale);
    this.drawYGridLines_BaseOnTop(g, options, myData, bandScale);

    // Plotting bar data
    axis
      .selectAll(".bar")
      .data(myData)
      .join("rect")
      .attr("class", "bar")
      .attr("y", function (d) {
        d3.select(this);

        return bandScale(d.label);
      })
      .attr("height", bandScale.bandwidth())
      .attr("width", function (d) {
        return linearScale(d.value);
      })
      .attr("fill", options.chartTheme);

    // Plotting values for the bar
    if(options.values.display)
    axis
      .selectAll(".barValue")
      .data(myData)
      .join("text")
      .attr("class", "barValue")
      .attr("x", (d) => linearScale(d.value) / 2)
      .attr("y", (d) => bandScale(d.label) + bandScale.bandwidth() / 2)
      .attr("fill", "black")
      .attr("font-size", 10)
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text((d) =>
        options.values.absolute
          ? d.value
          : parseFloat(
              (d.value / d3.sum(myData, (d) => d.value)) * 100
            ).toFixed(2)
      );
  }

  axisLeftTop(axis, options, myData) {
    // Y axis definition
    let bandScale = d3
      .scaleBand()
      .domain(
        myData.map(function (d) {
          return d.label;
        })
      )
      .range([0, options.chartHeight])
      .paddingInner(options.chartInnerPadding);

    // Defines height of each band
    let linearScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(myData, function (d) {
          return d.value;
        }),
      ])
      .range([0, options.chartWidth]);

    // Y axis
    axis
      .append("g")
      .attr("class", "yAxis")
      .call(
        d3
          .axisLeft(bandScale)
          .tickSizeOuter(options.scales.yAxes.ticks ? 6 : 0)
          .tickSizeInner(options.scales.yAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.yAxes.labels) return d;
            else return "";
          })
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(options.chartHeight / 2))
      .attr("y", -50)
      .attr("dy", "-1.5em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.yAxes.scaleLabel.display
          ? options.scales.yAxes.scaleLabel.text
          : ""
      );
    //X axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0, 0)")
      .call(
        d3
          .axisTop(linearScale)
          .ticks(myData.length)
          .tickSizeInner(options.scales.xAxes.ticks ? 6 : 0)
          .tickSizeOuter(options.scales.xAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.xAxes.labels) return d;
            else return "";
          })
      )
      // defining label
      .append("text")
      .attr("x", options.chartWidth)
      .attr("y", -50)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text(
        options.scales.xAxes.scaleLabel.display
          ? options.scales.xAxes.scaleLabel.text
          : ""
      );

    var g = axis.append("g").attr("class", "gridY");

    this.drawXGridLinesOnBottom(axis, options, myData, linearScale);
    this.drawYGridLines_BaseOnBottom(g, options, myData, bandScale);

    // Plotting bar graph
    axis
      .selectAll(".bar")
      .data(myData)
      .join("rect")
      .attr("class", "bar")
      .attr("y", function (d) {
        return bandScale(d.label);
      })
      .attr("height", bandScale.bandwidth())
      .attr("width", function (d) {
        return linearScale(d.value);
      })
      .attr("fill", options.chartTheme);

    // Plotting values for the bar
    if (options.values.display)
      axis
        .selectAll(".barValue")
        .data(myData)
        .join("text")
        .attr("class", "barValue")
        .attr("x", (d) => linearScale(d.value) / 2)
        .attr("y", (d) => bandScale(d.label) + bandScale.bandwidth() / 2)
        .attr("fill", "black")
        .attr("font-size", 10)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text((d) =>
          options.values.absolute
            ? d.value
            : parseFloat(
                (d.value / d3.sum(myData, (d) => d.value)) * 100
              ).toFixed(2)
        );
  }

  axisRightBottom(axis, options, myData) {
    // Defines the width of each band - Uniformly spaced
    let bandScale = d3
      .scaleBand()
      .domain(
        myData.map(function (d) {
          return d.label;
        })
      )
      .range([0, options.chartHeight])
      .paddingInner(options.chartInnerPadding);

    // Defines height of each band
    let linearScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(myData, function (d) {
          return d.value;
        }),
      ])
      .range([options.chartWidth, 0]);
    // Y axis
    axis
      .append("g")
      .attr("class", "yAxis")
      .attr("transform", "translate(" + options.chartWidth + ", 0)")
      .call(
        d3
          .axisRight(bandScale)
          .tickSizeOuter(options.scales.yAxes.ticks ? 6 : 0)
          .tickSizeInner(options.scales.yAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.yAxes.labels) return d;
            else return "";
          })
      )
      .append("text")
      .attr("class", "yLabel")
      .attr("x", 10)
      .attr("y", 0)
      //.attr("dy", "-1.5em")
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      .text(
        options.scales.yAxes.scaleLabel.display
          ? options.scales.yAxes.scaleLabel.text
          : ""
      );
    // X axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + options.chartHeight + ")")
      .call(
        d3
          .axisBottom(linearScale)
          .ticks(myData.length)
          .tickSizeInner(options.scales.xAxes.ticks ? 6 : 0)
          .tickSizeOuter(options.scales.xAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.xAxes.labels) return d;
            else return "";
          })
      ) // defining label
      .append("text")
      .attr("x", 0)
      .attr("y", 50)
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      .text(
        options.scales.xAxes.scaleLabel.display
          ? options.scales.xAxes.scaleLabel.text
          : ""
      );

    // X axis grid lines
    axis
      .append("g")
      .attr("class", "gridX")
      .attr("transform", "translate(0," + options.chartHeight + ")")
      .call(
        d3
          .axisBottom(linearScale)
          .tickSizeInner(
            options.scales.xAxes.gridLines.display ? -options.chartHeight : 0
          )
          .tickFormat(function (d) {
            return "";
          })
          .ticks(myData.length)
      );

    var g = axis.append("g").attr("class", "gridY");

    this.drawXGridLinesOnTop(axis, options, myData, linearScale);
    this.drawYGridLines_BaseOnTop(g, options, myData, bandScale);

    // Plotting bar graph
    axis
      .selectAll(".bar")
      .data(myData)
      .join("rect")
      .attr("class", "bar")
      .attr("y", function (d) {
        return bandScale(d.label);
      })
      .attr("x", function (d) {
        return linearScale(d.value);
      })
      .attr("height", bandScale.bandwidth())
      .attr("width", function (d) {
        return options.chartWidth - linearScale(d.value);
      })
      .attr("fill", options.chartTheme);

    // Plotting values for the bar
    if (options.values.display)
      axis
        .selectAll(".barValue")
        .data(myData)
        .join("text")
        .attr("class", "barValue")
        .attr(
          "x",
          (d) =>
            linearScale(d.value) +
            (options.chartWidth - linearScale(d.value)) / 2
        )
        .attr("y", (d) => bandScale(d.label) + bandScale.bandwidth() / 2)
        .attr("fill", "black")
        .attr("font-size", 10)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text((d) =>
          options.values.absolute
            ? d.value
            : parseFloat(
                (d.value / d3.sum(myData, (d) => d.value)) * 100
              ).toFixed(2)
        );
  }

  axisRightTop(axis, options, myData) {
    // Defines the width of each band - Uniformly spaced
    let bandScale = d3
      .scaleBand()
      .domain(
        myData.map(function (d) {
          return d.label;
        })
      )
      .range([0, options.chartHeight])
      .paddingInner(options.chartInnerPadding);

    // Defines height of each band
    let linearScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(myData, function (d) {
          return d.value;
        }),
      ])
      .range([options.chartWidth, 0]);
    // Y axis
    axis
      .append("g")
      .attr("class", "yAxis")
      .attr("transform", "translate(" + options.chartWidth + ", 0)")
      .call(
        d3
          .axisRight(bandScale)
          .tickSizeOuter(options.scales.yAxes.ticks ? 6 : 0)
          .tickSizeInner(options.scales.yAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.yAxes.labels) return d;
            else return "";
          })
      )
      .append("text")
      .attr("class", "yLabel")
      .attr("x", 10)
      .attr("y", options.chartHeight)
      //.attr("dy", "-1.5em")
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      .text(
        options.scales.yAxes.scaleLabel.display
          ? options.scales.yAxes.scaleLabel.text
          : ""
      );
    // X axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0, 0)")
      .call(
        d3
          .axisTop(linearScale)
          .ticks(myData.length)
          .tickSizeInner(options.scales.xAxes.ticks ? 6 : 0)
          .tickSizeOuter(options.scales.xAxes.ticks ? 6 : 0)
          .tickFormat(function (d) {
            if (options.scales.xAxes.labels) return d;
            else return "";
          })
      ) // defining label
      .append("text")
      .attr("x", 0)
      .attr("y", -30)
      .attr("text-anchor", "start")
      .attr("stroke", "black")
      .text(
        options.scales.xAxes.scaleLabel.display
          ? options.scales.xAxes.scaleLabel.text
          : ""
      );

    var g = axis.append("g").attr("class", "gridY");

    this.drawXGridLinesOnBottom(axis, options, myData, linearScale);
    this.drawYGridLines_BaseOnBottom(g, options, myData, bandScale);

    // Plotting bar graph
    axis
      .selectAll(".bar")
      .data(myData)
      .join("rect")
      .attr("class", "bar")
      .attr("y", function (d) {
        return bandScale(d.label);
      })
      .attr("x", function (d) {
        return linearScale(d.value);
      })
      .attr("height", bandScale.bandwidth())
      .attr("width", function (d) {
        return options.chartWidth - linearScale(d.value);
      })
      .attr("fill", options.chartTheme);

    // Plotting values for the bar
    if (options.values.display)
      axis
        .selectAll(".barValue")
        .data(myData)
        .join("text")
        .attr("class", "barValue")
        .attr(
          "x",
          (d) =>
            linearScale(d.value) +
            (options.chartWidth - linearScale(d.value)) / 2
        )
        .attr("y", (d) => bandScale(d.label) + bandScale.bandwidth() / 2)
        .attr("fill", "black")
        .attr("font-size", 10)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text((d) =>
          options.values.absolute
            ? d.value
            : parseFloat(
                (d.value / d3.sum(myData, (d) => d.value)) * 100
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
    svg.selectAll(".gridX > :first-child").remove();

    // Remove Y grid domain
    svg.selectAll(".gridY>.domain").remove();

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
      .attr("stroke-width", this.options.scales.xAxes.gridLines.width)
      .attr(
        "stroke-dasharray",
        this.options.scales.xAxes.gridLines.type["stroke-dasharray"]
      )
      .attr(
        "stroke-linecap",
        this.options.scales.xAxes.gridLines.type["stroke-linecap"]
      )
      .attr("stroke", this.options.scales.xAxes.gridLines.color);
    svg
      .selectAll(".gridX line")
      .attr("stroke", this.options.scales.xAxes.gridLines.color);
    //  Setting Grid Y Axis
    svg
      .selectAll(".gridY")
      .attr("stroke-width", this.options.scales.yAxes.gridLines.width)
      .attr(
        "stroke-dasharray",
        this.options.scales.yAxes.gridLines.type["stroke-dasharray"]
      )
      .attr(
        "stroke-linecap",
        this.options.scales.yAxes.gridLines.type["stroke-linecap"]
      )
      .attr("stroke", this.options.scales.yAxes.gridLines.color);
  }

  main() {
    const margin = 200;
    const width = this.options.chartWidth;
    const height = this.options.chartHeight;
    const title = this.options.title.text;

    const maxLabelLength = d3.max(this.myData, function (d) {
      return d.label.length * 6;
    });
    const marginWidth = maxLabelLength * 2;
    const marginHeight = 100;

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
        .attr("x", width / 2 - title.length * 6)
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
          "translate(" + (width / 2 - (title.length * 10 + 15) / 2) + ", 0)"
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
      this.axisRightBottom(axis, this.options, this.myData);
    else if (
      this.options.scales.xAxes.align === "top" &&
      this.options.scales.yAxes.align === "left"
    )
      this.axisLeftTop(axis, this.options, this.myData);
    else this.axisRightTop(axis, this.options, this.myData);

    this.adjuster(this.options, axis, svg);
  }
}
