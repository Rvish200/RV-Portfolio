// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Add active state to current section in navigation
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Skills data
const skills = [
    { name: 'HTML5', icon: 'fa-html5', description: 'Semantic markup and accessibility' },
    { name: 'CSS3', icon: 'fa-css3-alt', description: 'Modern layouts and animations' },
    { name: 'JavaScript', icon: 'fa-js', description: 'Interactive UI development' },
    { name: 'Java', icon: 'fa-java', description: 'Backend development' },
    { name: 'Node.js', icon: 'fa-node-js', description: 'Server-side JavaScript' },
    { name: 'MongoDB', icon: 'fa-database', description: 'NoSQL database' }
];

// Generate skills cards
const skillsGrid = document.querySelector('.skills-grid');
skills.forEach(skill => {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card';
    skillCard.innerHTML = `
        <i class="fab ${skill.icon}"></i>
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
    `;
    skillsGrid.appendChild(skillCard);
});

// Contact form handling
const contactForm = document.getElementById('contact-form');


// Project modal functionality
const projectButtons = document.querySelectorAll('.view-details');
const modalTemplate = `
    <div class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body"></div>
        </div>
    </div>
`;

document.body.insertAdjacentHTML('beforeend', modalTemplate);
const modal = document.querySelector('.modal');

projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectCard = button.closest('.project-card');
        const projectDetails = {
            title: projectCard.querySelector('h3').textContent,
            description: projectCard.querySelector('p').textContent,
            tech: Array.from(projectCard.querySelectorAll('.tech-stack span'))
                .map(span => span.textContent)
        };
        
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <h2>${projectDetails.title}</h2>
            <p>${projectDetails.description}</p>
            <div class="tech-list">
                ${projectDetails.tech.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        `;
        
        modal.style.display = 'flex';
    });
});

document.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form validation
function validateForm(formData) {
    const email = formData.get('email');
    const name = formData.get('name');
    const message = formData.get('message');
    
    const errors = [];
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push('Please enter a valid email address');
    }
    
    if (name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (message.length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

// Update contact form handling with validation
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        alert('Error sending message. Please try again.');
    } finally {
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-card').forEach(element => {
    observer.observe(element);
});

// Typing animation for hero text
const text = "Full-Stack Developer";
const heroText = document.querySelector('.animated-text');
let index = 0;

function typeText() {
    if (index < text.length) {
        heroText.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    heroText.textContent = '';
    setTimeout(typeText, 500);
});