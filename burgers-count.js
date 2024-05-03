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


export { countBurgers, setupCounterAnimation };