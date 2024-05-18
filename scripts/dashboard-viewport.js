function updateDataElement(selector, data) {
    document.querySelector(selector).textContent = data;
}

function countBurgers() {
    let whopperCount = 0;
    let tomatoCount = 0;
    let onionCount = 0;
    let pickleCount = 0;
    let saladCount = 0;

    function updateCounts() {
        const refreshRate = 23;
        const incrementsPerRefresh = refreshRate / 1000;

        whopperCount += 42 * incrementsPerRefresh;
        tomatoCount += 42 * 2 * incrementsPerRefresh;
        onionCount += 42 * 3 * incrementsPerRefresh;
        pickleCount += 42 * 4 * incrementsPerRefresh;
        saladCount += 42 * 1 * incrementsPerRefresh;

        updateDataElement('.datas-prepared_whopper .number', Math.floor(whopperCount).toLocaleString());
        updateDataElement('.datas-tomatos .number', Math.floor(tomatoCount).toLocaleString());
        updateDataElement('.datas-salads .number', Math.floor(saladCount).toLocaleString());
        updateDataElement('.datas-onions .number', Math.floor(onionCount).toLocaleString());
        updateDataElement('.datas-pickles .number', Math.floor(pickleCount).toLocaleString());
    }

    setInterval(updateCounts, 23);
}

function startTimer() {
    let secondsElapsed = 0;

    function updateTimer() {
        secondsElapsed++;

        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        const formattedTime = `${minutes}min ${seconds < 10 ? '0' : ''}${seconds}s`;

        updateDataElement('.datas-timer .time', formattedTime);
    }

    setInterval(updateTimer, 1000);
}

export function initializeDashboard() {
    countBurgers();
    startTimer();
}