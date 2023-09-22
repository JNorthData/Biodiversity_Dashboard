function optionChanged(selectedValue) {
  // When the user selects a new value, update the demographic info and charts
  updateDemographicInfo(selectedValue);
  updateBarChart(selectedValue);
  updateBubbleChart(selectedValue);
}



function updateDemographicInfo(subjectId) {
 
  // Find the data object for the selected subject ID
  const metadata = data.metadata.find(item => item.id === parseInt(subjectId))

  // Get a reference to the #sample-metadata div where the info will be displayed
  const infoBox = document.getElementById("sample-metadata");

  // Clear the previous content of the info box
  infoBox.innerHTML = "";

  // Loop through the metadata object and display each key-value pair
  for (const [key, value] of Object.entries(metadata)) {
    const infoItem = document.createElement("p");
    infoItem.innerHTML = `<strong>${key}:</strong> ${value}`;
    infoBox.appendChild(infoItem);
  }
}

   

function updateBarChart(subjectId) {
  
  // Find the data object for the selected subject ID
  const subjectData = data.samples.find(item => item.id === subjectId);

  // Get the first 10 'otu_ids', 'otu_labels', and 'sample_values' data
  const otuIds = subjectData.otu_ids.slice(0, 10);
  const otuLabels = subjectData.otu_labels.slice(0, 10);
  const sampleValues = subjectData.sample_values.slice(0, 10);
  
  // Combine the data into an array of objects
  const tableData = otuIds.map((otuId, index) => ({
    otuId,
    otuLabel: otuLabels[index],
    sampleValue: sampleValues[index],
  }));

  // Sort tableData based on sampleValue in ascending order
  tableData.sort((a, b) => a.sampleValue - b.sampleValue);
  console.log(tableData)

  const sortedYLabels = tableData.map(entry => `OTU ${entry.otuId}`);
  const sortedOtuLabels = tableData.map(entry => entry.otuLabel);

  // Create the data trace for the bar chart
  const trace = {
    type: "bar",
    orientation: "h",
    x: tableData.map(entry => entry.sampleValue),
    y: sortedYLabels,
    text: sortedOtuLabels,
  };

  // Create the data array for the Plotly chart
  const chartData = [trace];

  // Define the layout for the chart
  const layout = {
    title: `Top 10 OTUs for Subject ${subjectId}`,
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs"}
  };

  // Plot the bar chart
  Plotly.newPlot("bar", chartData, layout);
}



function updateBubbleChart(subjectId) {
  const subjectData = data.samples.find(item => item.id === subjectId);

  const trace = {
    type: "bubble",
    mode: "markers",
    x: subjectData.otu_ids,
    y: subjectData.sample_values,
    marker: {
      size: subjectData.sample_values,
      color: subjectData.otu_ids,
      colorscale: "Viridis", 
      opacity: 0.7
    },
    text: subjectData.otu_labels,
  };

  const chartData = [trace];

  const layout = {
    title: `Bubble Chart for Subject ${subjectId}`,
    xaxis: { title: "OTU IDs" },
    yaxis: { title: "Sample Values" }
  };

  Plotly.newPlot("bubble", chartData, layout);
}

  
// _________________________________________________________________________________



// Define the URL for fetching data
const dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    
// Define a global variable for data
let data;


document.addEventListener('DOMContentLoaded', function() {
  
    // Fetch data from the URL using D3.js
    d3.json(dataURL).then(dataResponse => {
      data = dataResponse
      const dropdown = document.getElementById("selDataset");
      data.names.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      option.text = name;
      dropdown.appendChild(option);
        });
  
    // Call optionChanged with the default value
    optionChanged(data.names[0]);
    }).catch(error => {
      console.error("Error fetching data:", error);
    });
});
  