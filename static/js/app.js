const url = "samples.json";

function getChart(sample) {
  d3.json(url).then((data) => {
    console.log(data);

    let otuIds = data.samples.filter((item) => item.id == sample)[0].otu_ids;

    // let yValue = data.samples.map(item => item.sample_values);
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
    let barLayout ={
        title: "Top 10 OTUs",
        xaxis:{title: "OTU IDs"},
        yaxis:{title: "Sample Values"},
    } 
    let barData = [trace];

    Plotly.newPlot("bar", barData, barLayout);

    let bubbleLayout = {
    //   title: "Bacteria Cultures Per Sample",
    //   margin: { t: 0 },
    //   hovermode: "closest",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" },

    //   margin: { t: 30 },
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


    // for (let index = 0; index < xValue.length; index++) {
    //     const element = xValue[index];

    // }

    // xValue.forEach((valueX) => {
    //     console.log(valueX);
    // });

    // yValue.forEach((valueY) => {
    //     console.log(valueY);
    // });

    // let trace = {
    //     x: xValue,
    //     y: yValue,
    //     type: "bar",
    // };
    // console.log(trace)
    // let layout = {

    // };

    // let sampleData = [trace];

    // Plotly.newPlot("bar", sampleData);
  });
}

// function buildMetadata(sample) {
//   d3.json(url).then((data) => {
//     let metadata = data.metadata;
//     // Filter the data for the object with the desired sample number
//     let resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);
//     let result = resultArray[0];
//     // Use d3 to select the panel with id of `#sample-metadata`
//     let PANEL = d3.select("#sample-metadata");

//     // Use `.html("") to clear any existing metadata
//     PANEL.html("");

//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.
//     Object.entries(result).forEach(([key, value]) => {
//       PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
//     });

//     // BONUS: Build the Gauge Chart
//     // buildGauge(result.wfreq);
//   });
// }

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json(url).then((data) => {
    let sampleNames = data.names;

    sampleNames.forEach((item) => {
      selector.append("option").text(item).property("value", item);
    });

    // // Use the first sample from the list to build the initial plots
    let firstSample = sampleNames[0];
    getChart(firstSample);
    // buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  getChart(newSample);
  //   buildMetadata(newSample);
}

init();

// let dropDown = d3.select("#selDataset");

// dropDown.on("change", handleClick);

// function handleClick(event) {
//     let value = dropDown.property("value")

//     d3.json(url).then((data) => {
//         console.log(value)

//         data.samples.map(item =>
//             item.otu_ids.forEach(valueX =>{}));
//             item.sample_values.forEach(valueX =>{});
//             switch (value) {
//                 case 'dataset1':
//                     x = XX;
//                     y = YY;
//                     break;
//                 default:
//             };

//         // let xValue = data.samples.map(item => item.otu_ids);

//         // let yValue = data.samples.map(item => item.sample_values);

//         // let XX = xValue.forEach(valueX => {
//         //     console.log(valueX)
//         // });

//         // let YY = yValue.forEach(valueY => {
//         //     console.log(valueY)
//         // });

//         // switch (value) {
//         //     case 'dataset1':
//         //         x = XX;
//         //         y = YY;
//         //         break;
//         //     default:
//         // };

//         console.log(x, y);
//         let trace = {
//             x: x,
//             y: y,
//             type: 'line',
//             name: 'Handling Events'
//         };

//         let data1 = [trace];

//         Plotly.newPlot("plot", data1);
//     }
//     )};
