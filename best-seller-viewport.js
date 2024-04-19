import * as d3 from 'd3';

// Fonction pour extraire les données pour les pairings alimentaires
function extractFoodPairings(jsonData) {
    return jsonData.food_pairings
        .filter(pairing => {
            return ['Classic Hamburger', 'Chicken Nuggets', 'French Fries', 'Classic Cheeseburger'].includes(pairing.item);
        })
        .map(pairing => ({
            item: pairing.item,
            percentage: pairing.percentage,
            image: pairing.image || null

        }));
}

function GenerateLoadFood() {
    fetch('../datas/burger_king_statistics.json') // Assurez-vous que ce chemin est correct
        .then(response => response.json())
        .then(jsonData => {
            const foodData = extractFoodPairings(jsonData);

            // Configuration initiale de SVG
            const margin = { top: 20, right: 50, bottom: 30, left: 50 },
                width = 660 - margin.left - margin.right,
                height = 600 - margin.top - margin.bottom;

            // Création et insertion de SVG dans .graph-percentage-menus
            const svg = d3.select(".graph-percentage-menus")
                .append("svg")
                .attr("width", width + margin.left + margin.right + 600)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            // Définition des échelles
            const y = d3.scaleBand()
                .range([height, 0])
                .paddingInner(0.3)
                .domain(foodData.map(d => d.item));

            const x = d3.scaleLinear()
                .range([0, width * 0.8])
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
                .attr("x", d => x(d.percentage) + 10)
                .attr("font-size", "18px") // Augmentez la taille du texte ici
                .attr("y", d => y(d.item) + y.bandwidth() / 2)
                .attr("dy", ".35em")
                .text(d => `${Math.round(d.percentage)}%`); 
                
            svg.selectAll(".food-image")
                .data(foodData)
                .enter().append("image")
                .attr("xlink:href", d => `../src/img/${d.image}`)  
                .attr("x", width + margin.right + 400)
                .attr("y", d => y(d.item)+ -10)
                .attr("width", 150 )  // Largeur de l'image
                .attr("height", 150);  // Hauteur de l'image correspondant à la hauteur de la barre

                svg.selectAll(".food-name")
                .data(foodData)
                .enter().append("text")
                .attr("class", "food-name")
                .attr("font-size", "24px") // Ajustez la taille de la police ici selon vos besoins
                .attr("text-anchor", "end")
                .attr("x", 1000) // Position en x pour le texte
                .attr("y", d => y(d.item) + y.bandwidth() / 2 +10) // Alignement vertical au milieu de la bande
                .each(function(d) {
                    var text = d3.select(this);
                    var words = d.item.toUpperCase().split(/\s+/); // Convertit le texte en majuscules et sépare les mots
                    // Ajoutez le premier mot
                    text.append("tspan")
                        .attr("x", 900)
                        .attr("dy", "-0.6em") // Déplacement vers le haut pour aligner les tspans
                        .text(words[0]);
                    
                    // Ajoutez le deuxième mot, si présent
                    if (words.length > 1) {
                        text.append("tspan")
                            .attr("x", 900)
                            .attr("dy", "1.2em") // Positionnement du deuxième tspan directement sous le premier
                            .text(words.slice(1).join(" ")); // Rejoignez le reste des mots au cas où il y a plus de deux
                    }
                });
            

            
    });
}

export { extractFoodPairings, GenerateLoadFood };