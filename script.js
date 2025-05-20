// General JavaScript for common functionalities like hamburger menu

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Optional: Change hamburger icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                 icon.classList.remove('fa-bars');
                 icon.classList.add('fa-times'); // Use 'times' icon when open
            } else {
                 icon.classList.remove('fa-times');
                 icon.classList.add('fa-bars'); // Use 'bars' icon when closed
            }
        });
    }

    // Close menu when clicking outside (optional, requires more complex logic)
    // Close menu when a link is clicked (useful for single page apps or if menu stays open)
    if (navLinks) { // Check if navLinks exists
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                 const icon = hamburger ? hamburger.querySelector('i') : null;
                 if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                 }
            });
        });
    }


     // Close menu if window is resized and menu is active (handle orientation changes)
     window.addEventListener('resize', () => {
         if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
              navLinks.classList.remove('active');
              const icon = hamburger ? hamburger.querySelector('i') : null;
              if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
              }
         }
     });

});