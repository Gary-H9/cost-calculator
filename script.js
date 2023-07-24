document.addEventListener("DOMContentLoaded", function () {
    // Get references to the input elements in the second, third, and fourth columns
    const rateInputs = document.querySelectorAll("tbody input.rate-input");
    const timeInputs = document.querySelectorAll("tbody input.time-input");
    const peopleInputs = document.querySelectorAll("tbody input.people-input");
  
    // Get the table body element
    const tableBody = document.querySelector("tbody");
  
    // Function to calculate the cost for a single row
    function calculateCost(hourlyRate, time, numPeople) {
      // Check if the inputs are valid numbers
      if (!isNaN(hourlyRate) && !isNaN(time) && !isNaN(numPeople)) {
        return hourlyRate * time * numPeople;
      }
      return 0;
    }
  
    // Function to update the cost for a single row
    function updateCostForRow(row) {
      const rateInput = row.querySelector("input.rate-input");
      const timeInput = row.querySelector("input.time-input");
      const peopleInput = row.querySelector("input.people-input");
      const costElement = row.querySelector("td:nth-child(5)");
  
      const hourlyRate = parseFloat(rateInput.value);
      const time = parseFloat(timeInput.value);
      const numPeople = parseInt(peopleInput.value);
  
      const costValue = calculateCost(hourlyRate, time, numPeople).toFixed(2);
      costElement.textContent = `£${costValue}`;
    }
  
    // Function to calculate and update the total cost
    function updateTotalCost() {
      let totalCost = 0;
  
      // Iterate through each row (including the last row, which contains the total)
      tableBody.querySelectorAll("tr").forEach(function (row, index) {
        if (index < tableBody.children.length) {
          const rateInput = row.querySelector("input.rate-input");
          const timeInput = row.querySelector("input.time-input");
          const peopleInput = row.querySelector("input.people-input");
  
          const hourlyRate = parseFloat(rateInput.value);
          const time = parseFloat(timeInput.value);
          const numPeople = parseInt(peopleInput.value);
  
          const costValue = calculateCost(hourlyRate, time, numPeople);
          totalCost += costValue;
  
          const costElement = row.querySelector("td:nth-child(5)");
          costElement.textContent = `£${costValue.toFixed(2)}`;
        }
      });
  
      // Update the total cost in the last row
      const totalCostElement = document.getElementById("totalCost");
      totalCostElement.textContent = `£${totalCost.toFixed(2)}`;
    }
  
    // Add event listeners to each input field to detect changes
    rateInputs.forEach(function (rateInput, index) {
      rateInput.addEventListener("input", function () {
        const row = rateInput.parentElement.parentElement;
        updateCostForRow(row);
        updateTotalCost();
      });
    });
  
    timeInputs.forEach(function (timeInput, index) {
      timeInput.addEventListener("input", function () {
        const row = timeInput.parentElement.parentElement;
        updateCostForRow(row);
        updateTotalCost();
      });
    });
  
    peopleInputs.forEach(function (peopleInput, index) {
      peopleInput.addEventListener("input", function () {
        const row = peopleInput.parentElement.parentElement;
        updateCostForRow(row);
        updateTotalCost();
      });
    });
  });
  