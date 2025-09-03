const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

let remedies = [];

// Fetch the remedies data from the JSON file
fetch('./data/remedies.json')
  .then(response => response.json())
  .then(data => {
    remedies = data;
  })
  .catch(error => console.error('Error fetching remedies:', error));

// Function to filter remedies based on user input
function filterRemedies(query) {
  const lowerCaseQuery = query.toLowerCase();
  return remedies.filter(remedy => 
    remedy.disease.toLowerCase().includes(lowerCaseQuery) || 
    remedy.symptoms.some(symptom => symptom.toLowerCase().includes(lowerCaseQuery)) ||
    remedy.medicine.toLowerCase().includes(lowerCaseQuery)
  );
}

// Function to display results dynamically
function displayResults(results) {
  resultsContainer.innerHTML = '';
  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }
  
  results.forEach(remedy => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
    resultItem.innerHTML = `
      <h3>${remedy.disease}</h3>
      <p><strong>Symptoms:</strong> ${remedy.symptoms.join(', ')}</p>
      <p><strong>Recommended Medicine:</strong> ${remedy.medicine}</p>
    `;
    resultsContainer.appendChild(resultItem);
  });
}

// Event listener for input changes
searchInput.addEventListener('input', () => {
  const query = searchInput.value;
  const filteredResults = filterRemedies(query);
  displayResults(filteredResults);
});