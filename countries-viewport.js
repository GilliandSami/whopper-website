import * as d3 from 'd3';
import countriesData from './datas/countries_population.json';

export function drawPoints() {
    // Sélectionnez l'élément SVG ou créez-en un nouveau
    var svg = d3.select(".point-chart-svg").empty()
        ? d3.select("body").append("svg").attr("class", "point-chart-svg")
        : d3.select(".point-chart-svg");

    // Définissez les dimensions du SVG
    svg.attr("width", 2000)
       .attr("height", 2200);

    // Création d'une échelle pour positionner les points horizontalement
    var xScale = d3.scaleLinear()
                   .domain([0   , d3.max(countriesData, d => d['whopper-per-person'])])
                   .range([0, 800]);

    // Création d'une échelle pour positionner les pays verticalement
    var yScale = d3.scaleBand()
                   .domain(countriesData.map(d => d.populationSvg))
                   .range([0, 600])
                   .padding(0.1);

    // Création des groupes pour chaque pays
    var groups = svg.selectAll("g")
                    .data(countriesData)
                    .enter()
                    .append("g")
                    .attr("transform", ((d, i) => `translate(250, ${i*550+90})`));

    // Fonction pour créer les points pour chaque pays
    function createPoints(group, d) {
        const pointsPerLine = 17; // Nombre de points par ligne
        for (let i = 0; i < d['whopper-per-person']; i++) {
            const xPos = (i % pointsPerLine) * 50; // Espace de 20 pixels entre les points
            const yPos = (Math.floor(i / pointsPerLine) * 50) + yScale.bandwidth() / 1.4;
            group.append("circle")
                 .attr("cx", xPos)
                 .attr("cy", yPos)
                 .attr("r", 15) // Rayon des cercles
                 .attr("fill", "#F4EBDC");
        }
    }

    // Créer les points pour chaque groupe
    groups.each(function(d) {
        createPoints(d3.select(this), d);
    });

// Créer une échelle pour mapper le nombre de points à une taille de police
var fontSizeScale = d3.scaleLinear()
    .domain([0, d3.max(countriesData, d => d['whopper-per-person'])])
    .range([10, 20]); // Taille de police minimale et maximale souhaitée

// Ajouter du texte à chaque groupe de données avec une taille de police dynamique
groups.append("text")
    .attr("x", 0) // Ajustez la position horizontale du texte
    .attr("y", -50) // Ajustez la position verticale du texte
    .attr("font-size", d => fontSizeScale(d['whopper-per-person'])*5) // Taille de police dynamique
    .attr("fill", "#F4EBDC") // Couleur du texte
    .attr("font-weight", "bold")
    .attr("font-family", "var(--primary-font);")
    .text(d => d.rapport); // Contenu texte basé sur les données de votre JSON


    // Ajouter le texte et l'image pour chaque pays
    groups.append("image")
      .attr("href", d => d.populationSvg)
      .attr("x", 0)
      .attr("y", -150)
      .attr("width", 300)
      .attr("height", 300);

    groups.append("image")
          .attr("xlink:href", d => d.svg)
          .attr("x", 850)
          .attr("y", -100)
          .attr("width", 300)
          .attr("height", 300);
}