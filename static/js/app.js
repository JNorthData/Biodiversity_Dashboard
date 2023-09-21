function optionChanged(selectedValue) {
    // When the user selects a new value, update the demographic info and charts
    updateDemographicInfo(selectedValue);
    updateCharts(selectedValue);
  }


function updateDemographicInfo(subjectId) {
 

  // Access the data.metadata array to find the matching metadata object
  const metadata = data.metadata.find(item => item.id === parseInt(subjectId))
  console.log("UPDATE FUNCTION");

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

   
  
  // Function to update the charts
  function updateCharts(subjectId) {
    // You can update the charts (bar chart, gauge chart, bubble chart) here
    // based on the selected subject ID using D3.js and Plotly.
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
  