const url = "samples.json";

function getChart(sample) {
  d3.json(url).then((data) => {
    console.log(data);

    let otuIds = data.samples.filter((item) => item.id == sample)[0].otu_ids;

    let sampleValues = data.samples.filter((item) => item.id == sample)[0]
      .sample_values;

    let otuLabels = data.samples.filter((item) => item.id == sample)[0]
      .otu_labels;

    let yValue = otuIds
      .slice(0, 10)
      .map((otuID) => `OTU ${otuID}`)
      .reverse();
    let trace = {
      y: yValue,
      x: sampleValues.slice(0, 10).reverse(),
      text: otuLabels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };
    let barLayout = {
      title: "Top 10 OTUs",
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Sample Values" },
    };
    let barData = [trace];

    Plotly.newPlot("bar", barData, barLayout);

    let bubbleLayout = {
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" },
    };

    let bubbleData = [
      {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
          size: sampleValues,
          color: otuIds,
          colorscale: "Earth",
        },
      },
    ];

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
}

function getMeta(sample) {
  d3.json(url).then((data) => {
    let result = data.metadata.filter((sampleObj) => sampleObj.id == sample)[0];
   
    d3.select("#sample-metadata").html("");

    Object.entries(result).forEach(([key, value]) => {
      d3.select("#sample-metadata")
        .append("h6")
        .text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

function init() {
  var selector = d3.select("#selDataset");

  d3.json(url).then((data) => {
    let sampleNames = data.names;

    sampleNames.forEach((item) => {
      selector.append("option").text(item).property("value", item);
    });

    let firstSample = sampleNames[0];
    getChart(firstSample);
    getMeta(firstSample);
  });
}

function optionChanged(newSample) {
  getChart(newSample);
  getMeta(newSample);
}

init();
