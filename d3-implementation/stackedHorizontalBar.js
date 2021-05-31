class StackedHorizontalBarGraph {
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
        (myData.length + 1)) *
      0.5;

    // Defining Y grid lines
    g.selectAll(".gridY")
      .data(myData)
      .join("path")
      .attr("class", "")
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
        (myData.length + 1)) *
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

  axisLeftBottom(axis, options, myData, colors = this.colors) {
    // Defining X Axis
    var xScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.stackedDataset[2], function (d) {
          return d[1];
        }),
      ])
      .range([0, options.chartWidth]);

    // Defining Y Axis
    var yScale = d3
      .scaleBand()
      .domain(
        myData.map(function (d) {
          return d.label;
        })
      )
      .range([0, options.chartHeight])
      .padding(options.chartInnerPadding);
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

    this.drawXGridLinesOnTop(axis, options, myData, xScale);
    this.drawYGridLines_BaseOnTop(g, options, myData, yScale);
    var keys = this.keys;
    // Plotting the data
    axis = axis.append("g").classed("bar", true);
    var g = axis
      .selectAll(".bar")
      .data(this.stackedDataset)
      .join("g")
      .attr("class", (d, i) => keys[i])
      .style("fill", function (d, i) {
        return colors[i];
      });

    // Plotting the rectangles
    g.selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("width", (d) => xScale(d[1]) - xScale(d[0]))
      .attr("height", yScale.bandwidth())
      .attr("y", (d, i) => yScale(d.data.label))
      .attr("x", (d) => xScale(d[0]));

    if (options.values.display)
      for (let i = 0; i < keys.length; i++)
        g.selectAll(keys[i])
          .data(this.stackedDataset[i])
          .join("text")
          .attr("class", "barValue")
          .attr("x", (d) => xScale(d[0]) + (xScale(d[1]) - xScale(d[0])) / 2)
          .attr("y", (d) => yScale(d.data.label) + yScale.bandwidth() / 2)
          .attr("fill", "black")
          .attr("font-size", 10)
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle")
          .text((d) => {
            if (options.values.absolute)
              return keys[i] === "men_count"
                ? d.data.men_count
                : keys[i] === "women_count"
                ? d.data.women_count
                : d.data.children_count;
            else
              return keys[i] === "men_count"
                ? parseFloat(
                    (d.data.men_count /
                      d3.sum(
                        this.stackedDataset[i],
                        (d, i) => d.data.men_count
                      )) *
                      100
                  ).toFixed(2)
                : keys[i] === "women_count"
                ? parseFloat(
                    (d.data.women_count /
                      d3.sum(
                        this.stackedDataset[i],
                        (d, i) => d.data.women_count
                      )) *
                      100
                  ).toFixed(2)
                : parseFloat(
                    (d.data.children_count /
                      d3.sum(
                        this.stackedDataset[i],
                        (d, i) => d.data.children_count
                      )) *
                      100
                  ).toFixed(2);
          });
  }

  axisLeftTop(axis, options, myData, colors = this.colors) {
    // Defining X Axis
    var xScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.stackedDataset[this.keys.length - 1], function (d) {
          return d[1];
        }),
      ])
      .range([0, options.chartWidth]);

    // Defining Y Axis
    var yScale = d3
      .scaleBand()
      .domain(
        myData.map(function (d) {
          return d.label;
        })
      )
      .range([0, options.chartHeight])
      .padding(options.chartInnerPadding);
    // Drawing X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0, 0)")
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

    this.drawXGridLinesOnBottom(axis, options, myData, xScale);
    this.drawYGridLines_BaseOnBottom(g, options, myData, yScale);
    const keys = this.keys;
    // Plotting the data
    axis = axis.append("g").classed("bar", true);
    var g = axis
      .selectAll(".bar")
      .data(this.stackedDataset)
      .join("g")
      .attr("class", (d, i) => keys[i])
      .style("fill", function (d, i) {
        return colors[i];
      });
    // Plotting the rectangles
    g.selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("width", (d) => xScale(d[1]) - xScale(d[0]))
      .attr("height", yScale.bandwidth())
      .attr("y", (d, i) => yScale(d.data.label))
      .attr("x", (d) => xScale(d[0]));
    // Plotting the bar values
    if (options.values.display)
      for (let i = 0; i < keys.length; i++)
        g.selectAll(keys[i])
          .data(this.stackedDataset[i])
          .join("text")
          .attr("class", "barValue")
          .attr("x", (d) => xScale(d[0]) + (xScale(d[1]) - xScale(d[0])) / 2)
          .attr("y", (d) => yScale(d.data.label) + yScale.bandwidth() / 2)
          .attr("fill", "black")
          .attr("font-size", 10)
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle")
          .text((d) => {
            if (options.values.absolute)
              return keys[i] === "men_count"
                ? d.data.men_count
                : keys[i] === "women_count"
                ? d.data.women_count
                : d.data.children_count;
            else
              return keys[i] === "men_count"
                ? parseFloat(
                    (d.data.men_count /
                      d3.sum(
                        this.stackedDataset[i],
                        (d, i) => d.data.men_count
                      )) *
                      100
                  ).toFixed(2)
                : keys[i] === "women_count"
                ? parseFloat(
                    (d.data.women_count /
                      d3.sum(
                        this.stackedDataset[i],
                        (d, i) => d.data.women_count
                      )) *
                      100
                  ).toFixed(2)
                : parseFloat(
                    (d.data.children_count /
                      d3.sum(
                        this.stackedDataset[i],
                        (d, i) => d.data.children_count
                      )) *
                      100
                  ).toFixed(2);
          });
  }

  axisRightBottom(axis, options, myData, colors = this.colors) {
    // Defining X Axis
    var xScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.stackedDataset[this.keys.length - 1], function (d) {
          return d[1];
        }),
      ])
      .range([options.chartWidth, 0]);

    // Defining Y Axis
    var yScale = d3
      .scaleBand()
      .domain(
        myData.map(function (d) {
          return d.label;
        })
      )
      .range([0, options.chartHeight])
      .padding(options.chartInnerPadding);
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
      .attr("y", 30)
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
      //.attr("transform", "rotate(-90)")
      .attr("x", 10)
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
    this.drawXGridLinesOnTop(axis, options, myData, xScale);
    this.drawYGridLines_BaseOnTop(axis, options, myData, yScale);
    const keys = this.keys;
    // Plotting the myData
    axis = axis.append("g").classed("bar", true);
    var g = axis
      .selectAll(".bar")
      .data(this.stackedDataset)
      .join("g")
      .attr("class", (d, i) => keys[i])
      .style("fill", function (d, i) {
        return colors[i];
      });

    g.selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("width", (d) => xScale(d[0]) - xScale(d[1]))
      .attr("height", yScale.bandwidth())
      .attr("y", (d, i) => yScale(d.data.label))
      .attr("x", (d) => xScale(d[1]));

    if (options.values.display)
      for (let i = 0; i < keys.length; i++)
        g.selectAll(keys[i])
          .data(this.stackedDataset[i])
          .join("text")
          .attr("class", "barValue")
          .attr("x", (d) => xScale(d[1]) + (xScale(d[0]) - xScale(d[1])) / 2)
          .attr("y", (d) => yScale(d.data.label) + yScale.bandwidth() / 2)
          .attr("fill", "black")
          .attr("font-size", 10)
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle")
          .text((d) => {
            if (options.values.absolute)
              return keys[i] === "men_count"
                ? d.data.men_count
                : keys[i] === "women_count"
                ? d.data.women_count
                : d.data.children_count;
            else
              return keys[i] === "men_count"
                ? parseFloat(
                    (d.data.men_count /
                      d3.sum(
                        this.stackedDataset[i],
                        (d, i) => d.data.men_count
                      )) *
                      100
                  ).toFixed(2)
                : keys[i] === "women_count"
                ? parseFloat(
                    (d.data.women_count /
                      d3.sum(
                        this.stackedDataset[i],
                        (d, i) => d.data.women_count
                      )) *
                      100
                  ).toFixed(2)
                : parseFloat(
                    (d.data.children_count /
                      d3.sum(
                        this.stackedDataset[i],
                        (d, i) => d.data.children_count
                      )) *
                      100
                  ).toFixed(2);
          });
  }

  axisRightTop(axis, options, myData, colors = this.colors) {
    // Defining X Axis
    var xScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.stackedDataset[this.keys.length - 1], function (d) {
          return d[1];
        }),
      ])
      .range([options.chartWidth, 0]);

    // Defining Y Axis
    var yScale = d3
      .scaleBand()
      .domain(
        myData.map(function (d) {
          return d.label;
        })
      )
      .range([0, options.chartHeight])
      .padding(options.chartInnerPadding);
    // Drawing X Axis
    axis
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0, 0)")
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
      //.attr("transform", "rotate(-90)")
      .attr("x", 10)
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

    this.drawXGridLinesOnBottom(axis, options, myData, xScale);
    this.drawYGridLines_BaseOnBottom(g, options, myData, yScale);

    // Plotting the data
    const keys = this.keys;
    axis = axis.append("g").classed("bar", true);
    var g = axis
      .selectAll(".bar")
      .data(this.stackedDataset)
      .join("g")
      .attr("class", (d, i) => keys[i])
      .style("fill", function (d, i) {
        return colors[i];
      });

    g.selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("width", (d) => xScale(d[0]) - xScale(d[1]))
      .attr("height", yScale.bandwidth())
      .attr("y", (d, i) => yScale(d.data.label))
      .attr("x", (d) => xScale(d[1]));

    if (options.values.display)
      for (let i = 0; i < keys.length; i++)
        g.selectAll(keys[i])
          .data(this.stackedDataset[i])
          .join("text")
          .attr("class", "barValue")
          .attr("x", (d) => xScale(d[1]) + (xScale(d[0]) - xScale(d[1])) / 2)
          .attr("y", (d) => yScale(d.data.label) + yScale.bandwidth() / 2)
          .attr("fill", "black")
          .attr("font-size", 10)
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle")
          .text((d) => {
            if (options.values.absolute)
              return keys[i] === "men_count"
                ? d.data.men_count
                : keys[i] === "women_count"
                ? d.data.women_count
                : d.data.children_count;
            else
              return keys[i] === "men_count"
                ? parseFloat(
                    (d.data.men_count /
                      d3.sum(
                        this.stackedDataset[i],
                        (d, i) => d.data.men_count
                      )) *
                      100
                  ).toFixed(2)
                : keys[i] === "women_count"
                ? parseFloat(
                    (d.data.women_count /
                      d3.sum(
                        this.stackedDataset[i],
                        (d, i) => d.data.women_count
                      )) *
                      100
                  ).toFixed(2)
                : parseFloat(
                    (d.data.children_count /
                      d3.sum(
                        this.stackedDataset[i],
                        (d, i) => d.data.children_count
                      )) *
                      100
                  ).toFixed(2);
          });
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
      this.axisLeftTop(axis, this.options, this.data);
    else this.axisRightTop(axis, this.options, this.data);

    this.adjuster(this.options, axis, svg);
  }
}
