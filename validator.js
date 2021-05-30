function validateForm(form) {
  event.preventDefault();
  var valid = true;
  data = form.elements; 
  const cData = data.datasets.value;

  console.log("Chart data; ", cData);

  // Validate data - Only numbers separated by , allowed
  if (/^[\s(0-9\,)*\s]*$/.test(cData) == false) {
    var node = document.createElement("p");
    var textNode = document.createTextNode("Error: Expected only numbers in Chart data!");
    node.appendChild(textNode);
    document.getElementById("report").appendChild(node);
    valid = false;
  }

  if(valid == true)
    captureChartInformation(form);
}
