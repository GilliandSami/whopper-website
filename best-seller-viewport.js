import * as d3 from 'd3';

// Fonction pour extraire les données pour les pairings alimentaires
function extractFoodPairings(jsonData) {
    return jsonData.food_pairings
        .filter(pairing => ['Classic Hamburger', 'Chicken Nuggets', 'French Fries', 'Classic Cheeseburger'].includes(pairing.item))
        .map(pairing => ({
            item: pairing.item,
            percentage: pairing.percentage,
            image: pairing.image || null
        }));
}

function drawScrollLine() {
    const section = d3.select('.best_seller-section');
    let svgContainer = section.select('.line-chart-svg');
    const impactElement = document.querySelector('.impact-sales');

    const height = 1000;

    if (svgContainer.empty()) {
        svgContainer = section.append('svg')
            .attr('width', '100%')
            .attr('height', height * 1)
            .attr('class', 'line-chart-svg');
    }

    const line = svgContainer.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', height)
        .attr('stroke', getComputedStyle(document.documentElement).getPropertyValue('--text-icons-color'))
        .attr('stroke-width', 10)
        .attr('stroke-dasharray', height)
        .attr('stroke-dashoffset', height);

    function updateLine() {
        const scrollPosition = window.pageYOffset + window.innerHeight;
        const impactPosition = impactElement.getBoundingClientRect().top + window.pageYOffset;
        const height = line.node().getBoundingClientRect().height;
        const scrollPercentage = (scrollPosition - impactPosition) / height;
        const newOffset = Math.max(height - (height * scrollPercentage * 0.8), 0);
        line.attr('stroke-dashoffset', newOffset);

        // Vérifier si la ligne est complètement révélée
        if (newOffset === 0 && svgContainer.select('circle').empty()) {
            // Supprimer l'écouteur d'événement de défilement une fois que la ligne est complètement déployée
            window.removeEventListener('scroll', updateLine);                // Ajouter un cercle seulement s'il n'existe pas déjà
            const circle = svgContainer.append('circle')
                .attr('cx', 0)  // Coordonnée x du centre du cercle
                .style('position', "absolute")
                .attr('cy', 1000)  // Coordonnée y du centre du cercle
                .attr('r', 0.5)  // Commencez avec un rayon de 0 pour être invisible
                .attr('fill', getComputedStyle(document.documentElement).getPropertyValue('--text-icons-color'));  // Couleur du cercle

            // Animer le cercle pour agrandir de 0 à une taille spécifique
            circle.transition()
                .duration(1000)  // Durée de l'animation
                .attr('r', 30);  // Rayon final du cercle
        }
    }


    window.addEventListener('scroll', updateLine);
}

function animateBars(bars, x) {
    bars.transition()
        .duration(1200)
        .ease(d3.easeCubic)
        .attr("width", d => x(d.percentage)); // Animer la largeur jusqu'à la valeur finale
}

function setupBarsAnimation(svg, x) {
    const target = document.querySelector('.impact-sales');
    const bars = svg.selectAll(".bar"); // Assurez-vous que les barres sont sélectionnées ici après leur création

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBars(bars, x);
                observer.unobserve(entry.target); // Arrêter l'observation après l'animation
            }
        });
    }, { threshold: 0.5 });

    observer.observe(target);
}

function GenerateLoadFood() {
    fetch('../datas/burger_king_statistics.json')
        .then(response => response.json())
        .then(jsonData => {
            const foodData = extractFoodPairings(jsonData);

            const margin = { top: 20, right: 50, bottom: 30, left: 50 },
                width = 660 - margin.left - margin.right,
                height = 600 - margin.top - margin.bottom;

            const svg = d3.select(".graph-percentage-menus")
                .append("svg")
                .attr("width", width + margin.left + margin.right + 600)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            const y = d3.scaleBand()
                .range([height, 0])
                .paddingInner(0.3)
                .domain(foodData.map(d => d.item));

            const x = d3.scaleLinear()
                .range([0, width * 0.8])
                .domain([0, d3.max(foodData, d => d.percentage)]);

            svg.selectAll(".bar")
                .data(foodData)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", 0)
                .attr("y", d => y(d.item))
                .attr("width", 0) // Largeur initiale à 0 pour l'animation
                .attr("height", y.bandwidth())
                .attr("fill", "#F4EBDC");

            // Setup de l'animation une fois que tout est prêt
            setupBarsAnimation(svg, x);

            svg.selectAll(".label")
                .data(foodData)
                .enter().append("text")
                .attr("class", "label")
                .attr("x", d => x(d.percentage) + 10)
                .attr("font-size", "18px")
                .attr("y", d => y(d.item) + y.bandwidth() / 2)
                .attr("dy", ".35em")
                .text(d => `${Math.round(d.percentage)}%`);

            svg.selectAll(".food-image")
                .data(foodData)
                .enter().append("image")
                .attr("xlink:href", d => `../src/img/${d.image}`)
                .attr("x", width + margin.right + 400)
                .attr("y", d => y(d.item) + -10)
                .attr("width", 150)
                .attr("height", 150);

            svg.selectAll(".food-name")
                .data(foodData)
                .enter().append("text")
                .attr("class", "food-name")
                .attr("font-size", "24px")
                .attr("text-anchor", "end")
                .attr("x", 1000)
                .attr("y", d => y(d.item) + y.bandwidth() / 2 + 10)
                .each(function (d) {
                    const text = d3.select(this);
                    const words = d.item.toUpperCase().split(/\s+/);
                    text.append("tspan")
                        .attr("x", 900)
                        .attr("dy", "-0.6em")
                        .text(words[0]);
                    if (words.length > 1) {
                        text.append("tspan")
                            .attr("x", 900)
                            .attr("dy", "1.2em")
                            .text(words.slice(1).join(" "));
                    }
                });

        });

    drawScrollLine(); // Assurez-vous que cette fonction est définie ailleurs
}

export { extractFoodPairings, GenerateLoadFood };
