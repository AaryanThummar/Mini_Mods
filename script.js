// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

// Slider Functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
let currentSlide = 0;
let isAutoPlaying = true;
let slideInterval;

// Initialize slider
function initSlider() {
  // Set first slide as active
  slides[0].classList.add('active');
  dots[0].classList.add('active');
  
  // Start autoplay
  startAutoPlay();
}

// Go to specific slide
function goToSlide(index) {
  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Add active class to current slide and dot
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  
  // Update current slide index
  currentSlide = index;
  
  // Reset autoplay timer when manually changing slides
  if (isAutoPlaying) {
    resetAutoPlay();
  }
}

// Next slide
function nextSlide() {
  const next = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
  goToSlide(next);
}

// Previous slide
function prevSlide() {
  const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
  goToSlide(prev);
}

// Start autoplay
function startAutoPlay() {
  isAutoPlaying = true;
  slideInterval = setInterval(nextSlide, 5000);
}

// Reset autoplay
function resetAutoPlay() {
  clearInterval(slideInterval);
  startAutoPlay();
}

// Stop autoplay
function stopAutoPlay() {
  isAutoPlaying = false;
  clearInterval(slideInterval);
}

// Event listeners
prevArrow.addEventListener('click', prevSlide);
nextArrow.addEventListener('click', nextSlide);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
  });
});

// Add hover event listeners to slider to pause autoplay
const sliderElement = document.querySelector('.slider');
sliderElement.addEventListener('mouseenter', stopAutoPlay);
sliderElement.addEventListener('mouseleave', startAutoPlay);

// Add click event listeners to product buttons
const addToCartButtons = document.querySelectorAll('.product-footer .btn');
addToCartButtons.forEach(button => {
  button.addEventListener('click', function() {
    const cartCount = document.querySelectorAll('.cart-count');
    cartCount.forEach(count => {
      count.textContent = parseInt(count.textContent) + 1;
    });
    
    // Add animation effect
    button.classList.add('clicked');
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 300);
  });
});

// Add click event listeners to wishlist buttons
const wishlistButtons = document.querySelectorAll('.wishlist-btn');
wishlistButtons.forEach(button => {
  button.addEventListener('click', function() {
    this.classList.toggle('active');
    const heartIcon = this.querySelector('svg path');
    
    if (this.classList.contains('active')) {
      heartIcon.setAttribute('fill', '#ef4444');
    } else {
      heartIcon.setAttribute('fill', 'none');
    }
  });
});

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Initialize slider on page load
document.addEventListener('DOMContentLoaded', initSlider);