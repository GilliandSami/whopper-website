import * as d3 from 'd3';
import countriesData from './datas/countries_population.json';

export function drawPoints() {
    // Utilisation des données importées directement
    var data = countriesData;

    // Sélection de l'élément SVG
    var svg = d3.select(".point-chart-svg");

    // Définition des échelles x et y
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d['whopper-per-person'])]) // Échelle basée sur 'whopper-per-person'
        .range([0, 800]);

    var yScale = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, 600])
        .padding(0.1);

    // Création d'un groupe pour chaque pays
    var groups = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", d => `translate(0, ${yScale(d.name)})`);

    // Fonction pour créer des points pour chaque valeur 'whopper-per-person'
    function createPoints(group, d) {
        const pointsPerLine = 17;
        const lines = Math.ceil(d['whopper-per-person'] / pointsPerLine);
        const lineHeight = yScale.bandwidth() / lines;

        for (let i = 0; i < d['whopper-per-person']; i++) {
            const lineIndex = Math.floor(i / pointsPerLine);
            const xOffset = (i % pointsPerLine) * 30; // Augmentation de l'espacement entre les points
            group.append("circle")
                .attr("cx", xOffset) // Position sur l'axe x basée sur l'itération et l'index de ligne
                .attr("cy", lineHeight * lineIndex + lineHeight /2) // Position verticalement basée sur l'index de ligne
                .attr("r", 5) // Rayon du cercle
                .attr("fill", "white"); // Couleur du cercle
        }
    }

    // Ajout de points pour chaque pays
    groups.each(function(d) {
        createPoints(d3.select(this), d);
    });

    // Ajout d'éléments de texte pour le nom et 'whopper-per-person'
    groups.append("text")
        .attr("x", 0) // Positionnement à gauche
        .attr("y", d => yScale.bandwidth() / 2) // Positionnement au-dessus des points
        .attr("dy", "-0.5em") // Ajustement pour s'assurer que le texte est au-dessus des points
        .text(d => `${d.name}`);

    // Ajout d'un élément image pour l'image SVG
    groups.append("image")
        .attr("xlink:href", d => d.svg)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 50)
        .attr("height", 50);
}
