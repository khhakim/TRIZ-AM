// data.js - TRIZ Principles (32 only) and Matrix Data (16x16)

// --- TRIZ Principles Data (Replace with your complete data for the 32 principles) ---
// This array contains only the 32 principles intended for the flashcard view.
// Matrix links to principles 33-40 will result in getPrincipleByNumber returning null/undefined.
const trizPrinciples = [
    {
        number: 1,
        name: "Segmentation",
        brief: "Divide a system into independent, adjustable, or easily disassembled parts.",
        example: "Modular furniture, pre-fabricated house sections, or an articulated bus.",
        imageUrl: "" // Optional: Add a URL to an image, e.g., "images/segmentation.jpg"
    },
    {
        number: 2,
        name: "Taking Out (Extraction)",
        brief: "Separate an interfering part or property from an object, or single out the only necessary part.",
        example: "Removing the noisy compressor from a refrigerator and placing it in another room, or an air-conditioner's external unit.",
        imageUrl: ""
    },
    {
        number: 3,
        name: "Local Quality",
        brief: "Change an object's structure, external environment, or external influence from uniform to non-uniform.",
        example: "Using different materials or coatings on different parts of an object; varying temperature, pressure, or density along an object.",
        imageUrl: ""
    },
     {
        number: 4,
        name: "Asymmetry",
        brief: "Change the shape of an object or external environment from symmetrical to asymmetrical.",
        example: "An asymmetric wing profile on an aircraft creating lift, or an off-center design for balance.",
        imageUrl: ""
    },
    // --- Add your data for principles 5 through 32 here ---
    {
        number: 5,
        name: "Principle 5 Name",
        brief: "Brief 5",
        example: "Example 5",
        imageUrl: ""
    },
     {
        number: 6,
        name: "Principle 6 Name",
        brief: "Brief 6",
        example: "Example 6",
        imageUrl: ""
    },
    {
        number: 7,
        name: "Principle 7 Name",
        brief: "Brief 7",
        example: "Example 7",
        imageUrl: ""
    },
    {
        number: 8,
        name: "Principle 8 Name",
        brief: "Brief 8",
        example: "Example 8",
        imageUrl: ""
    },
    {
        number: 9,
        name: "Principle 9 Name",
        brief: "Brief 9",
        example: "Example 9",
        imageUrl: ""
    },
    {
        number: 10,
        name: "Principle 10 Name",
        brief: "Brief 10",
        example: "Example 10",
        imageUrl: ""
    },
    {
        number: 11,
        name: "Principle 11 Name",
        brief: "Brief 11",
        example: "Example 11",
        imageUrl: ""
    },
    {
        number: 12,
        name: "Principle 12 Name",
        brief: "Brief 12",
        example: "Example 12",
        imageUrl: ""
    },
    {
        number: 13,
        name: "Principle 13 Name",
        brief: "Brief 13",
        example: "Example 13",
        imageUrl: ""
    },
    {
        number: 14,
        name: "Principle 14 Name",
        brief: "Brief 14",
        example: "Example 14",
        imageUrl: ""
    },
    {
        number: 15,
        name: "Principle 15 Name",
        brief: "Brief 15",
        example: "Example 15",
        imageUrl: ""
    },
    {
        number: 16,
        name: "Principle 16 Name",
        brief: "Brief 16",
        example: "Example 16",
        imageUrl: ""
    },
    {
        number: 17,
        name: "Principle 17 Name",
        brief: "Brief 17",
        example: "Example 17",
        imageUrl: ""
    },
    {
        number: 18,
        name: "Principle 18 Name",
        brief: "Brief 18",
        example: "Example 18",
        imageUrl: ""
    },
    {
        number: 19,
        name: "Principle 19 Name",
        brief: "Brief 19",
        example: "Example 19",
        imageUrl: ""
    },
    {
        number: 20,
        name: "Principle 20 Name",
        brief: "Brief 20",
        example: "Example 20",
        imageUrl: ""
    },
    {
        number: 21,
        name: "Principle 21 Name",
        brief: "Brief 21",
        example: "Example 21",
        imageUrl: ""
    },
    {
        number: 22,
        name: "Principle 22 Name",
        brief: "Brief 22",
        example: "Example 22",
        imageUrl: ""
    },
    {
        number: 23,
        name: "Principle 23 Name",
        brief: "Brief 23",
        example: "Example 23",
        imageUrl: ""
    },
    {
        number: 24,
        name: "Principle 24 Name",
        brief: "Brief 24",
        example: "Example 24",
        imageUrl: ""
    },
    {
        number: 25,
        name: "Principle 25 Name",
        brief: "Brief 25",
        example: "Example 25",
        imageUrl: ""
    },
    {
        number: 26,
        name: "Principle 26 Name",
        brief: "Brief 26",
        example: "Example 26",
        imageUrl: ""
    },
    {
        number: 27,
        name: "Principle 27 Name",
        brief: "Brief 27",
        example: "Example 27",
        imageUrl: ""
    },
    {
        number: 28,
        name: "Principle 28 Name",
        brief: "Brief 28",
        example: "Example 28",
        imageUrl: ""
    },
    {
        number: 29,
        name: "Principle 29 Name",
        brief: "Brief 29",
        example: "Example 29",
        imageUrl: ""
    },
    {
        number: 30,
        name: "Principle 30 Name",
        brief: "Brief 30",
        example: "Example 30",
        imageUrl: ""
    },
    {
        number: 31,
        name: "Principle 31 Name",
        brief: "Brief 31",
        example: "Example 31",
        imageUrl: ""
    },
    {
        number: 32,
        name: "Principle 32 Name",
        brief: "Brief 32",
        example: "Example 32",
        imageUrl: ""
    }
    // Ensure this array contains exactly 32 objects.
    // Principles 33-40 are now completely removed from this array.
];

