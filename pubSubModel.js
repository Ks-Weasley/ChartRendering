// Describes all the subscribers of the 'FORM OPTION' (namespace/topic).

const chartJsSubscriber = pubsub.subscribe("FORM OPTION", function (data) {
  console.log("Inside Chartjs");
  console.log(data);
  if (typeof data != undefined || data.isEmpty() == false) renderChartJS(data);
});
const D3JsSubscriber = pubsub.subscribe("FORM OPTION", function (data) {
  console.log("Inside D3js");
  console.log(data);
  if (typeof data != undefined || data.isEmpty() == false) {
    var renderD3 = new RenderD3JS();
    renderD3.main(data);
  }
});
