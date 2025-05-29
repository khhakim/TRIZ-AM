// wheel-script.js

const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const modal = document.getElementById('resultModal');
const winningNumberSpan = document.getElementById('winningNumber');
const closeModalSpan = document.querySelector('.close-button');

const segments = 32; // Number of segments (1-32)
const wheelRadius = canvas.width / 2;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const segmentAngle = (2 * Math.PI) / segments; // Angle in radians per segment

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

// --- Drawing the Wheel ---
function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let startAngle = 0;

    for (let i = 0; i < segments; i++) {
        const endAngle = startAngle + segmentAngle;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, wheelRadius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length]; // Use colors cyclically
        ctx.fill();
        ctx.strokeStyle = '#fff'; // White borders
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text (number)
        const text = (i + 1).toString(); // Numbers 1 to 32
        const textAngle = startAngle + segmentAngle / 2; // Middle of the segment
        const textRadius = wheelRadius * 0.75; // Position text closer to the edge

        ctx.save(); // Save context state
        ctx.translate(centerX + Math.cos(textAngle) * textRadius, centerY + Math.sin(textAngle) * textRadius);
        ctx.rotate(textAngle + Math.PI / 2); // Rotate text upright
        ctx.fillStyle = '#000'; // Text color
        ctx.font = 'bold 16px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 0, 0);
        ctx.restore(); // Restore context state

        startAngle = endAngle;
    }
}

// --- Spinning Logic ---
let currentRotation = 0; // In radians
let isSpinning = false;

function spin() {
    if (isSpinning) return; // Prevent multiple spins
    isSpinning = true;
    spinButton.disabled = true; // Disable button while spinning

    // Calculate a random stop angle
    // We want to stop within a segment. Each segment is segmentAngle wide.
    // We need to stop slightly offset from the middle of a segment so the pointer
    // clearly indicates which segment was chosen.
    // The pointer is at the top (angle 270 degrees or 3*PI/2 radians if 0 is right).
    // Our drawing starts with segment 1 roughly to the right (angle 0).
    // To land on segment 'i' (0-31), we need to stop when the pointer is somewhere in its arc.
    // Angle for segment 'i' is from i * segmentAngle to (i+1) * segmentAngle.
    // Pointer is at 3*PI/2. So we need (currentRotation + segment.angle) % (2*PI) = 3*PI/2
    // targetAngle = (segmentIndex * segmentAngle) + offset;
    // We want the pointer (top, 3*PI/2) to align with a random segment's angle.
    // Let's pick a target segment index first (0 to 31)
    const targetSegmentIndex = Math.floor(Math.random() * segments);
    const targetAngle = (targetSegmentIndex * segmentAngle) + (segmentAngle / 2); // Aim for the middle of the segment

    // We need to rotate such that the target angle is under the pointer (3*PI/2).
    // Desired final rotation (in radians, relative to start=0 being right):
    // Let R be the total rotation. We want (0 - R) % (2*PI) to align targetSegmentAngle with 3*PI/2
    // 3*PI/2 = (targetAngle - R) % (2*PI)
    // R = (targetAngle - 3*PI/2 + 2*PI) % (2*PI) ...simplified rotation to land on target, but we need multiple spins

    // Add several full rotations (e.g., 5-10 full spins) plus the precise stopping angle
    const fullSpins = 5 + Math.random() * 5; // 5 to 10 full spins
    const totalRotationNeeded = fullSpins * (2 * Math.PI) + (2*Math.PI - targetAngle + 3*Math.PI/2) % (2*Math.PI) ;

    // Ensure minimum rotation if targetAngle is close to the pointer initially
     // If targetAngle is close to 3*PI/2, the modulo could result in a small rotation.
     // We need a minimum number of rotations for the effect.
     // Let's calculate the simple diff and add full spins.
     let rotationDifference = (2*Math.PI + targetAngle - (3*Math.PI/2 + currentRotation % (2*Math.PI))) % (2*Math.PI);
     if (rotationDifference < 0) rotationDifference += (2*Math.PI); // Ensure positive difference

     const finalRotation = currentRotation + fullSpins * (2*Math.PI) + rotationDifference;


    const duration = 4000; // Spin duration in milliseconds
    let startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1); // Animation progress (0 to 1)

        // Use an easing function (e.g., ease-out quint)
        const easing = t => (--t) * t * t * t * t + 1;
        const easedProgress = easing(progress);

        // Calculate current angle
        currentRotation = finalRotation * easedProgress;

        // Draw the wheel rotated
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(centerX, centerY); // Move origin to center
        ctx.rotate(currentRotation); // Rotate
        ctx.translate(-centerX, -centerY); // Move origin back
        drawWheel(); // Draw the wheel segments (without rotation logic inside draw)
        ctx.restore();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Animation finished
            isSpinning = false;
            spinButton.disabled = false;

            // Determine the winning segment index
            // The total rotation is currentRotation
            // The pointer is at 3*PI/2 relative to the canvas's top (0,0)
            // We need to find which segment is at the 3*PI/2 mark after rotation.
            // Angle relative to the *unrotated* wheel that is now at 3*PI/2 = (3*PI/2 - currentRotation)
            let winningAngle = (3*Math.PI/2 - currentRotation) % (2*Math.PI);
             if (winningAngle < 0) winningAngle += (2*Math.PI); // Ensure positive

            // Map angle to segment index (0-31)
            const winningSegmentIndex = Math.floor(winningAngle / segmentAngle);

            // The numbers are 1 to 32.
            const winningNumber = winningSegmentIndex + 1;

            // Show result modal
            showModal(winningNumber);
        }
    }

    requestAnimationFrame(animate);
}

// --- Modal Functions ---
function showModal(number) {
    winningNumberSpan.textContent = number;
    modal.style.display = 'flex'; // Use flex to center
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


// --- Initial Drawing ---
drawWheel(); // Draw the wheel when the script loads