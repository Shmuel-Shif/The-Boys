// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(11, 18, 32, 0.98)';
    } else {
        navbar.style.background = 'rgba(11, 18, 32, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Special handling for about section
            if (entry.target.id === 'about') {
                entry.target.classList.add('visible');
            }
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe only sections for animation (menu items removed)
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.querySelector('.hero-content').classList.add('fade-in-up');
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial body opacity
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.cta-button, .footer-cta');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .social-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 209, 102, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active navigation state
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--accent-yellow) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// Menu Modal Functionality
const modal = document.getElementById('menuModal');
const closeBtn = document.querySelector('.close');
const menuItems = document.querySelectorAll('.menu-item');

// Menu data
const menuData = {
    HalatSchnitzel: {
        title: 'חלת שניצל',
        price: '₪45',
        description: 'חלה טרייה ורכה ממולאת בשניצל עוף פריך וזהוב, עם ירקות טריים ורטבים לבחירה. ביס מושלם של בית, קראנץ\' וטעם ממכר.',
        image: 'images/sandwiches.png',
        ingredients: [
            'חלה טרייה ורכה',
            'שניצל עוף פריך וזהוב',
            'מטבוחת הבית',
            'חצילים',
            'כרוב סגול מיונז',
            'חסה פריכה'
        ]
    },
    HalatAsado: {
        title: 'חלת אסאדו',
        price: '₪45',
        description: 'נתחי אסאדו עסיסיים בבישול ארוך, מתפוררים ברכות ומוגשים בתוך חלה טרייה ורכה – יחד עם צ’יפס פריך, ירקות טריים ורטבים לבחירה. ',
        image: 'images/sandwiches.png',
        ingredients: [
            'שניצל עוף טרי',
            'באגט טרי',
            'ירקות טריים (חסה, עגבניה, מלפפון)',
            'מיונז ביתי',
            'צ\'יפס קריספי',
            'תבלינים מיוחדים'
        ]
    },
    Childrensportion: {
        title: 'מנת ילדים',
        price: '₪45',
        description: 'שניצל עוף קריספי בבאגט טרי עם ירקות טריים, מיונז ביתי וצ\'יפס צד. המנה המושלמת לארוחה מהירה וטעימה.',
        image: 'images/sandwiches.png',
        ingredients: [
            'שניצל עוף טרי',
            'באגט טרי',
            'ירקות טריים (חסה, עגבניה, מלפפון)',
            'מיונז ביתי',
            'צ\'יפס קריספי',
            'תבלינים מיוחדים'
        ]
    },
    Schnitzelsalad: {
        title: 'סלט שניצל',
        price: '₪45',
        description: 'שניצל עוף קריספי בבאגט טרי עם ירקות טריים, מיונז ביתי וצ\'יפס צד. המנה המושלמת לארוחה מהירה וטעימה.',
        image: 'images/sandwiches.png',
        ingredients: [
            'שניצל עוף טרי',
            'באגט טרי',
            'ירקות טריים (חסה, עגבניה, מלפפון)',
            'מיונז ביתי',
            'צ\'יפס קריספי',
            'תבלינים מיוחדים'
        ]
    },
    schnitzels: {
        title: 'שניצלונים',
        price: '₪45',
        description: 'שניצל עוף קריספי בבאגט טרי עם ירקות טריים, מיונז ביתי וצ\'יפס צד. המנה המושלמת לארוחה מהירה וטעימה.',
        image: 'images/sandwiches.png',
        ingredients: [
            'שניצל עוף טרי',
            'באגט טרי',
            'ירקות טריים (חסה, עגבניה, מלפפון)',
            'מיונז ביתי',
            'צ\'יפס קריספי',
            'תבלינים מיוחדים'
        ]
    },
    Snackwings: {
        title: 'כנפיים נשנוש',
        price: '₪45',
        description: 'שניצל עוף קריספי בבאגט טרי עם ירקות טריים, מיונז ביתי וצ\'יפס צד. המנה המושלמת לארוחה מהירה וטעימה.',
        image: 'images/sandwiches.png',
        ingredients: [
            'שניצל עוף טרי',
            'באגט טרי',
            'ירקות טריים (חסה, עגבניה, מלפפון)',
            'מיונז ביתי',
            'צ\'יפס קריספי',
            'תבלינים מיוחדים'
        ]
    },
    Potatochips: {
        title: 'צ\'יפס תפוח אדמה',
        price: '₪45',
        description: 'שניצל עוף קריספי בבאגט טרי עם ירקות טריים, מיונז ביתי וצ\'יפס צד. המנה המושלמת לארוחה מהירה וטעימה.',
        image: 'images/sandwiches.png',
        ingredients: [
            'שניצל עוף טרי',
            'באגט טרי',
            'ירקות טריים (חסה, עגבניה, מלפפון)',
            'מיונז ביתי',
            'צ\'יפס קריספי',
            'תבלינים מיוחדים'
        ]
    },
    Sweetpotatochips: {
        title: 'צ\'יפס בטטה',
        price: '₪65',
        description: 'שניצל עוף ענק עם צ\'יפס קריספי, סלט טרי, מיונז ביתי ובחירת שתייה. המנה הכי נמכרת שלנו!',
        image: 'images/sandwiches.png',
        ingredients: [
            'שניצל עוף ענק',
            'צ\'יפס קריספי',
            'סלט טרי',
            'מיונז ביתי',
            'בחירת שתייה',
            'תבלינים מיוחדים'
        ]
    },
    Onionrings: {
        title: 'טבעות בצל',
        price: '₪75',
        description: 'שניצל עוף ענק עם סלט יווני טרי, צ\'יפס, טחינה ביתית ולחם טרי. מנה פרימיום לבריאות!',
        image: 'images/sandwiches.png',
        ingredients: [
            'שניצל עוף ענק',
            'סלט יווני טרי',
            'צ\'יפס קריספי',
            'טחינה ביתית',
            'לחם טרי',
            'ירקות טריים'
        ]
    }
};

// Open modal function
function openModal(menuType) {
    const data = menuData[menuType];
    if (!data) return;
    
    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalPrice').textContent = data.price;
    document.getElementById('modalDescription').textContent = data.description;
    
    // Set ingredients
    const ingredientsList = document.getElementById('modalIngredients');
    ingredientsList.innerHTML = data.ingredients.map(ingredient => 
        `<li>${ingredient}</li>`
    ).join('');
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Event listeners
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('menu-details-btn')) {
            e.stopPropagation();
            const menuType = item.getAttribute('data-menu');
            openModal(menuType);
        }
    });
});

closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// Scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
const scrollArrow = document.querySelector('.scroll-arrow');

if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const aboutSectionTop = aboutSection.offsetTop;
            
            window.scrollTo({
                top: aboutSectionTop - navbarHeight - 0,
                behavior: 'smooth'
            });
        }
    });
}

// Hide scroll indicator when scrolled down
window.addEventListener('scroll', () => {
    if (scrollIndicator) {
        const scrollTop = window.pageYOffset;
        if (scrollTop > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
    }
}); 