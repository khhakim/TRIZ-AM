// data.js - TRIZ Principles and Matrix Data

// --- TRIZ Principles Data (Replace with your complete 40 principles) ---
// Ensure you have exactly 40 objects in this array, indexed 0 to 39.
// The 'number' field should correspond to the principle number (1 to 40).
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
    // --- CONTINUE ADDING ALL 40 TRIZ principles here following this structure ---
    // ... (Principles 5 through 39) ...
    {
        number: 40,
        name: "Composite Materials",
        brief: "Replace a homogeneous material with a composite.",
        example: "Fiberglass, carbon fiber composites, reinforced concrete.",
        imageUrl: ""
    }
];

// --- TRIZ Matrix Features (Replace with your complete 39 features) ---
// This array must contain exactly 39 feature strings.
// The index of each feature in this array corresponds to its row/column index in the matrix data below.
// For example, "Weight of moving object" is at index 0, "Weight of stationary object" at index 1, etc.
const trizFeatures = [
    "Weight of moving object",      // 1
    "Weight of stationary object",   // 2
    "Length of moving object",       // 3
    "Length of stationary object",   // 4
    "Area of moving object",         // 5
    "Area of stationary object",     // 6
    "Volume of moving object",       // 7
    "Volume of stationary object",   // 8
    "Speed",                         // 9
    "Force",                         // 10
    "Tension/Pressure",              // 11
    "Shape",                         // 12
    "Stability of composition",      // 13
    "Strength",                      // 14
    "Duration of action of a moving object", // 15
    "Duration of action of a stationary object", // 16
    "Use of object",                 // 17
    "Adaptability or Versatility",   // 18
    "Expenditure of energy",         // 19
    "Expenditure of substance",      // 20
    "Expenditure of information",    // 21
    "Expenditure of time",           // 22
    "Amount of substance",           // 23
    "Loss of information",           // 24
    "Loss of time",                  // 25
    "Quantity of substance",         // 26 (Often same as Amount of substance, varies by source)
    "Reliability",                   // 27
    "Measurement accuracy",          // 28
    "Manufacturing precision",       // 29
    "Harmful factors acting on object", // 30
    "Harmful factors produced by object",// 31
    "Maintainability",               // 32
    "Manufacturability",             // 33
    "Convenience of Use",            // 34
    "Adaptability",                  // 35 (Similar to 18, varies by source)
    "Complexity of design",          // 36
    "Difficulty of control",         // 37
    "Level of automation",           // 38
    "Productivity",                  // 39
    // Ensure you have exactly 39 features listed here
];


// --- TRIZ Contradiction Matrix Data (Replace with your complete 39x39 matrix) ---
// This is a 2D array (matrix).
// trizMatrix[i][j] gives the recommended principles when feature i (Improving)
// conflicts with feature j (Worsening/Preserving).
// The values are arrays of principle numbers (1 to 40).
// An empty array [] means no standard principles are strongly recommended for that pair.
// Index i corresponds to the index in trizFeatures for the "Feature to Improve".
// Index j corresponds to the index in trizFeatures for the "Feature to Preserve/Worsen".
// The matrix MUST be 39x39 (39 arrays, each containing 39 elements).
const trizMatrix = [
    // Row 0: Improve "Weight of moving object" (Corresponds to trizFeatures[0])
    [
        [],     // vs "Weight of moving object" (1) - No contradiction with self
        [8, 15, 29, 34], // vs "Weight of stationary object" (2) - EXAMPLE principles
        [15, 8, 29, 34], // vs "Length of moving object" (3) - EXAMPLE principles
        [],     // vs "Length of stationary object" (4)
        [], [], [], [], [], [], [], [], [], // ... fill in the rest of the row ...
        [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
        [] // Ensure 39 elements in this row
    ],
    // Row 1: Improve "Weight of stationary object" (Corresponds to trizFeatures[1])
    [
        [8, 15, 29, 34], // vs "Weight of moving object" (1) - EXAMPLE principles (Often symmetric or related to the row above)
        [],     // vs "Weight of stationary object" (2)
         [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
        [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
        [] // Ensure 39 elements in this row
    ],
    // --- CONTINUE ADDING ALL 39 ROWS FOR ALL 39 FEATURES TO IMPROVE ---
    // Each row must contain exactly 39 elements (arrays of principle numbers).
    // Example structure for row 2 (Improving Length of moving object):
    // [
    //     [1, 7, 15, 17], // vs Weight of moving object (1) - EXAMPLE
    //     [], // vs Weight of stationary object (2)
    //     [], // vs Length of moving object (3) - No contradiction with self
    //     // ... fill in the rest of the 39 elements for this row ...
    //     []
    // ],
    // ... (Rows 3 through 38) ...
    // Row 38: Improve "Productivity" (Corresponds to trizFeatures[38])
    [
         [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
         [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
         [], [] // Ensure 39 elements in this row
    ]
    // Ensure you have exactly 39 rows (inner arrays) in this matrix
];

// Helper to get principle details by number
function getPrincipleByNumber(number) {
    // Principles are numbered 1-40, array is 0-39
    return trizPrinciples.find(p => p.number === number);
}