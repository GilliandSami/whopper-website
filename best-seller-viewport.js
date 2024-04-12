import * as d3 from 'd3';

// Fonction pour extraire les données pour les pairings alimentaires
function extractFoodPairings(jsonData) {
    return jsonData.food_pairings
        .filter(pairing => {
            return ['Classic Hamburger', 'Chicken Nuggets', 'French Fries', 'Classic Cheeseburger'].includes(pairing.item);
        })
        .map(pairing => ({
            item: pairing.item,
            percentage: pairing.percentage
        }));
}

function GenerateLoadFood() {
    fetch('../datas/burger_king_statistics.json') // Assurez-vous que ce chemin est correct
        .then(response => response.json())
        .then(jsonData => {
            const foodData = extractFoodPairings(jsonData);

            // Configuration initiale de SVG
            const margin = { top: 20, right: 50, bottom: 30, left: 50 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            // Création et insertion de SVG dans .graph-percentage-menus
            const svg = d3.select(".graph-percentage-menus")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            // Définition des échelles
            const y = d3.scaleBand()
                .range([height, 0])
                .padding(0.1)
                .domain(foodData.map(d => d.item));

            const x = d3.scaleLinear()
                .range([0, width])
                .domain([0, d3.max(foodData, d => d.percentage)]);

            // Ajout des barres
            svg.selectAll(".bar")
                .data(foodData)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", 0)
                .attr("y", d => y(d.item))
                .attr("width", d => x(d.percentage))
                .attr("height", y.bandwidth())
                .attr("fill", "#F4EBDC");

            // Ajout de texte pour les étiquettes et les noms
            svg.selectAll(".label")
                .data(foodData)
                .enter().append("text")
                .attr("class", "label")
                .attr("x", d => x(d.percentage) + 5)
                .attr("y", d => y(d.item) + y.bandwidth() / 2)
                .attr("dy", ".35em")
                .text(d => `${d.percentage}%`);

            svg.selectAll(".food-name")
                .data(foodData)
                .enter().append("text")
                .attr("class", "food-name")
                .attr("x", -5)
                .attr("y", d => y(d.item) + y.bandwidth() / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "end")
                .text(d => d.item);
        });
}

export { extractFoodPairings, GenerateLoadFood };