// flashcards.js - Logic for the TRIZ Principles flashcard section (limited to 32, with grid view)

document.addEventListener('DOMContentLoaded', () => {
    // --- Get references to the new view elements ---
    const gridView = document.getElementById('grid-view');
    const singleCardView = document.getElementById('single-card-view');
    const principleGrid = document.getElementById('principle-grid');
    const backToGridButton = document.getElementById('back-to-grid-btn');

    // --- Existing flashcard elements ---
    const flashcard = document.getElementById('triz-flashcard');
    const flashcardInner = flashcard ? flashcard.querySelector('.flashcard-inner') : null; // Check existence
    const cardFrontTitle = document.getElementById('card-front-title');
    const cardFrontContent = document.getElementById('card-front-content');
    const cardBackTitle = document.getElementById('card-back-title');
    const cardBackText = document.getElementById('card-back-text');
    const cardBackImage = document.getElementById('card-back-image');
    const prevButton = document.getElementById('prev-card');
    const nextButton = document.getElementById('next-card');
    const cardCounter = document.getElementById('card-counter');

    let currentCardIndex = 0;
    // Set the explicit limit for the flashcard VIEW to 32
    const totalCardsInView = 32;
    // We still need access to the full trizPrinciples array from data.js
    // (even if it only contains 32 items now as per your last request)
    const allTrizPrinciples = typeof trizPrinciples !== 'undefined' ? trizPrinciples : [];
     const totalPrinciplesInData = allTrizPrinciples.length;


    // Ensure data is loaded (from data.js) and has at least totalCardsInView principles
    if (!allTrizPrinciples || totalPrinciplesInData < totalCardsInView) {
        console.error(`TRIZ principle data not loaded or is incomplete. Expected at least ${totalCardsInView} principles.`);
         if (cardFrontTitle) cardFrontTitle.textContent = "Error Loading Data";
        if (cardFrontContent) cardFrontContent.textContent = `Please check data.js and ensure trizPrinciples array contains at least ${totalCardsInView} principles. Found ${totalPrinciplesInData}.`;
        if (prevButton) prevButton.disabled = true;
        if (nextButton) nextButton.disabled = true;
        // Also hide controls if no data
        const controls = document.querySelector('.flashcard-controls');
        if (controls) controls.style.display = 'none';
         // Show grid view with error message
        if (gridView) gridView.classList.remove('hidden');
        if (singleCardView) singleCardView.classList.add('hidden');
        if (principleGrid) principleGrid.innerHTML = `<p>Error loading TRIZ principles data. Expected at least ${totalCardsInView}, found ${totalPrinciplesInData}. Please check data.js.</p>`;

        return; // Stop execution if data is insufficient
    }


    // --- Helper function to show a specific view ---
    function showView(viewId) {
        if (gridView) {
            if (viewId === 'grid') {
                gridView.classList.remove('hidden');
            } else {
                gridView.classList.add('hidden');
            }
        }
        if (singleCardView) {
             if (viewId === 'single') {
                 singleCardView.classList.remove('hidden');
             } else {
                 singleCardView.classList.add('hidden');
             }
        }
    }

    // --- Function to update the card display ---
    function updateCard(index) {
        // Check if index is within the allowed range for the VIEW (0 to totalCardsInView - 1)
        if (index >= 0 && index < totalCardsInView) {
            // Get principle from the data array using the index
            const principle = allTrizPrinciples[index];

            // Reset flip state BEFORE updating content
            if (flashcardInner && flashcardInner.classList.contains('flipped')) {
                 flashcardInner.classList.remove('flipped');
                // Add a short delay to allow flip animation before changing content
                setTimeout(() => {
                    // Update Content After Un-flip Animation
                    if (cardFrontTitle) cardFrontTitle.textContent = `${principle.number}. ${principle.name}`;
                    if (cardFrontContent) cardFrontContent.textContent = principle.brief;
                    if (cardBackTitle) cardBackTitle.textContent = `Example of ${principle.name}`;
                    if (cardBackText) cardBackText.textContent = principle.example;

                     // Update Image
                    if (cardBackImage) {
                        if (principle.imageUrl) {
                            cardBackImage.src = principle.imageUrl;
                            cardBackImage.style.display = 'block'; // Show image if URL exists
                        } else {
                            cardBackImage.src = ''; // Clear image source
                            cardBackImage.style.display = 'none'; // Hide image if no URL
                        }
                    }

                    // Update counter
                    if (cardCounter) cardCounter.textContent = `Card ${index + 1} of ${totalCardsInView}`; // Use totalCardsInView = 32

                    // Update button states
                    if (prevButton) prevButton.disabled = index === 0;
                    if (nextButton) nextButton.disabled = index === totalCardsInView - 1; // Disable next at index 31 (card 32)

                    currentCardIndex = index;
                }, 300); // Adjust delay (half of CSS transition duration)
            } else {
                 // If not flipped, update content immediately
                if (cardFrontTitle) cardFrontTitle.textContent = `${principle.number}. ${principle.name}`;
                if (cardFrontContent) cardFrontContent.textContent = principle.brief;
                if (cardBackTitle) cardBackTitle.textContent = `Example of ${principle.name}`;
                if (cardBackText) cardBackText.textContent = principle.example;

                 // Update Image
                if (cardBackImage) {
                    if (principle.imageUrl) {
                        cardBackImage.src = principle.imageUrl;
                        cardBackImage.style.display = 'block';
                    } else {
                        cardBackImage.src = '';
                        cardBackImage.style.display = 'none';
                    }
                }

                // Update counter
                if (cardCounter) cardCounter.textContent = `Card ${index + 1} of ${totalCardsInView}`; // Use totalCardsInView = 32

                // Update button states
                if (prevButton) prevButton.disabled = index === 0;
                if (nextButton) nextButton.disabled = index === totalCardsInView - 1; // Disable next at index 31 (card 32)

                currentCardIndex = index;
            }
        } else {
             console.error(`Attempted to update card with invalid index for view: ${index}. Max index is ${totalCardsInView - 1}.`);
             // If navigating out of bounds (shouldn't happen with disabled buttons), reset to the grid view
             showView('grid');
        }
    }

    // --- Function to populate the grid ---
    function populatePrincipleGrid() {
        if (!principleGrid) return; // Exit if grid container doesn't exist

        principleGrid.innerHTML = ''; // Clear loading message/previous items

        // Only populate the grid with the first 'totalCardsInView' principles
        for (let i = 0; i < totalCardsInView; i++) {
            // Get principle from the data array using the index
            const principle = allTrizPrinciples[i];
             if (!principle) {
                  // Should not happen if data check passed, but good safeguard
                  console.error(`Principle data missing for index ${i}`);
                  continue;
             }
            const gridItem = document.createElement('div');
            gridItem.classList.add('principle-grid-item');
            gridItem.textContent = `${principle.number}. ${principle.name}`;
            gridItem.dataset.principleIndex = i; // Store index (0 to 31)

            gridItem.addEventListener('click', () => {
                const selectedIndex = parseInt(gridItem.dataset.principleIndex);
                updateCard(selectedIndex); // Load the selected card
                showView('single'); // Show the single card view
            });

            principleGrid.appendChild(gridItem);
        }
    }

    // --- Handle card flip (click on the card) ---
    if (flashcard && flashcardInner) {
         flashcard.addEventListener('click', () => {
            flashcardInner.classList.toggle('flipped');
        });
    }


    // --- Handle navigation buttons ---
    if (prevButton) {
        prevButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from propagating to flashcard
            if (currentCardIndex > 0) {
                updateCard(currentCardIndex - 1);
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from propagating to flashcard
            // Check against totalCardsInView - 1 (index 31)
            if (currentCardIndex < totalCardsInView - 1) {
                updateCard(currentCardIndex + 1);
            }
        });
    }

    // --- Handle "Back to Selection Grid" button ---
    if (backToGridButton) {
        backToGridButton.addEventListener('click', () => {
            showView('grid'); // Show the grid view
            // Optional: Unflip the card when going back
            if (flashcardInner && flashcardInner.classList.contains('flipped')) {
                 flashcardInner.classList.remove('flipped');
            }
             // Optional: Reset the single card view content or index, but not strictly necessary as grid is shown
        });
    }


    // --- Initial Load Logic ---
    // Data check is done at the beginning

    // Check for linking from Matrix page (?principle=X)
    const params = new URLSearchParams(window.location.search);
    const principleNumberParam = params.get('principle');

    // Use the getPrincipleByNumber helper (from data.js) to find the index
    let initialIndex = -1;
    if (principleNumberParam) {
        const number = parseInt(principleNumberParam);
         // Use the helper to find the principle object first
        const principleFromLink = getPrincipleByNumber(number);
         // If the principle object is found, get its index in the *original* data array
        if (principleFromLink) {
            initialIndex = allTrizPrinciples.indexOf(principleFromLink);
        }
    }

    // Check if the linked principle was found AND is within the first 32 (index 0-31)
    if (initialIndex !== -1 && initialIndex < totalCardsInView) {
        // If linking from matrix and principle found within the first 32, go directly to single card view
        currentCardIndex = initialIndex; // Set the starting index
        showView('single'); // Show single card view
        updateCard(currentCardIndex); // Load the specific card
    } else {
        // If principle not found OR it's principle 33-40, default to showing the grid
         if (principleNumberParam && initialIndex === -1) {
            console.warn(`Principle number ${principleNumberParam} not found in trizPrinciples data array.`);
         } else if (principleNumberParam && initialIndex >= totalCardsInView) {
             console.warn(`Principle number ${principleNumberParam} is outside the range of the first ${totalCardsInView} flashcards (index ${initialIndex}). Showing grid.`);
         } else {
             // No principle param
             console.log("No principle parameter found in URL, showing grid view.");
         }
        currentCardIndex = 0; // Reset index
        showView('grid'); // Show grid view
        populatePrincipleGrid(); // Populate the grid
    }
});