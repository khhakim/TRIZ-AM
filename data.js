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