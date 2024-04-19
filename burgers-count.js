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

export { countBurgers };