// --- TRIZ Matrix Features (Replace with YOUR 16 specific features) ---
// This array must contain exactly 16 feature strings.
// The index of each feature corresponds to its row/column index in the matrix data below.
// You MUST replace these placeholders with the names of your 16 features.
const trizFeatures = [
    "Your Feature 1",  // 1
    "Your Feature 2",  // 2
    "Your Feature 3",  // 3
    "Your Feature 4",  // 4
    "Your Feature 5",  // 5
    "Your Feature 6",  // 6
    "Your Feature 7",  // 7
    "Your Feature 8",  // 8
    "Your Feature 9",  // 9
    "Your Feature 10", // 10
    "Your Feature 11", // 11
    "Your Feature 12", // 12
    "Your Feature 13", // 13
    "Your Feature 14", // 14
    "Your Feature 15", // 15
    "Your Feature 16", // 16
    // Ensure you have exactly 16 features listed here
];


// --- TRIZ Contradiction Matrix Data (Replace with YOUR 16x16 matrix) ---
// This is a 2D array (matrix).
// trizMatrix[i][j] gives the recommended principles when feature i (Improving)
// conflicts with feature j (Worsening/Preserving).
// The values are arrays of principle numbers (1 to 40).
// An empty array [] means no standard principles are strongly recommended for that pair.
// Index i corresponds to the index in trizFeatures for the "Feature to Improve".
// Index j corresponds to the index in trizFeatures for the "Feature to Preserve/Worsen".
// The matrix MUST be 16x16 (16 arrays, each containing 16 elements).
// Replace the example data with your actual matrix data. The principle numbers in these arrays
// can still be any number from 1 to 40, but only 1-32 will have details available from trizPrinciples.
const trizMatrix = [
    // Row 0: Improve "Your Feature 1" (Corresponds to trizFeatures[0])
    [
        [],     // vs "Your Feature 1" (1) - No contradiction with self
        [8, 15, 29, 34], // vs "Your Feature 2" (2) - Replace with YOUR principles (numbers from 1-40)
        [15, 8], // vs "Your Feature 3" (3) - Replace with YOUR principles
        [],     // vs "Your Feature 4" (4) - Replace with YOUR principles
        [], [], [], [], [], [], [], [], [], [], [], [] // Ensure 16 elements in this row
    ],
    // Row 1: Improve "Your Feature 2" (Corresponds to trizFeatures[1])
    [
        [8, 15, 29, 34], // vs "Your Feature 1" (1) - Replace with YOUR principles
        [],     // vs "Your Feature 2" (2) - No contradiction with self
        [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] // Ensure 16 elements in this row
    ],
     // --- CONTINUE ADDING ALL 16 ROWS FOR ALL 16 FEATURES TO IMPROVE ---
     // Each row must contain exactly 16 elements (arrays of principle numbers).
     // Example structure for row 2 (Improving "Your Feature 3"):
    // [
    //     [1, 7, 15, 17], // vs "Your Feature 1" (1) - Replace with YOUR principles
    //     [], // vs "Your Feature 2" (2) - Replace with YOUR principles
    //     [], // vs "Your Feature 3" (3) - No contradiction with self
    //     // ... fill in the rest of the 16 elements for this row (arrays of principle numbers from 1-40) ...
    //     []
    // ],
    // ... (Rows 3 through 14) ...
    // Row 15: Improve "Your Feature 16" (Corresponds to trizFeatures[15])
    [
         [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
         // Ensure 16 elements in this row (arrays of principle numbers from 1-40)
    ]
    // Ensure you have exactly 16 rows (inner arrays) in this matrix
];

// Helper to get principle details by number (DO NOT CHANGE)
// This will now only find principles 1-32 because principles 33-40 were removed.
function getPrincipleByNumber(number) {
    // Principles are numbered 1-N, array is 0-(N-1).
    // Use find method which works regardless of array size, provided the number exists in the array.
    // We check if trizPrinciples is defined before trying to use find.
    return typeof trizPrinciples !== 'undefined' ? trizPrinciples.find(p => p.number === number) : null;
}