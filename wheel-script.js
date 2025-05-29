// wheel-script.js

const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const modal = document.getElementById('resultModal');
const winningNumberSpan = document.getElementById('winningNumber');
const closeModalSpan = document.querySelector('.close-button');

const segments = 32; // Number of segments (1-32)
const segmentAngle = (2 * Math.PI) / segments; // Angle in radians per segment (counter-clockwise)

// Define colors for the segments (you can customize these)
const colors = [
    '#FF6347', '#4682B4', '#32CD32', '#FFD700', '#6A5ACD',
    '#FF8C00', '#00CED1', '#FF69B4', '#8A2BE2', '#CD5C5C',
    '#556B2F', '#FF4500', '#20B2AA', '#DA70D6', '#B0C4DE',
    '#F08080', '#98FB98', '#BA55D3', '#BC8F8F', '#00FA9A',
    '#DB7093', '#FFA07A', '#40E0D0', '#EE82EE', '#A9A9A9',
    '#F5DEB3', '#9ACD32', '#ADD8E6', '#F0E68C', '#DDA0DD',
    '#BDB76B', '#87CEFA'
];

// Helper function to draw the wheel content (segments and text)
// This function assumes the context transform (translate/rotate) is already set by the caller
function drawStaticWheelContent(ctx, centerX, centerY, wheelRadius, fontSize, segments, segmentAngle, colors) {
     // Drawing starts from angle 0 (right) and goes counter-clockwise
     let startAngle = 0;

    for (let i = 0; i < segments; i++) {
        const endAngle = startAngle + segmentAngle;

        // Draw segment
        ctx.beginPath();
        // Draw from the center to the arc
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, wheelRadius, startAngle, endAngle);
        ctx.closePath(); // Connect back to the center

        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = '#fff'; // White borders
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text (number)
        const text = (i + 1).toString(); // Numbers 1 to 32
        // Position text in the middle of the segment's angle, slightly away from the center
        const textAngle = startAngle + segmentAngle / 2;
        const textRadius = wheelRadius * 0.75; // Adjust distance from center

        ctx.save(); // Save context state before text transform
        // Translate to the text position
        ctx.translate(centerX + Math.cos(textAngle) * textRadius, centerY + Math.sin(textAngle) * textRadius);
        // Rotate text upright (standard angle 0 is right, text pointing right; add PI/2 to point up)
        ctx.rotate(textAngle + Math.PI / 2);
        ctx.fillStyle = '#000';
        ctx.font = `bold ${fontSize}px Arial, sans-serif`; // Use calculated font size
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 0, 0);
        ctx.restore(); // Restore context state

        startAngle = endAngle; // Move to the start of the next segment
    }
}


// Main function to draw the wheel (used for initial draw and resize)
function drawWheel() {
    // Get the actual size of the canvas element based on CSS
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    // Set the internal drawing buffer size to match the display size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const wheelRadius = Math.min(canvasWidth, canvasHeight) / 2; // Use the smaller dimension for radius
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Determine font size based on wheel size for better readability
    const baseFontSize = 16; // Starting font size for larger wheels (e.g., 400px diameter)
    const minFontSize = 10; // Minimum font size
    // Scale font size based on radius compared to the radius of a 400px wheel (200px)
    const fontSize = Math.max(minFontSize, baseFontSize * (wheelRadius / 200));

    // Clear and draw the static wheel content (no animation rotation here)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawStaticWheelContent(ctx, centerX, centerY, wheelRadius, fontSize, segments, segmentAngle, colors);
}


// --- Spinning Logic ---
let currentRotation = 0; // In radians (total accumulated rotation)
let isSpinning = false;
let animationFrameId = null; // To keep track of the animation frame

