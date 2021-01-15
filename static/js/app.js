const url = "samples.json";

function getChart(sample){
    d3.json(url).then((data) => {
    console.log(data);

    let otuIds = data.samples.filter((item) => item.id == sample)[0].otu_ids;

    // let yValue = data.samples.map(item => item.sample_values);
    let sampleValues = data.samples.filter((item) => item.id == sample)[0]
        .sample_values;

    let otuLabels = data.samples.filter((item) => item.id == sample)[0]
        .otu_labels;

    console.log(xValue);
    // for (let index = 0; index < xValue.length; index++) {
    //     const element = xValue[index];

    // }

    xValue.forEach((valueX) => {
        console.log(valueX);
    });

    yValue.forEach((valueY) => {
        console.log(valueY);
    });

    let trace = {
        x: xValue,
        y: yValue,
        type: "bar",
    };
    // console.log(trace)
    // let layout = {

    // };

    let sampleData = [trace];

    Plotly.newPlot("bar", sampleData);
    });
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });

    // // Use the first sample from the list to build the initial plots
    // var firstSample = sampleNames[0];
    // buildCharts(firstSample);
    // buildMetadata(firstSample);
  });
}
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
