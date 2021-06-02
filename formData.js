// Captures the form data onSubmit and publishes it to the 'FORM OPTION' namespace/topic

var formOption = {
  chart: {
    width: 600,
    height: 600,
    type: "horizontalBar",
    theme: "#5083B4",
    innerPadding: 0.4,
  },
  title: {
    text: "",
  },
  legend: {
    enabled: "true",
    align: "center",
    verticalAlign: "bottom",
  },
  values: {
    enabled: "true",
    absolute: "true",
    smooth: "true",
  },
  xAxis: {
    enabled: "true",
    lineColor: "black",
    lineWidth: 2.0,
    opposite: "false",
    dashType: "solid",
    tickLength: 1,
    labels: {
      enabled: "true",
      color: "black",
    },
    title: {
      text: "",
      color: "black",
    },
    gridLines: {
      enabled: "true",
      width: 0.5,
      color: "black",
      dashType: "solid",
    },
  },
  yAxis: {
    enabled: "true",
    lineColor: "black",
    lineWidth: 2.0,
    opposite: "false",
    dashType: "solid",
    tickLength: 1,
    labels: {
      enabled: "true",
      color: "black",
    },
    title: {
      text: "",
      color: "black",
    },
    gridLines: {
      enabled: "true",
      width: 0.5,
      color: "black",
      dashType: "solid",
    },
  },
};

function captureChartInformation(form) {
  var elems = form.elements;

  formOption.chart.height = parseFloat(form.chartH.value);
  formOption.chart.width = parseFloat(form.chartW.value);

  formOption.title.text = elems.titletext.value;
  formOption.values.enabled = elems.plotDisplay.checked.toString();
  formOption.values.absolute = elems.plotByValue.checked.toString();
  formOption.values.smooth = elems.smooth.checked.toString();
  
  // Legend settings
  formOption.legend.enabled = elems.showlegend.checked.toString();
  formOption.legend.verticalAlign =
    elems.lposition.options[elems.lposition.options.selectedIndex].value;

  // X Axis align settings
  formOption.xAxis.opposite =
    elems.Xposition.options[elems.Xposition.options.selectedIndex].value ===
    "top"
      ? "true"
      : "false";
  // X axis tick settings
  formOption.xAxis.tickLength = elems.showxaxisTicks.checked ? 1 : 0;
  // X Axis tick label settings
  formOption.xAxis.labels.enabled = elems.showxaxisTickLabels.checked.toString();
  formOption.xAxis.gridLines.enabled = elems.gridXdisplay.checked.toString();
  formOption.xAxis.gridLines.width = parseFloat(elems.gridXLineWidth.value);
  formOption.xAxis.lineColor = elems.xAxesColor.value;
  formOption.xAxis.lineWidth = parseInt(elems.xAxesThickness.value);
  formOption.xAxis.enabled = elems.showxaxis.checked.toString();
  formOption.xAxis.title.text = elems.xlabel.value;
  formOption.xAxis.gridLines.dashType =
    elems.xGridLineType.options[
      elems.xGridLineType.options.selectedIndex
    ].value;
  formOption.xAxis.dashType =
    elems.xLineType.options[elems.xLineType.options.selectedIndex].value;
  formOption.xAxis.gridLines.color = elems.xAxesGridColor.value;

  // Y Axis align settings
  formOption.yAxis.opposite =
    elems.Yposition.options[elems.Yposition.options.selectedIndex].value ===
    "left"
      ? "false"
      : "true";

  // Y axis tick settings
  formOption.yAxis.tickLength = elems.showyaxisTicks.checked ? 1: 0;

  // Y axis tick label settings
  formOption.yAxis.labels.enabled =
    elems.showyaxisTickLabels.checked.toString();

  formOption.yAxis.gridLines.enabled = elems.gridYdisplay.checked.toString();
  formOption.yAxis.gridLines.width = parseFloat(elems.gridYLineWidth.value);

  formOption.yAxis.lineColor = elems.yAxesColor.value;
  formOption.yAxis.lineWidth = parseInt(elems.yAxesThickness.value);
  formOption.yAxis.enabled = elems.showyaxis.checked.toString();
  formOption.yAxis.title.text = elems.ylabel.value;
  formOption.yAxis.gridLines.dashType =
    elems.yGridLineType.options[
      elems.yGridLineType.options.selectedIndex
    ].value;
  formOption.yAxis.dashType =
    elems.yLineType.options[elems.yLineType.options.selectedIndex].value;
  formOption.yAxis.gridLines.color = elems.yAxesGridColor.value;

  var ctype =
    elems.charttype.options[elems.charttype.options.selectedIndex].value;
  var cData = setChartData(ctype);

  formOption.chart.type = ctype;

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
  
  console.log("User input:")
  console.log(formOption);
  pubsub.publish("FORM OPTION", [formOption]);
}
