import * as d3 from 'd3';
import countriesData from './datas/countries_population.json';

export function drawPoints() {
    var svg = d3.select(".point-chart-svg").empty()
        ? d3.select("body").append("svg").attr("class", "point-chart-svg")
        : d3.select(".point-chart-svg");

    svg.attr("width", 2000)
        .attr("height", 2200);

    // var xScale = d3.scaleLinear()
    //                .domain([0   , d3.max(countriesData, d => d['whopper-per-person'])])
    //                .range([0, 800]);

    var yScale = d3.scaleBand()
        .domain(countriesData.map(d => d.populationSvg))
        .range([0, 600])
        .padding(0.1);

    var groups = svg.selectAll("g")
        .data(countriesData)
        .enter()
        .append("g")
        .attr("transform", ((d, i) => `translate(250, ${i * 550 + 90})`));

    function createPoints(group, d) {
        const pointsPerLine = 17;
        for (let i = 0; i < d['whopper-per-person']; i++) {
            const xPos = (i % pointsPerLine) * 50;
            const yPos = (Math.floor(i / pointsPerLine) * 50) + yScale.bandwidth() / 1.4;
            group.append("circle")
                .attr("cx", xPos)
                .attr("cy", yPos)
                .attr("r", 15)
                .attr("fill", "#F4EBDC")
                .style("opacity", 0)
                .transition()
                .duration(1000)
                .style("opacity", 1);
        }
    }


    groups.each(function (d) {
        createPoints(d3.select(this), d);
    });

    var fontSizeScale = d3.scaleLinear()
        .domain([0, d3.max(countriesData, d => d['whopper-per-person'])])
        .range([10, 20]); // Taille de police minimale et maximale souhaitée

    groups.append("text")
        .attr("x", 0)
        .attr("y", 50)
        .attr("font-size", d => fontSizeScale(d['whopper-per-person']) * 5)
        .attr("fill", "#F4EBDC")
        .attr("font-weight", "bold")
        .attr("font-family", "var(--primary-font);")
        .text(d => d.rapport)
        .transition()
        .duration(1000)
        .attr("y", -50);

    groups.append("image")
        .attr("xlink:href", d => d.populationSvg)
        .attr("x", 0)
        .attr("y", 150)
        .attr("width", 300)
        .attr("height", 300)
        .transition()
        .duration(1000)
        .attr("y", -150);

    groups.append("image")
        .attr("xlink:href", d => d.svg)
        .attr("x", 850)
        .attr("y", 100)
        .attr("width", 300)
        .attr("height", 300)
        .transition()
        .duration(1000)
        .attr("y", -100);

}