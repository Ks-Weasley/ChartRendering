// Captures the form data onSubmit and publishes it to the 'FORM OPTION' namespace/topic

var formOption = {
  chartWidth: 600,
  chartHeight: 600,
  chartType: "horizontalBar",
  chartData: chartData.hbarData,
  chartTheme: "#5083B4",
  chartInnerPadding: 0.4,
  title: {
    display: true,
    text: "My Chart",
  },
  values: {
    display: true,
    absolute: true,
  },
  legend: {
    display: true,
    position: "top",
  },
  scales: {
    xAxes: {
      display: true,
      color: "black",
      thickness: 2.0,
      align: "bottom",
      type: "solid",
      line: true,
      ticks: true,
      labels: true,
      scaleLabel: {
        display: true,
        text: "Horizontal text",
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
      thickness: 2.0,
      align: "left",
      type: "solid",
      line: true,
      ticks: true,
      labels: true,
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
    values: {
      display: true,
      absolute: true,
      percentage: false,
      smooth: true,
    },
  },
};

function captureChartInformation(form) {
  var elems = form.elements;
  formOption.title.display = elems.showtitle.checked;
  formOption.title.text = elems.titletext.value;
  formOption.values.display = elems.plotDisplay.checked;
  formOption.values.absolute = elems.plotByValue.checked;
  formOption.values.percentage = elems.plotByPercentage.checked;
  formOption.values.smooth = elems.smooth.checked;
  console.log(formOption.values);
  // Legend settings
  formOption.legend.display = elems.showlegend.checked;
  formOption.legend.position =
    elems.lposition.options[elems.lposition.options.selectedIndex].value;

  // X Axis align settings
  formOption.scales.xAxes.align =
    elems.Xposition.options[elems.Xposition.options.selectedIndex].value;
  // X axis tick settings
  formOption.scales.xAxes.ticks = elems.showxaxisTicks.checked;
  // X Axis tick label settings
  formOption.scales.xAxes.labels = elems.showxaxisTickLabels.checked;
  formOption.scales.xAxes.gridLines.display = elems.gridXdisplay.checked;
  formOption.scales.xAxes.gridLines.lineWidth = parseFloat(
    elems.gridXLineWidth.value
  );
  formOption.scales.xAxes.color = elems.xAxesColor.value;
  formOption.scales.xAxes.thickness = parseInt(elems.xAxesThickness.value);
  formOption.scales.xAxes.display = elems.showxaxis.checked;
  formOption.scales.xAxes.scaleLabel.display = elems.showxlabel.checked;
  formOption.scales.xAxes.scaleLabel.text = elems.xlabel.value;
  formOption.scales.xAxes.gridLines.type = elems.xGridLineType.options[elems.xGridLineType.options.selectedIndex].value;
  formOption.scales.xAxes.type = elems.xLineType.options[elems.xLineType.options.selectedIndex].value;
  formOption.scales.xAxes.gridLines.color = elems.xAxesGridColor.value;
  
  // Y Axis align settings
  formOption.scales.yAxes.align =
    elems.Yposition.options[elems.Yposition.options.selectedIndex].value;

  // Y axis tick settings
  formOption.scales.yAxes.ticks = elems.showyaxisTicks.checked;

  // Y axis tick label settings
  formOption.scales.yAxes.labels = elems.showyaxisTickLabels.checked;

 

  formOption.scales.yAxes.gridLines.display = elems.gridYdisplay.checked;
  formOption.scales.yAxes.gridLines.lineWidth = parseFloat(
    elems.gridYLineWidth.value
  );

  
  formOption.scales.yAxes.color = elems.yAxesColor.value;
  formOption.scales.yAxes.thickness = parseInt(elems.yAxesThickness.value);
  formOption.scales.yAxes.display = elems.showyaxis.checked;
  formOption.scales.yAxes.scaleLabel.display = elems.showylabel.checked;
  formOption.scales.yAxes.scaleLabel.text = elems.ylabel.value;
  formOption.scales.yAxes.gridLines.type = elems.yGridLineType.options[elems.yGridLineType.options.selectedIndex].value;
  formOption.scales.yAxes.type = elems.yLineType.options[elems.yLineType.options.selectedIndex].value;
  formOption.scales.yAxes.gridLines.color = elems.yAxesGridColor.value;
  
  var ctype =
    elems.charttype.options[elems.charttype.options.selectedIndex].value;
  var cData = setChartData(ctype);

  formOption.chartType = ctype;
  

  

  // To get/set the category labels in the forms
  var labelNames = document.getElementById("labels").value;
  if (labelNames) {
    var labelItems = labelNames.split(",");
    console.log(labelItems);
    cData.labels = labelItems;
  } else document.getElementById("labels").value = cData.labels;

  // To get/set data in the forms
  var datasets = document.getElementById("datasets").value;
  if (datasets) {
    var dataItems = datasets.split(",");
    console.log(dataItems);
    cData.datasets[0].data = dataItems;
  } else document.getElementById("datasets").value = cData.datasets[0].data;

  // To get/set the data labels
  var datalabels = document.getElementById("datalabels").value;
  if (datalabels) {
    var labelItems = datalabels;
    console.log(labelItems);
    cData.datasets[0].label = labelItems;
  } else document.getElementById("datalabels").value = cData.datasets[0].label;

  formOption.chartData = cData;

  pubsub.publish("FORM OPTION", [formOption]);
}

function setChartData(chartType) {
  "use strict";

  // Chart type
  if (chartType === "line") return chartData.lineData;
  else if (chartType === "bar") return chartData.vbarData;
  else if (chartType === "pie") return chartData.pieData;
  else if (chartType === "radar") return chartData.radarData;
  else if (chartType === "doughnut") return chartData.doughnutData;
  else if (chartType === "horizontalBar") return chartData.hbarData;
  else if (chartType === "verticalBar") return chartData.vbarData;
  return chartData.hbarstackedData;
}
