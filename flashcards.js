// flashcards.js - Logic for the TRIZ Principles flashcard section (with grid view)

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
    // Ensure trizPrinciples is globally available from data.js
    const totalCards = typeof trizPrinciples !== 'undefined' ? trizPrinciples.length : 0;

    // --- Helper function to show a specific view ---
    function showView(viewId) {
        if (viewId === 'grid') {
            gridView.classList.remove('hidden');
            singleCardView.classList.add('hidden');
        } else if (viewId === 'single') {
            gridView.classList.add('hidden');
            singleCardView.classList.remove('hidden');
        }
    }

    // --- Function to update the card display (largely the same) ---
    function updateCard(index) {
        if (index >= 0 && index < totalCards) {
            const principle = trizPrinciples[index];

            // Reset flip state BEFORE updating content
            // Adding a short delay to allow flip animation before changing content
            if (flashcardInner && flashcardInner.classList.contains('flipped')) { // Check if inner exists
                 flashcardInner.classList.remove('flipped'); // TOGGLE INNER CLASS
                setTimeout(() => {
                    // Update Content After Un-flip Animation
                    if (cardFrontTitle) cardFrontTitle.textContent = `${principle.number}. ${principle.name}`;
                    if (cardFrontContent) cardFrontContent.textContent = principle.brief;
                    if (cardBackTitle) cardBackTitle.textContent = `Example of ${principle.name}`;
                    if (cardBackText) cardBackText.textContent = principle.example;

                     // Update Image
                    if (cardBackImage) { // Check if image element exists
                        if (principle.imageUrl) {
                            cardBackImage.src = principle.imageUrl;
                            cardBackImage.style.display = 'block'; // Show image if URL exists
                        } else {
                            cardBackImage.src = ''; // Clear image source
                            cardBackImage.style.display = 'none'; // Hide image if no URL
                        }
                    }


                    // Update counter
                    if (cardCounter) cardCounter.textContent = `Card ${index + 1} of ${totalCards}`;

                    // Update button states
                    if (prevButton) prevButton.disabled = index === 0;
                    if (nextButton) nextButton.disabled = index === totalCards - 1;

                    currentCardIndex = index;
                }, 300); // Adjust delay (half of CSS transition duration)
            } else {
                 // If not flipped, update content immediately
                if (cardFrontTitle) cardFrontTitle.textContent = `${principle.number}. ${principle.name}`;
                if (cardFrontContent) cardFrontContent.textContent = principle.brief;
                if (cardBackTitle) cardBackTitle.textContent = `Example of ${principle.name}`;
                if (cardBackText) cardBackText.textContent = principle.example;

                 // Update Image
                if (cardBackImage) { // Check if image element exists
                    if (principle.imageUrl) {
                        cardBackImage.src = principle.imageUrl;
                        cardBackImage.style.display = 'block'; // Show image if URL exists
                    } else {
                        cardBackImage.src = ''; // Clear image source
                        cardBackImage.style.display = 'none'; // Hide image if no URL
                    }
                }

                // Update counter
                if (cardCounter) cardCounter.textContent = `Card ${index + 1} of ${totalCards}`;

                // Update button states
                if (prevButton) prevButton.disabled = index === 0;
                if (nextButton) nextButton.disabled = index === totalCards - 1;

                currentCardIndex = index;
            }
        } else {
             console.error(`Attempted to update card with invalid index: ${index}`);
             // Optionally show an error or default back to grid
             showView('grid'); // Go back to grid on error
        }
    }

    // --- Function to populate the grid ---
    function populatePrincipleGrid() {
        if (!principleGrid) return; // Exit if grid container doesn't exist

        principleGrid.innerHTML = ''; // Clear loading message/previous items

        if (totalCards === 0) {
            principleGrid.innerHTML = '<p>TRIZ principle data not loaded or is empty. Please check data.js.</p>';
            return;
        }

        trizPrinciples.forEach((principle, index) => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('principle-grid-item');
            gridItem.textContent = `${principle.number}. ${principle.name}`;
            gridItem.dataset.principleIndex = index; // Store index as data attribute

            gridItem.addEventListener('click', () => {
                const selectedIndex = parseInt(gridItem.dataset.principleIndex);
                updateCard(selectedIndex); // Load the selected card
                showView('single'); // Show the single card view
            });

            principleGrid.appendChild(gridItem);
        });
    }

    // --- Handle card flip (click on the card) ---
    if (flashcard && flashcardInner) { // Check if elements exist
         flashcard.addEventListener('click', () => {
            // Toggle the flipped class on the INNER element
            flashcardInner.classList.toggle('flipped');
        });
    }


    // --- Handle navigation buttons ---
    if (prevButton) { // Check if button exists
        prevButton.addEventListener('click', (event) => {
            // Prevent the click event from propagating to the flashcard and flipping it
            event.stopPropagation();
            if (currentCardIndex > 0) {
                updateCard(currentCardIndex - 1);
            }
        });
    }

    if (nextButton) { // Check if button exists
        nextButton.addEventListener('click', (event) => {
             // Prevent the click event from propagating to the flashcard and flipping it
            event.stopPropagation();
            if (currentCardIndex < totalCards - 1) {
                updateCard(currentCardIndex + 1);
            }
        });
    }

    // --- Handle "Back to Selection Grid" button ---
    if (backToGridButton) {
        backToGridButton.addEventListener('click', () => {
            showView('grid'); // Show the grid view
            // Optional: Unflip the card when going back, or reset to a default state
            if (flashcardInner && flashcardInner.classList.contains('flipped')) {
                 flashcardInner.classList.remove('flipped');
            }
        });
    }


    // --- Initial Load Logic ---
    // Check if data is loaded before proceeding
    if (totalCards === 0) {
        // Error message already set in populatePrincipleGrid or initial check
        showView('grid'); // Ensure grid view is shown to display error
        return;
    }

    // Check for linking from Matrix page (?principle=X)
    const params = new URLSearchParams(window.location.search);
    const principleNumberParam = params.get('principle');

    if (principleNumberParam) {
        const number = parseInt(principleNumberParam);
        const initialIndex = trizPrinciples.findIndex(p => p.number === number);

        if (initialIndex !== -1) {
            // If linking from matrix and principle found, go directly to single card view
            currentCardIndex = initialIndex;
            showView('single'); // Show single card view
            updateCard(currentCardIndex); // Load the specific card
        } else {
            // If principle not found, default to showing the grid
            console.warn(`Principle number ${principleNumberParam} not found. Showing grid.`);
            currentCardIndex = 0; // Reset index
            showView('grid'); // Show grid view
            populatePrincipleGrid(); // Populate the grid
        }
    } else {
        // If no principle param, start by showing the grid
        currentCardIndex = 0; // Start at the first card logically
        showView('grid'); // Show grid view
        populatePrincipleGrid(); // Populate the grid
    }

});