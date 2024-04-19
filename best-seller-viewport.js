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
                width = 560 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            // Création et insertion de SVG dans .graph-percentage-menus
            const svg = d3.select(".graph-percentage-menus")
                .append("svg")
                .attr("width", width + margin.left + margin.right + 1000)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            // Définition des échelles
            const y = d3.scaleBand()
                .range([height, 0])
                .paddingInner(0.3)
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
                .text(d => `${Math.round(d.percentage)}%`); 
                
            svg.selectAll(".food-name")
                .data(foodData)
                .enter().append("text")
                .attr("class", "food-name")
                .attr("x", + 900)
                .attr("y", d => y(d.item) + y.bandwidth() / 2 + (y.paddingInner() * y.step() / 2)) // Centre le texte verticalement avec le padding
                .attr("dy", "0.35em")
                .attr("text-anchor", "end")
                .each(function (d) {
                    var text = d3.select(this),
                        words = d.item.split(/\s+/), // Séparation du texte en mots
                        n = words.length; // Nombre de mots
                    text.text(''); // Efface le texte existant
                    
                    // Ajoute le premier mot ou les premiers mots si le texte a plus d'un mot
                    text.append("tspan")
                        .attr("x", 750) // Doit correspondre à l'attribut x du texte parent
                        .attr("dy", n > 1 ? "-0.7em" : "0em") // Ajuste la position verticale du premier tspan
                        .text(words[0]);
            
                    // Ajoute le deuxième mot dans un nouveau tspan si le texte a plus d'un mot
                    if (n > 1) {
                        text.append("tspan")
                            .attr("x", 750) // Doit correspondre à l'attribut x du texte parent
                            .attr("dy", "1.4em") // Ajuste la position verticale du deuxième tspan
                            .attr("dx", "0em") // Ajuste la position horizontale du deuxième tspan si nécessaire
                            .text(words[1]);
                    } 
        });
    });
}

export { extractFoodPairings, GenerateLoadFood };