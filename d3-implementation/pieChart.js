class PieChart {
  data = [
    { platform: "Android", percentage: 40.11 },
    { platform: "Windows", percentage: 36.69 },
    { platform: "iOS", percentage: 13.06 },
    { platform: "Linux", percentage: 30.0 },
    { platform: "Mac", percentage: 5.0 },
  ];

  static options;
  constructor(opts) {
    this.options = opts;
  }

  main() {
    const fontSize = 10;
    const title = this.options.title.text;
    const titleFontSize = 12;
    const marginWidth = d3.sum(this.data, function (d) {
      return 10 + 5 + d.platform.length * fontSize + 5;
    });
    const padding = (this.options.chartWidth - marginWidth) / this.data.length;

    const marginHeight = 100 > fontSize * 4 ? 100 : fontSize * 2;
    const svgRadius =
      Math.min(
        this.options.chartWidth,
        this.options.chartHeight + marginHeight
      ) / 2;

    // Clear the space
    d3.select("#d3JS svg").remove();

    var svg = d3
      .select("#d3JS")
      .append("svg")
      .attr(
        "width",
        this.options.chartWidth > marginWidth
          ? this.options.chartWidth
          : marginWidth
      )
      .attr("height", this.options.chartHeight + marginHeight * 2);
    var g = svg
      .append("g")
      .attr(
        "transform",
        "translate(" +
          this.options.chartWidth / 2 +
          "," +
          (this.options.chartHeight + marginHeight) / 2 +
          ")"
      );

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var pie = d3.pie().value((d) => d.percentage);

    var path = d3.arc().outerRadius(svgRadius).innerRadius(0).padAngle(0.004);

    var arc = g.selectAll("arc").data(pie(this.data)).join("g");

    arc
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => color(d.data.percentage));

    var label = d3.arc().outerRadius(svgRadius).innerRadius(0).padAngle(0.004);
    var tempOptions = this.options;
    if (this.options.values.display)
      arc
        .append("text")
        .attr("transform", (d) => "translate(" + label.centroid(d) + ")")
        .attr("text-anchor", "middle")
        .text((d) => d.data.percentage + "%");

    // Adding title
    let legendAndTitle = svg
      .append("g")
      .attr("class", "legendAndTitle")
      .attr(
        "transform",
        "translate(" +
          (this.options.chartWidth / 2 - (title.length * titleFontSize) / 4) +
          "," +
          ((this.options.chartHeight + marginHeight) / 2 - svgRadius) +
          ")"
      );
    if (this.options.title.display) {
      legendAndTitle
        .append("g")
        .append("text")
        .attr("x", 0)
        .attr("y", -30)
        .attr("class", "title")
        .attr("font-size", titleFontSize)
        .text(this.options.title.text);
    }
    // Adding legend bottom
    var width = 0;
    if (
      this.options.legend.display &&
      this.options.legend.position === "bottom"
    ) {
      var legend = legendAndTitle
        .append("g")
        .attr("class", "legendClass")
        .attr(
          "transform",
          "translate(" +
            -Math.abs(title.length * titleFontSize - marginWidth) / 2 +
            ", 0)"
        );
      legend = legend
        .selectAll(".legend")
        .data(pie(this.data))
        .join("g")
        .attr("transform", function (d) {
          const res =
            "translate(" +
            width +
            " , " +
            (tempOptions.chartHeight + marginHeight / 2) +
            ")";
          width += 10 + 5 + d.data.platform.length * fontSize + 5;
          return res;
        });
      legend
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function (d) {
          return color(d.data.percentage);
        });

      legend
        .append("text")
        .attr("class", "legend")
        .attr("x", 15)
        .attr("y", 10)
        .attr("font-size", fontSize)
        .text(function (d) {
          return d.data.platform;
        });
    }
    // Adding Legend top
    if (this.options.legend.display && this.options.legend.position === "top") {
      var legend = legendAndTitle
        .append("g")
        .attr("class", "legendClass")
        .attr(
          "transform",
          "translate(" +
            -Math.abs(title.length * titleFontSize - marginWidth) / 2 +
            ", 0)"
        );
      legend = legend
        .selectAll(".legend")
        .data(pie(this.data))
        .join("g")
        .attr("transform", function (d) {
          const res = "translate(" + width + " , " + -20 + ")";
          width += 10 + 5 + d.data.platform.length * fontSize + 5;
          return res;
        });
      legend
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function (d) {
          return color(d.data.percentage);
        });

      legend
        .append("text")
        .attr("class", "legend")
        .attr("x", 15)
        .attr("y", 10)
        .attr("font-size", fontSize)
        .text(function (d) {
          return d.data.platform;
        });
    }
  }
}
