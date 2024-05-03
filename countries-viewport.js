import * as d3 from 'd3';
import countriesData from './datas/countries_population.json';

export function drawPoints() {
    // Sélectionnez l'élément SVG ou créez-en un nouveau
    var svg = d3.select(".point-chart-svg").empty() 
                 ? d3.select("body").append("svg").attr("class", "point-chart-svg") 
                 : d3.select(".point-chart-svg");

    // Définissez les dimensions du SVG
    svg.attr("width", 900)
       .attr("height", 900);

    // Création d'une échelle pour positionner les points horizontalement
    var xScale = d3.scaleLinear()
                   .domain([0, d3.max(countriesData, d => d['whopper-per-person'])])
                   .range([0, 800]);

    // Création d'une échelle pour positionner les pays verticalement
    var yScale = d3.scaleBand()
                   .domain(countriesData.map(d => d.name))
                   .range([0, 600])
                   .padding(0.1);

    // Création des groupes pour chaque pays
    var groups = svg.selectAll("g")
                    .data(countriesData)
                    .enter()
                    .append("g")
                    .attr("transform", d => `translate(0, ${yScale(d.name)})`);

    // Fonction pour créer les points pour chaque pays
    function createPoints(group, d) {
        const pointsPerLine = 17; // Nombre de points par ligne
        for (let i = 0; i < d['whopper-per-person']; i++) {
            const xPos = (i % pointsPerLine) * 50; // Espace de 20 pixels entre les points
            const yPos = (Math.floor(i / pointsPerLine) * 50) + yScale.bandwidth() / 2;
            group.append("circle")
                 .attr("cx", xPos)
                 .attr("cy", yPos)
                 .attr("r", 15) // Rayon des cercles
                 .attr("fill", "white");
        }
    }

    // Créer les points pour chaque groupe
    groups.each(function(d) {
        createPoints(d3.select(this), d);
    });

    // Ajouter le texte et l'image pour chaque pays
    groups.append("text")
          .attr("x", 0)
          .attr("y", d => yScale.bandwidth() / 2)
          .attr("dy", "0.35em") // Centrer verticalement le texte
          .attr("font-size", "10px") // Taille de la police du texte
          .text(d => `${d.name}`);

    groups.append("image")
          .attr("xlink:href", d => d.svg)
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 50)
          .attr("height", 50);
}