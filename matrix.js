// matrix.js - Logic for the TRIZ Contradiction Matrix section

document.addEventListener('DOMContentLoaded', () => {
    const improveFeatureSelect = document.getElementById('improve-feature');
    const preserveFeatureSelect = document.getElementById('preserve-feature');
    const recommendedPrinciplesList = document.getElementById('recommended-principles');
    const matrixInstructions = document.getElementById('matrix-instructions');

    // Ensure data is loaded and has expected dimensions (will check based on data.js content)
    // Need to check if trizFeatures and trizMatrix exist and have expected shape
     const trizFeaturesExists = typeof trizFeatures !== 'undefined' && Array.isArray(trizFeatures);
     const trizMatrixExists = typeof trizMatrix !== 'undefined' && Array.isArray(trizMatrix);

    let dataError = true;
    if (trizFeaturesExists && trizMatrixExists) {
         const numFeatures = trizFeatures.length;
         const matrixHeight = trizMatrix.length;
         const matrixWidthsMatchFeatures = trizMatrix.every(row => Array.isArray(row) && row.length === numFeatures);

         if (numFeatures > 0 && matrixHeight === numFeatures && matrixWidthsMatchFeatures) {
             dataError = false; // Data structure looks correct
         }
    }


    if (dataError) {
        console.error("TRIZ matrix data not loaded correctly or is incomplete. Expected trizFeatures array and a square trizMatrix matching its dimensions.");
        if (improveFeatureSelect) improveFeatureSelect.innerHTML = '<option value="">Error Loading Data</option>';
        if (preserveFeatureSelect) preserveFeatureSelect.innerHTML = '<option value="">Error Loading Data</option>';
        if (matrixInstructions) matrixInstructions.textContent = "Error loading matrix data. Please check data.js.";
        // Disable selects if data is bad
        if (improveFeatureSelect) improveFeatureSelect.disabled = true;
        if (preserveFeatureSelect) preserveFeatureSelect.disabled = true;
        return;
    }

     // Use the number of features found in the data
     const numFeatures = trizFeatures.length;


    // Populate the select dropdowns with features
    function populateFeatures(selectElement) {
        if (!selectElement) return;
        selectElement.innerHTML = '<option value="">-- Select Feature --</option>'; // Add default option
        trizFeatures.forEach((feature, index) => {
            const option = document.createElement('option');
            option.value = index; // Use index as value (0 to numFeatures-1)
            option.textContent = `${index + 1}. ${feature}`; // Display number and name (1 to numFeatures)
            selectElement.appendChild(option);
        });
    }

    populateFeatures(improveFeatureSelect);
    populateFeatures(preserveFeatureSelect);

    // Function to display recommended principles
    function displayRecommendedPrinciples(improveIndex, preserveIndex) {
        if (recommendedPrinciplesList) recommendedPrinciplesList.innerHTML = ''; // Clear previous results
        if (matrixInstructions) matrixInstructions.style.display = 'none'; // Hide instructions

        // Check if valid indices were passed (this check is redundant due to the one below, but clear)
        if (improveIndex === null || preserveIndex === null) {
             if (matrixInstructions) {
                 matrixInstructions.style.display = 'block'; // Show instructions if selections are incomplete
                 matrixInstructions.textContent = "Select 'Feature to Improve' and 'Feature to Preserve' from the dropdowns above to see suggested principles.";
             }
             return;
        }

         // Validate indices based on the actual number of features
         if (improveIndex < 0 || improveIndex >= numFeatures || preserveIndex < 0 || preserveIndex >= numFeatures) {
              console.error(`Invalid feature index selected: Improve=${improveIndex}, Preserve=${preserveIndex}. Max index is ${numFeatures - 1}.`);
              if (recommendedPrinciplesList) recommendedPrinciplesList.innerHTML = '<li>Error retrieving results due to invalid selection.</li>';
              if (matrixInstructions) matrixInstructions.style.display = 'none';
              return;
         }


        // Get the recommended principles from the matrix using the selected indices
        const principles = trizMatrix[improveIndex][preserveIndex];

        if (!principles || principles.length === 0) {
            if (recommendedPrinciplesList) recommendedPrinciplesList.innerHTML = '<li>No specific principles are strongly recommended for this contradiction in the standard matrix.</li>';
        } else {
            principles.forEach(principleNumber => {
                const listItem = document.createElement('li');
                // Use the helper from data.js to get principle details
                // This will return null if the principleNumber is > 32 and data.js only has 32 principles
                const principle = getPrincipleByNumber(principleNumber);

                if (principle) {
                     const principleLink = document.createElement('a');
                     // Link to flashcard page with a query parameter
                     principleLink.href = `flashcards.html?principle=${principleNumber}`;
                     principleLink.textContent = `${principle.number}. ${principle.name}`;
                     principleLink.title = principle.brief; // Add brief as tooltip
                     listItem.appendChild(principleLink);
                } else {
                    // Fallback if principle data is missing (e.g., principle 33-40 when only 32 are in data.js)
                    listItem.textContent = `Principle ${principleNumber} (Details not available)`;
                     // Make it clear these aren't linkable if data is missing
                     listItem.style.color = '#777';
                }

                if (recommendedPrinciplesList) recommendedPrinciplesList.appendChild(listItem);
            });
        }
    }

    // Event listeners for when selections change
    function handleSelectionChange() {
        // Check if the select elements exist before accessing value
        const selectedImproveIndex = improveFeatureSelect ? improveFeatureSelect.value !== "" ? parseInt(improveFeatureSelect.value) : null : null;
        const selectedPreserveIndex = preserveFeatureSelect ? preserveFeatureSelect.value !== "" ? parseInt(preserveFeatureSelect.value) : null : null;

        // Call display function with the indices
        displayRecommendedPrinciples(selectedImproveIndex, selectedPreserveIndex);
    }

    // Add event listeners only if the select elements exist
    if (improveFeatureSelect) {
         improveFeatureSelect.addEventListener('change', handleSelectionChange);
    }
    if (preserveFeatureSelect) {
         preserveFeatureSelect.addEventListener('change', handleSelectionChange);
    }


    // Initial state: show instructions, but only if data loaded successfully
    if (!dataError && matrixInstructions) {
        matrixInstructions.style.display = 'block';
        matrixInstructions.textContent = "Select 'Feature to Improve' and 'Feature to Preserve' from the dropdowns above to see suggested principles.";
    }
});