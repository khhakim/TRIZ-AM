// matrix.js - Logic for the TRIZ Contradiction Matrix section

document.addEventListener('DOMContentLoaded', () => {
    const improveFeatureSelect = document.getElementById('improve-feature');
    const preserveFeatureSelect = document.getElementById('preserve-feature');
    const recommendedPrinciplesList = document.getElementById('recommended-principles');
    const matrixInstructions = document.getElementById('matrix-instructions');

    // Ensure data is loaded (from data.js)
    if (!trizFeatures || trizFeatures.length === 0 || !trizMatrix || trizMatrix.length === 0 || trizMatrix.length !== trizFeatures.length || trizMatrix.some(row => row.length !== trizFeatures.length)) {
        console.error("TRIZ matrix data not loaded correctly or is incomplete.");
        improveFeatureSelect.innerHTML = '<option value="">Error Loading Data</option>';
        preserveFeatureSelect.innerHTML = '<option value="">Error Loading Data</option>';
        matrixInstructions.textContent = "Error loading matrix data. Please check data.js.";
        return;
    }

    // Populate the select dropdowns with features
    function populateFeatures(selectElement) {
        trizFeatures.forEach((feature, index) => {
            const option = document.createElement('option');
            option.value = index; // Use index as value
            option.textContent = `${index + 1}. ${feature}`; // Display number and name
            selectElement.appendChild(option);
        });
    }

    populateFeatures(improveFeatureSelect);
    populateFeatures(preserveFeatureSelect);

    // Function to display recommended principles
    function displayRecommendedPrinciples(improveIndex, preserveIndex) {
        recommendedPrinciplesList.innerHTML = ''; // Clear previous results
        matrixInstructions.style.display = 'none'; // Hide instructions

        if (improveIndex === null || preserveIndex === null) {
             matrixInstructions.style.display = 'block'; // Show instructions if selections are incomplete
             matrixInstructions.textContent = "Select 'Feature to Improve' and 'Feature to Preserve' from the dropdowns above to see suggested principles.";
             return;
        }

        // Get the recommended principles from the matrix
        const principles = trizMatrix[improveIndex][preserveIndex];

        if (!principles || principles.length === 0) {
            recommendedPrinciplesList.innerHTML = '<li>No specific principles are strongly recommended for this contradiction in the standard matrix.</li>';
        } else {
            principles.forEach(principleNumber => {
                const listItem = document.createElement('li');
                const principle = getPrincipleByNumber(principleNumber); // Use the helper from data.js

                if (principle) {
                     const principleLink = document.createElement('a');
                     // Link to flashcard page with a hash or query parameter
                     // Using hash allows linking within the same page if it were a SPA,
                     // but for multi-page, we'll link to flashcards.html and maybe
                     // add logic there to navigate to the specific card if a hash is present.
                     // For simplicity here, we'll just link to the flashcard page for now.
                     // A more advanced implementation would pass the principle number.
                     // Let's pass it as a query parameter.
                     principleLink.href = `flashcards.html?principle=${principleNumber}`;
                     principleLink.textContent = `${principle.number}. ${principle.name}`;
                     principleLink.title = principle.brief; // Add brief as tooltip
                     listItem.appendChild(principleLink);
                } else {
                    // Fallback if principle data is missing
                    listItem.textContent = `Principle ${principleNumber} (Details not available)`;
                }


                recommendedPrinciplesList.appendChild(listItem);
            });
        }
    }

    // Event listeners for when selections change
    function handleSelectionChange() {
        const selectedImproveIndex = improveFeatureSelect.value !== "" ? parseInt(improveFeatureSelect.value) : null;
        const selectedPreserveIndex = preserveFeatureSelect.value !== "" ? parseInt(preserveFeatureSelect.value) : null;

        if (selectedImproveIndex !== null && selectedPreserveIndex !== null) {
             // Validate indices just in case
             if (selectedImproveIndex >= 0 && selectedImproveIndex < trizFeatures.length &&
                 selectedPreserveIndex >= 0 && selectedPreserveIndex < trizFeatures.length) {
                 displayRecommendedPrinciples(selectedImproveIndex, selectedPreserveIndex);
             } else {
                 console.error("Invalid feature index selected.");
                 recommendedPrinciplesList.innerHTML = '<li>Error retrieving results.</li>';
                 matrixInstructions.style.display = 'none';
             }
        } else {
            // Clear results if either dropdown is reset
             recommendedPrinciplesList.innerHTML = '';
             matrixInstructions.style.display = 'block';
             matrixInstructions.textContent = "Select 'Feature to Improve' and 'Feature to Preserve' from the dropdowns above to see suggested principles.";
        }
    }


    improveFeatureSelect.addEventListener('change', handleSelectionChange);
    preserveFeatureSelect.addEventListener('change', handleSelectionChange);

    // Initial state: show instructions
    matrixInstructions.style.display = 'block';
});