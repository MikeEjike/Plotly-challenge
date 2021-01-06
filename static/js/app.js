const url = 'samples.json'

d3.json(url).then((data) => {
    console.log(data);
    let trace = {
        x: data.samples.map(item => item.otu_ids),
        y: data.samples.map(item => item.sample_values),
        type: 'bar'
    };
    console.log(trace)
    // let layout = {
    
    // };
    
    let sampleData = [trace];

    Plotly.newPlot("bar", sampleData)

});


