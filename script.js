// Dark mode functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Add toggle switch event listener
    darkModeToggle.addEventListener('click', function() {
        let theme = document.body.getAttribute('data-theme');
        if (theme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// Initialize dark mode
initDarkMode();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic form validation
        if (!name || !email || !message) {
            alert('الرجاء ملء جميع الحقول المطلوبة');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('الرجاء إدخال بريد إلكتروني صحيح');
            return;
        }

        // Basic spam protection
        const MAX_MESSAGES_PER_HOUR = 5;
        const STORAGE_KEY = 'emailjs_last_messages';
        
        // Get message history
        const messageHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const oneHourAgo = Date.now() - (60 * 60 * 1000);
        
        // Clean old messages and count recent ones
        const recentMessages = messageHistory.filter(time => time > oneHourAgo);
        
        // Check if user has sent too many messages
        if (recentMessages.length >= MAX_MESSAGES_PER_HOUR) {
            alert('عذراً، لقد تجاوزت الحد المسموح به من الرسائل. الرجاء المحاولة لاحقاً.');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        emailjs.send(
            'service_m7m1slk',
            'template_ryhhdzl',
            {
                to_email: 'oussamabelkahla1997.dz@gmail.com',
                from_name: name,
                from_email: email,
                message: message,
            }
        ).then(
            function(response) {
                // Add message timestamp to history
                recentMessages.push(Date.now());
                localStorage.setItem(STORAGE_KEY, JSON.stringify(recentMessages));
                
                alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
                contactForm.reset();
            },
            function(error) {
                alert('عذراً، حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى.');
                console.error('Error:', error);
            }
        ).finally(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

// Add animation to skill items
const skillItems = document.querySelectorAll('.skill-items span');
skillItems.forEach(item => {
    item.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});
