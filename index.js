
        function showMenu() {
    document.getElementById("navLinks").style.top = "0";
}

function hideMenu() {
    document.getElementById("navLinks").style.top = "-70%";
}

//preloader//
window.addEventListener('load', function() {
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    }, 1000); // Delay in milliseconds (1000ms = 1 seconds)
});
    
// JavaScript for animated numbers
           // JavaScript for animated numbers with Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".number");
    let observer;

    // Function to update the counter
    const updateCounter = counter => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;
        const increment = target / 200;

        if (current < target) {
            counter.innerText = `${Math.ceil(current + increment)}`;
            setTimeout(() => updateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    // Intersection Observer callback
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                updateCounter(counter);
                observer.unobserve(counter); // Stop observing once the counter starts
            }
        });
    };

    // Create the Intersection Observer
    observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe each counter
    counters.forEach(counter => {
        observer.observe(counter);
    });
});
// serivce silders//
document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.cards-container');
    const cards = document.querySelectorAll('.card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let startX = null;
    let slideWidth = calculateSlideWidth(); // Initial calculation
    let cardsPerSlide = calculateCardsPerSlide(); // Initial calculation
    let delayTimer = null;

    function calculateSlideWidth() {
        return cards[0].clientWidth + 20; // Including margin
    }

    function calculateCardsPerSlide() {
        return window.innerWidth <= 700 ? 1 : 3;
    }

    function showSlide(index) {
        cardsContainer.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function nextSlide() {
        if (currentIndex < Math.ceil(totalCards / cardsPerSlide) - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        showSlide(currentIndex);
    }

    function startDelayTimer() {
        delayTimer = setTimeout(function () {
            nextSlide();
            delayTimer = null;
        }, 6000); // Delay for 6 seconds
    }

    function clearDelayTimer() {
        if (delayTimer) {
            clearTimeout(delayTimer);
            delayTimer = null;
        }
    }

    setInterval(function() {
        if (!delayTimer) {
            nextSlide();
            startDelayTimer();
        }
    }, 6000); // Change slide every 6 seconds

    cardsContainer.addEventListener('touchstart', touchStart);
    cardsContainer.addEventListener('touchmove', touchMove);

    function touchStart(event) {
        startX = event.touches[0].clientX;
        clearDelayTimer();
    }

    function touchMove(event) {
        if (!startX) return;
        let moveX = event.touches[0].clientX - startX;
        if (Math.abs(moveX) < 50) return; // Adjust sensitivity as needed

        if (moveX > 0) {
            // Swiped right
            currentIndex = currentIndex > 0 ? currentIndex - 1 : totalCards - 1;
        } else {
            // Swiped left
            currentIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : 0;
        }
        showSlide(currentIndex);
        startX = null;
        startDelayTimer();
    }

    window.addEventListener('resize', function () {
        slideWidth = calculateSlideWidth(); // Recalculate slide width on resize
        cardsPerSlide = calculateCardsPerSlide(); // Recalculate cards per slide on resize
        currentIndex = 0; // Reset index on resize
        showSlide(currentIndex);
    });

    // Initial slide adjustment
    showSlide(currentIndex);
    startDelayTimer(); // Start initial delay timer
});


    
    