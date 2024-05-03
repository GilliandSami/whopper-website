function countBurgers() {
    const numberElement = document.querySelector('.number-interaction');
    let number = 0;

    function updateNumber() {
        number += 1;
        numberElement.textContent = number;
    }

    updateNumber();
    setInterval(updateNumber, 23);
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function setupCounterAnimation() {
    const target = document.querySelector('.percentage-whopper');
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(target, 0, 40, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    observer.observe(target);
}

function setupCaloriesAnimation() {
    const target = document.querySelector('#calorie-count'); // cibler seulement le span
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(target, 0, 640, 1500);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // déclenche l'animation lorsque 50% de l'élément est visible
    });
    observer.observe(target);
}

function setupHandWhopperAnimation() {
    const handWhopper = document.querySelector('.hand-whopper');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInFromRight 1s ease-out forwards';
                observer.unobserve(entry.target); // Arrête l'observation après que l'animation se soit déclenchée
            }
        });
    }, {
        threshold: 0.2 // L'animation se déclenche lorsque 50% de l'image est visible
    });

    observer.observe(handWhopper);
}


export { countBurgers, setupCounterAnimation, setupCaloriesAnimation, setupHandWhopperAnimation };