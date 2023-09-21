// Function to handle the select element change event
function optionChanged(selectedValue) {
    // When the user selects a new value, update the demographic info and charts
    updateDemographicInfo(selectedValue);
    updateCharts(selectedValue);
  }

// Function to update the demographic information
function updateDemographicInfo(subjectId) {
    // You can update the demographic info here based on the selected subject ID
    // For example, you can use fetch() to retrieve data from an API or manipulate
    // existing data to display it in the #sample-metadata div.
  }
  
  // Function to update the charts
  function updateCharts(subjectId) {
    // You can update the charts (bar chart, gauge chart, bubble chart) here
    // based on the selected subject ID using D3.js and Plotly.
  }
  
// _________________________________________________________________________________


// Define the URL for fetching data
const dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    

document.addEventListener('DOMContentLoaded', function() {
  
    // Fetch data from the URL using D3.js
    d3.json(dataURL).then(data => {
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
  