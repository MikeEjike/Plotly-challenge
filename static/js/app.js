const url = 'samples.json'

d3.json(url).then((data) => {
    console.log(data);

    let xValue = data.samples.map(item => item.otu_ids);

    let yValue = data.samples.map(item => item.sample_values);
    // console.log(xValue)
    for (let index = 0; index < xValue.length; index++) {
        const element = xValue[index];
        
    }
    
    let trace = {
        x: xValue,
        y: yValue,
        type: 'bar'
    };
    // console.log(trace)
    // let layout = {
    
    // };
    
    let sampleData = [trace];

    Plotly.newPlot("bar", sampleData)

});


