// Smooth Scroll for Navigation
const links = document.querySelectorAll('nav ul li a');

links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 50, // Adjust offset for header
            behavior: 'smooth'
        });
    });
});

// Hover Effects for Project Cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('img');
        img.style.opacity = '0.8';  // Darken the image on hover
    });

    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('img');
        img.style.opacity = '1';  // Reset the image opacity
    });
});

// Contact Form Validation
const form = document.querySelector('#contact form');
const nameInput = document.querySelector('#contact input[name="name"]');
const emailInput = document.querySelector('#contact input[name="email"]');
const messageInput = document.querySelector('#contact textarea[name="message"]');
const submitButton = document.querySelector('#contact button');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
        isValid = false;
        alert('Please enter your name.');
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        isValid = false;
        alert('Please enter a valid email address.');
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
        isValid = false;
        alert('Please enter your message.');
    }

    // If all fields are valid, submit the form
    if (isValid) {
        alert('Thank you for your message! I will get back to you soon.');
        form.reset(); // Reset the form after successful submission
    }
});

// Dynamic Project Hover Effect for More Info (Optional)
const projectTitles = document.querySelectorAll('.project-card h3');

projectTitles.forEach(title => {
    title.addEventListener('mouseover', function() {
        this.style.color = '#007bff'; // Change title color on hover
    });

    title.addEventListener('mouseout', function() {
        this.style.color = ''; // Reset color when not hovered
    });
});

// Add scroll effect for header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// EmailJS form handling
function sendEmail(event) {
    event.preventDefault();
    
    const button = document.querySelector('#contact-form button');
    const buttonText = button.querySelector('.button-text');
    const spinner = button.querySelector('.loading-spinner');
    const successMessage = document.querySelector('#success-message');
    
    // Show loading state
    buttonText.classList.add('hidden');
    spinner.classList.remove('hidden');
    button.disabled = true;

    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_name: 'Arnold Kiprotich'
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            // Hide loading state
            buttonText.classList.remove('hidden');
            spinner.classList.add('hidden');
            button.disabled = false;
            
            // Show success message
            successMessage.classList.remove('hidden');
            document.getElementById('contact-form').reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        }, function(error) {
            console.error('Failed to send email:', error);
            alert('Failed to send message. Please try again.');
            
            // Reset button state
            buttonText.classList.remove('hidden');
            spinner.classList.add('hidden');
            button.disabled = false;
        });

    return false;
}

// Add scroll spy for navigation
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === section.getAttribute('id')) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add this to your existing JavaScript
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Check if the file exists
        fetch(link.href)
            .then(response => {
                if (!response.ok) {
                    e.preventDefault();
                    alert('CV download is currently unavailable. Please contact me directly for a copy.');
                }
            })
            .catch(() => {
                e.preventDefault();
                alert('CV download is currently unavailable. Please contact me directly for a copy.');
            });
    });
});