function spin() {
    if (isSpinning) return; // Prevent multiple spins
    isSpinning = true;
    spinButton.disabled = true; // Disable button while spinning

    // Pick a target segment index (0 to 31)
    const targetSegmentIndex = Math.floor(Math.random() * segments);

    // Calculate the angle of the center of the target segment in the *unrotated* wheel
    // Segment 'i' (0-31) corresponds to number 'i+1'.
    // The angle range for segment 'i' is [i * segmentAngle, (i+1) * segmentAngle) starting from angle 0 (right) counter-clockwise.
    const targetAngleRelativeUnrotatedWheel = targetSegmentIndex * segmentAngle + segmentAngle / 2;

    // The pointer is fixed at the top of the canvas, which is at angle 3*PI/2 (counter-clockwise from right).
    // We need to rotate the wheel (counter-clockwise) such that the `targetAngleRelativeUnrotatedWheel` ends up at the 3*PI/2 position.
    // Let R be the total rotation amount (currentRotation). We want the angle on the wheel that is at screen position 3*PI/2 to be `targetAngleRelativeUnrotatedWheel`.
    // Screen angle = (Original Angle + Rotation) % (2*PI)
    // 3*PI/2 = (targetAngleRelativeUnrotatedWheel + finalRotation) % (2*PI)
    // finalRotation = (3*PI/2 - targetAngleRelativeUnrotatedWheel) % (2*PI)
    // Adjust for modulo of negative numbers: Add 2*PI and take modulo again
    let rotationNeededForAlignment = (3 * Math.PI / 2 - targetAngleRelativeUnrotatedWheel);
    rotationNeededForAlignment = (rotationNeededForAlignment % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);


    // Add several full rotations (e.g., 5-10 full spins) plus the needed alignment rotation
    const fullSpins = 5 + Math.random() * 5; // Random number of full spins
    const finalRotation = currentRotation + fullSpins * (2 * Math.PI) + rotationNeededForAlignment;

    const duration = 5000; // Spin duration in milliseconds
    let startTime = null;
    let startRotationForAnimation = currentRotation; // Capture starting rotation for easing

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1); // Animation progress (0 to 1)

        // Use an easing function (ease-out quint is good for spinning down)
        const easing = t => (--t) * t * t * t * t + 1;
        const easedProgress = easing(progress);

        // Calculate the current rotation value based on easing
        currentRotation = startRotationForAnimation + (finalRotation - startRotationForAnimation) * easedProgress;


        // --- Drawing for the current frame ---
        // Get current canvas dimensions (might change if window resizes during spin)
        const currentCanvasWidth = canvas.clientWidth;
        const currentCanvasHeight = canvas.clientHeight;
        canvas.width = currentCanvasWidth; // Set drawing buffer size
        canvas.height = currentCanvasHeight;

        const currentCenterX = currentCanvasWidth / 2;
        const currentCenterY = currentCanvasHeight / 2;
        const currentWheelRadius = Math.min(currentCanvasWidth, currentCanvasHeight) / 2;
        const baseFontSize = 16;
        const minFontSize = 10;
        const currentFontSize = Math.max(minFontSize, baseFontSize * (currentWheelRadius / 200));


        ctx.clearRect(0, 0, currentCanvasWidth, currentCanvasHeight); // Clear the entire canvas

        ctx.save(); // Save state BEFORE transforms
        // Apply rotation transform relative to the center
        ctx.translate(currentCenterX, currentCenterY);
        ctx.rotate(currentRotation); // Apply the animated rotation
        ctx.translate(-currentCenterX, -currentCenterY); // Move origin back

        // Draw the static wheel content (segments and numbers)
        // drawStaticWheelContent draws based on the dimensions and center provided,
        // within the context that has already been rotated.
        drawStaticWheelContent(ctx, currentCenterX, currentCenterY, currentWheelRadius, currentFontSize, segments, segmentAngle, colors);

        ctx.restore(); // Restore state AFTER transforms


        if (progress < 1) {
            animationFrameId = requestAnimationFrame(animate);
        } else {
            // Animation finished
            isSpinning = false;
            spinButton.disabled = false;
            animationFrameId = null;

            // --- Determine Winning Segment ---
            // The pointer is at 3*PI/2 (UP) relative to the canvas's top.
            // The wheel has rotated by `currentRotation`.
            // We need to find which segment's original angle is now positioned at 3*PI/2.
            // Original Angle = (Pointer Angle - currentRotation) % (2*PI)
            let winningAngleRelativeUnrotatedWheel = (3 * Math.PI / 2 - currentRotation);
            // Normalize angle to be between 0 and 2*PI
            winningAngleRelativeUnrotatedWheel = (winningAngleRelativeUnrotatedWheel % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

            // Map the normalized angle to a segment index (0 to 31)
            // The angle range for segment `i` (number `i+1`) is [i * segmentAngle, (i+1) * segmentAngle).
            const winningSegmentIndex = Math.floor(winningAngleRelativeUnrotatedWheel / segmentAngle);

            // The winning number is the segment index + 1
            const winningNumber = winningSegmentIndex + 1;

            // Show result modal
            showModal(winningNumber);
        }
    }

    // Start the animation
    animationFrameId = requestAnimationFrame(animate);
}

// --- Modal Functions ---
function showModal(number) {
    winningNumberSpan.textContent = number;
    modal.style.display = 'flex'; // Use flex to center the modal-overlay content
}

function hideModal() {
    modal.style.display = 'none';
}

// --- Event Listeners ---
spinButton.addEventListener('click', spin);
closeModalSpan.addEventListener('click', hideModal);

// Close modal if user clicks outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});

// Redraw the wheel if the window is resized
window.addEventListener('resize', drawWheel);

// --- Initial Drawing ---
drawWheel(); // Draw the wheel when the script loads