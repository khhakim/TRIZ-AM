// data.js - TRIZ Principles (32 only) and Matrix Data (16x16)

// --- TRIZ Principles Data (Replace with your complete data for the 32 principles) ---
// This array contains only the 32 principles intended for the flashcard view.
// Matrix links to principles 33-40 will result in getPrincipleByNumber returning null/undefined.
const trizPrinciples = [
    {
        number: 1,
        name: "Segmentation",
        brief: "The designer increases manufacturability by dividing the artifact into smaller components where the part is larger than the expected build volume.",
        example: "A mask that is too large to be printed directly is segmented in the digital 3D model design phase into two smaller parts that can be combined. The two parts are printed separately and then combined.",
        imageUrl: "" // Optional: Add a URL to an image, e.g., "images/segmentation.jpg"
    },
    {
        number: 2,
        name: "Taking Out (Extraction)",
        brief: "Scaling artefacts and trimming or removing non-critical volumes and unnecessary parts, such as thick walls and hollow interiors, can ensure printability, reduce time and minimize weight.",
        example: "Taking the thick walls and internal fillings out of a printed part reduce sprinting time and weight.",
        imageUrl: ""
    },
    {
        number: 3,
        name: "Local Quality",
        brief: "Achieve a degree of freedom/desired behaviour by applying a customized material distribution: AM can manufacture parts with non-uniform wall thicknesses and generation of cellular structures(non-uniform) to improve efficiency.",
        example: "Increasing the density of the lower end of the scaffold structure in medical applications allows it to withstand greater loads.",
        imageUrl: ""
    },
     {
        number: 4,
        name: "Asymmetry",
        brief: "Anisotropic structures; designing the parts by considering the build orientation, utilizing the product orientation of a layer-like structure to increase the part’s strength in the direction of energy flow, especially for load-bearing parts for FDM.",
        example: "In the two opposite directions of constructing an eyeglass frame, in the case of the left side, not only does the support structure have to be added, but the subsequent surface treatment also becomes more problematic.",
        imageUrl: ""
    },
    {
        number: 5,
        name: "Merging",
        brief: "Integrate additional functionality for better functional performance and reduce assembly times, part sizes, and interfaces by integrating functional parts and standard geometries (e.g. threads, holes) into the design by printing a single part or printing to build the entire assemblies.",
        example: "In this example of a desk mount headphone hanger/clamp, standard threads and screw holes are integrated into the design of a single product.",
        imageUrl: ""
    },
     {
        number: 6,
        name: "Universality",
        brief: "Performing multiple functions by adding functional features in standard components.",
        example: "The handle of the toothbrush is designed as a hollow structure that can store toothpaste.",
        imageUrl: ""
    },
    {
        number: 7,
        name: "Nested Doll",
        brief: "Add function(s) to designs by incorporating components or functional features in unused internal volumes or non-functional aesthetic models.",
        example: "In this case, a model in the form of an elephant has been printed layer by layer, the tusks redesigned, and the top casing removed. This provides storage space and can be used as a mobile phone holder.",
        imageUrl: ""
    },
    {
        number: 8,
        name: "Preliminary Action",
        brief: "Design an object with features easily post-processed; otherwise, it will affect the actual design and shape.",
        example: "For example, producing holes using FDM may have an outcome such as burrs if the gap is too small; it is challenging to remove burrs.",
        imageUrl: ""
    },
    {
        number: 9,
        name: "Beforehand Cushioning",
        brief: "Designing parts that can be easily and temporarily replaced when replacement parts and tools are in short supply or when parts are prone to wear and tear increases the product's overall life. It allows for a quick return to production.",
        example: "Design parts that can easily be substituted temporarily when there is a shortage of parts or tools for replacement, such as the toy car tyre casing, have been designed to be replaced when worn.",
        imageUrl: ""
    },
    {
        number: 10,
        name: "The Other Way Around",
        brief: "The core thinking of the principle of the other way around is reverse thinking. If something is manufactured in one particular way, an attempt is made to manufacture it opposite to avoid inherent problems.",
        example: "This cap is designed to avoid the uncontrolled flow of liquid in the open state, thus reducing waste.",
        imageUrl: ""
    },
    {
        number: 11,
        name: "Spheroidality",
        brief: "AM enables the creation of complex topologically optimized geometries to design lighter, more organic, and unique-looking products with reduced mass and/or improved performance.",
        example: "Design lighter, more organic, aesthetically unique products using topology optimization (TO) methods.",
        imageUrl: ""
    },
    {
        number: 12,
        name: "Dynamics",
        brief: "Customized design according to its natural behaviour in controlled conditions allows for movement by connecting parts using an integrated connection on point/geometry to facilitate assembly and disassembly.",
        example: "The design can be customized according to its natural behaviour in controlled conditions, such as prosthetic hands.",
        imageUrl: ""
    },
    {
        number: 13,
        name: "Another Dimension",
        brief: "Designers can design parts using multi-scale structures on multiple levels of a single component, micro-scale/meson-scale/macro-scale.",
        example: "Designing parts with multi-functional artifacts involving multi-scale structures. The multi-scale system consists of micro, meso, and macro scales.",
        imageUrl: ""
    },
    {
        number: 14,
        name: "Blessing in Disguise",
        brief: "With AM, it is relatively easy to manufacture different patterns and textures embedded in the product's surface. Create customized textures or design multiple short overhangs to ensure good grip and interaction with the environment.",
        example: "3D Print soles with custom textures for added friction.",
        imageUrl: ""
    },
    {
        number: 15,
        name: "Self-Service",
        brief: "Designing an interlocking mechanism or incorporating snap fits into the part will provide a more permanent and adequate fit between components, reducing assembly time and the number of components.",
        example: "The designer implements snap fitting in a design instead of adding fasteners to an assembly. By doing this, all parts are created using a single machine.",
        imageUrl: ""
    },
    {
        number: 16,
        name: "Copying",
        brief: "Minimize design time and effort and simplify the assembly process by re-using the geometry of already designed components where CAD data is already available or by integrating standard geometries (e.g. standard threads, holes) into the design.",
        example: "When creating an accessory for a model tool, the designer can leverage an existing thread design rather than measuring and sizing the attachment thread on a model.",
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
    "Weight of object",  // 1
    "Length of object",  // 2
    "Surface of object",  // 3
    "Volume of object",  // 4
    "Stress or Pressure",  // 5
    "Shape",  // 6
    "Stability",  // 7
    "Strength",  // 8
    "Loss of substance",  // 9
    "Loss of time", // 10
    "Loss of cost", // 11
    "Quantity of substance", // 12
    "Reliability", // 13
    "Ease of manifacturing", // 14
    "Ease of repair", // 15
    "Device complexity", // 16
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
    // Row 0: Improve "Weight of object" (Corresponds to trizFeatures[0])
    [
        [],     // vs "Weight of object" (1) - No contradiction with self
        [1, 10, 12, 20],
        [2, 10, 21],
        [2, 5, 11, 21],
        [8, 10], 
        [8, 10, 11, 25],
        [1, 16, 22],
        [2, 8, 17],
        [5, 10],
        [8, 16, 21],
        [3, 17],
        [6, 16],
        [3, 8],
        [1, 21, 30],
        [2, 9, 17],
        [1, 8, 16] // Ensure 16 elements in this row
    ],
    // Row 1: Improve "Length of object" (Corresponds to trizFeatures[1])
    [
        [21, 22],
        [],
        [7, 8, 13, 22],
        [2, 11],
        [1, 11, 21],
        [7, 10, 11, 12],
        [21],
        [11, 12, 16],
        [8, 21],
        [11],
        [3],
        [],
        [12],
        [12, 13, 17, 23],
        [3],
        [1, 16],
    ],
    // Row 2: Improve "Surface of object" (Corresponds to trizFeatures[2])
    [
        [2, 11],
        [7, 16],
        [],
        [],
        [8, 12],
        [],
        [2],
        [22],
        [8, 11],
        [4, 21],
        [17],
        [2, 4, 22],
        [4, 21, 22],
        [1, 22, 24],
        [],
        [1] // Ensure 16 elements in this row
    ],
    // Row 3: Improve "Volume of object" (Corresponds to trizFeatures[3])
    [
        [8, 11, 21],
        [2, 11, 21],
        [],
        [],
        [21],
        [2, 7, 21],
        [20, 21, 22],
        [11, 12, 13],
        [8, 20, 21],
        [19, 21],
        [3, 18],
        [3, 21],
        [2, 21],
        [1, 21, 30],
        [1],
        [1, 18] // Ensure 16 elements in this row
    ],
    // Row 4: Improve "Stress or pressure" (Corresponds to trizFeatures[4])
    [
        [8, 10],
        [1, 11, 21],
        [8, 12],
        [21],
        [],
        [4, 8, 10, 21],
        [2, 21, 22],
        [3, 22],
        [3, 8],
        [4],
        [3, 17, 18],
        [8, 11],
        [8, 10, 21],
        [1, 21],
        [],
        [1, 21] // Ensure 16 elements in this row
    ],
    // Row 5: Improve "Shape" (Corresponds to trizFeatures[5])
    [
        [3, 8, 25, 27],
        [7, 8, 10, 11],
        [],
        [2, 7, 21, 27],
        [8, 11, 12, 20],
        [],
        [1, 4, 27],
        [8, 11, 22],
        [3, 5, 21],
        [8, 11, 13, 20],
        [17, 26],
        [14],
        [8, 22],
        [1, 13, 23, 26, 31],
        [1, 2, 10],
        [1] // Ensure 16 elements in this row
    ],
    // Row 6: Improve "Stability" (Corresponds to trizFeatures[6])
    [
        [1, 16, 22],
        [],
        [],
        [20, 21, 22],
        [2, 21, 22],
        [1, 4, 14],
        [],
        [12, 13],
        [2, 11, 22],
        [17, 21],
        [3, 9, 18],
        [12, 19, 21],
        [],
        [21, 29],
        [2, 9, 21],
        [2, 14, 16, 21] // Ensure 16 elements in this row
    ],
    // Row 7: Improve "Strength" (Corresponds to trizFeatures[7])
    [
        [1, 16, 17, 22],
        [11, 12, 16],
        [22],
        [11, 12, 13],
        [3, 8, 22],
        [8, 21, 22],
        [10, 13, 21],
        [],
        [8, 12, 21],
        [3, 8],
        [3, 18, 21],
        [8, 17],
        [3, 9],
        [3, 8, 9, 19],
        [3, 9, 17],
        [2, 10, 25] // Ensure 16 elements in this row
    ],
    // Row 8: Improve "Loss of substance" (Corresponds to trizFeatures[8])
    [
        [6, 14, 1, 9, 21, 25],
        [8],
        [8, 18],
        [3, 18],
        [3, 8],
        [3, 5, 21],
        [2, 11, 22],
        [3, 17],
        [],
        [8, 12, 21],
        [],
        [3, 6, 8],
        [8, 21],
        [12, 20, 25],
        [2, 17, 20, 21],
        [8, 21] // Ensure 16 elements in this row
    ],
    // Row 9: Improve "Loss of time" (Corresponds to trizFeatures[9])
    [
        [5, 8],
        [5, 11],
        [4, 8, 13, 21],
        [19, 21],
        [4],
        [4, 8, 13],
        [3, 5, 14, 21],
        [3],
        [8, 21],
        [],
        [3, 18],
        [21],
        [4, 8],
        [4, 20, 21, 28],
        [1, 8, 19],
        [6] // Ensure 16 elements in this row
    ],
    // Row 10: Improve "Loss of cost" (Corresponds to trizFeatures[10])
    [
        [2, 17, 18],
        [17, 30],
        [3, 21],
        [2, 3, 17, 18],
        [3, 18],
        [17, 21],
        [3, 18],
        [3, 9, 18, 27],
        [9, 17, 32],
        [],
        [],
        [17, 30],
        [3, 18],
        [1, 2, 17, 30],
        [9],
        [] // Ensure 16 elements in this row
    ],
    // Row 11: Improve "Quantity of substance" (Corresponds to trizFeatures[11])
    [
        [16, 17, 21],
        [],
        [2, 4, 22],
        [],
        [3, 8, 11],
        [11, 21],
        [2, 12, 13, 22],
        [8, 11, 21],
        [3, 6, 8],
        [],
        [17, 30],
        [],
        [3, 22],
        [1, 17, 21],
        [2, 8, 15, 19],
        [3, 8, 10, 17] // Ensure 16 elements in this row
    ],
    // Row 12: Improve "Reliability" (Corresponds to trizFeatures[12])
    [
        [3, 8],
        [9, 12],
        [4, 19, 21, 40],
        [2, 21],
        [8, 21],
        [1, 9, 21],
        [],
        [9],
        [8, 21],
        [4, 8],
        [3, 18, 21],
        [3, 22],
        [],
        [],
        [1, 9],
        [1, 10, 21] // Ensure 16 elements in this row
    ],
    // Row 13: Improve "Ease of manifacturing" (Corresponds to trizFeatures[13])
    [
        [1, 10, 17, 25],
        [1, 12, 13, 23],
        [22, 24],
        [1, 21, 30],
        [1, 21],
        [1, 10, 17, 23],
        [1, 9, 10, 29],
        [1, 3, 8, 29],
        [12, 20],
        [4, 20, 21, 29],
        [3, 18, 26],
        [1, 21, 30],
        [],
        [],
        [1, 9, 21],
        [1, 16, 10, 21] // Ensure 16 elements in this row
    ],
    // Row 14: Improve "Ease of repair" (Corresponds to trizFeatures[14])
    [
        [2, 9, 17, 21],
        [3, 18],
        [15],
        [1],
        [10],
        [1, 2, 4, 10],
        [2, 21],
        [1, 2, 9],
        [2, 17, 20, 21],
        [1, 8, 15, 19],
        [9, 30],
        [2, 8, 15],
        [1, 8, 9],
        [1, 8, 9, 21],
        [],
        [1, 9, 10, 21] // Ensure 16 elements in this row
    ],
    // Row 15: Improve "Device complexity" (Corresponds to trizFeatures[15])
    [
        [2, 16, 21],
        [16],
        [6],
        [1],
        [1, 21],
        [10, 12],
        [2, 13, 14],
        [2, 10],
        [8, 21],
        [6],
        [],
        [3, 8, 10, 17],
        [1, 10, 21],
        [1, 10, 1, 6, 17],
        [1, 10],
        [] // Ensure 16 elements in this row
    ],
];

// Helper to get principle details by number (DO NOT CHANGE)
// This will now only find principles 1-32 because principles 33-40 were removed.
function getPrincipleByNumber(number) {
    // Principles are numbered 1-N, array is 0-(N-1).
    // Use find method which works regardless of array size, provided the number exists in the array.
    // We check if trizPrinciples is defined before trying to use find.
    return typeof trizPrinciples !== 'undefined' ? trizPrinciples.find(p => p.number === number) : null;
}