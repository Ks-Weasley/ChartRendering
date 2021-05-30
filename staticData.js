// Contains the static data that must be plotted on a graph

const chartData = {
  radarData: {
    labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
    datasets: [
      {
        label: "Student A",
        backgroundColor: "transparent",
        borderColor: "rgba(200,0,0,0.6)",
        fill: false,
        radius: 6,
        pointRadius: 6,
        pointBorderWidth: 3,
        pointBackgroundColor: "orange",
        pointBorderColor: "rgba(200,0,0,0.6)",
        pointHoverRadius: 10,
        data: [65, 75, 70, 80, 60, 80],
      },
      {
        label: "Student B",
        backgroundColor: "transparent",
        borderColor: "rgba(0,0,200,0.6)",
        fill: false,
        radius: 6,
        pointRadius: 6,
        pointBorderWidth: 3,
        pobarintBackgroundColor: "cornflowerblue",
        pointBorderColor: "rgba(0,0,200,0.6)",
        pointHoverRadius: 10,
        data: [54, 65, 60, 70, 70, 75],
      },
    ],
  },
  radarData2: {
    labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
    datasets: [
      {
        label: "Student A",
        backgroundColor: "rgba(200,0,0,0.2)",
        data: [65, 75, 70, 80, 60, 80],
      },
      {
        label: "Student B",
        backgroundColor: "rgba(0,0,200,0.2)",
        data: [54, 65, 60, 70, 70, 75],
      },
    ],
  },
  doughnutData: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: [2478, 5267, 734, 784, 433],
      },
    ],
  },
  hbarData: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: [2478, 5267, 734, 784, 433],
      },
    ],
  },
  vbarstackedData: {
    labels: [
      "Bix Produce",
      "Capitol City",
      "Charlies Portland",
      "Costa Fruit and Produce",
      "Get Fresh Sales",
      "Loffredo East",
      "Loffredo West",
      "Paragon",
      "Piazza Produce",
    ],
    datasets: [
      {
        label: "Price Compliant",
        backgroundColor: "rgba(34,139,34,0.5)",
        hoverBackgroundColor: "rgba(34,139,34,1)",
        data: [17724, 5565, 3806, 5925, 5721, 6635, 14080, 9027, 25553],
      },
      {
        label: "Non-Compliant",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        hoverBackgroundColor: "rgba(255, 0, 0, 1)",
        data: [1700, 1000, 1800, 1400, 3000, 1000, 5000, 1000, 10000],
      },
    ],
  },
  hbarstackedData: {
    labels: ["2014", "2013", "2012", "2011", "2010"],
    datasets: [
      {
        label: "Men Count",
        data: [727, 589, 537, 543, 574],
        backgroundColor: "rgba(63,103,126,1)",
        hoverBackgroundColor: "rgba(50,90,100,1)",
      },
      {
        label: "Women Count",
        data: [238, 553, 746, 884, 903],
        backgroundColor: "rgba(163,103,126,1)",
        hoverBackgroundColor: "rgba(140,85,100,1)",
      },
      {
        label: "Children Count",
        data: [1238, 553, 746, 884, 903],
        backgroundColor: "rgba(246,203,226,1)",
        hoverBackgroundColor: "rgba(246,185,235,1)",
      },
    ],
  },
  pieData: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: [2478, 5267, 734, 784, 433],
      },
    ],
  },
  vbarData: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: [2478, 5267, 734, 784, 433],
      },
    ],
  },
  lineData: {
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
  },
};
