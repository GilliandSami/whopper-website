import statisticsData from './datas/burger_king_statistics.json';
import { select, pack, hierarchy, forceSimulation, forceCenter, forceCollide, forceManyBody } from 'd3';

function generateIngredientsBubbleChart() {
    const width = 600;
    const height = 600;

    const bubble = data => pack()
        .size([width, height])
        .padding(3)
        (hierarchy({ children: data })
            .sum(d => d.calories));

    const svg = select('.ingredients-list')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'bubble-chart');

    const root = bubble(statisticsData.ingredients_kcal);

    const tooltip = select('.ingredients-list').append('div')
        .attr('class', 'tooltip')
        .style('visibility', 'hidden');

    const node = svg.selectAll('g')
        .data(root.leaves())
        .enter().append('g')
        .attr('transform', d => `translate(${d.x + 1}, ${d.y + 1})`)
        .on('mouseover', function (event, d) {
            select(this).selectAll('circle, image')
                .transition()
                .duration(200)
                .attr('transform', 'scale(1.1)')
                .attr('r', d.r)
                .style('opacity', 1);
            tooltip.html(`<strong>${d.data.ingredient.toUpperCase()}</strong><br>Calories: ${d.data.calories} KCal`)
                .style('visibility', 'visible')
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY + 10) + 'px')
                .transition()
                .duration(200)
                .style('opacity', 1);
        }).on('mousemove', function (event) {
            tooltip.style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY + 10) + 'px');
        })
        .on('mouseout', function () {
            select(this).selectAll('circle, image')
                .transition()
                .duration(200)
                .attr('transform', null)
                .attr('r', d => d.r)
                .style('opacity', 0.5);;
            tooltip.transition()
                .duration(500)
                .style('opacity', 0)
                .end()
                .then(() => tooltip.style('visibility', 'hidden'));
        }).on('click', function (event, d) {
            tooltip.html(`<strong>${d.data.ingredient.toUpperCase()}</strong><br>Calories: ${d.data.calories}`)
                .style('visibility', 'visible')
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY + 10) + 'px')
                .style('opacity', 1);
        });;

    node.append('circle')
        .attr('r', d => d.r)
        .style('fill-opacity', 0.7)
        .style('fill', '#c6ebc9');

    node.append('image')
        .attr('xlink:href', d => `src/img/ingredients/${d.data.image}`)
        .attr('x', d => -d.r)
        .attr('y', d => -d.r)
        .attr('height', d => 2 * d.r)
        .attr('width', d => 2 * d.r)
        .attr('clip-path', d => `circle(${d.r}px at ${d.r}px ${d.r}px)`)
        .attr('preserveAspectRatio', 'xMidYMid slice')
        .style('opacity', 0.5);

    node.append('text')
        .attr('dy', '0.3em')
        .style('text-anchor', 'middle')
        .style('fill', 'white')
        .text(d => d.data.ingredient)
        .each(function (d) {
            const textRadius = d.r - 10;
            const textLength = this.getComputedTextLength();
            const textScale = textLength < textRadius * 2 ? 1 : textRadius * 2 / textLength;
            select(this).style('font-size', `${textScale * 20}px`);
        });
}

export { generateIngredientsBubbleChart };

























































// function sortByCalories(a, b) {
//     return b.calories - a.calories;
// }

// function calculateSize(calories) {
//     const minSize = 150;
//     const maxSize = 250;
//     const minCalories = Math.min(...statisticsData.ingredients_kcal.map(i => i.calories));
//     const maxCalories = Math.max(...statisticsData.ingredients_kcal.map(i => i.calories));

//     return minSize + (calories - minCalories) / (maxCalories - minCalories) * (maxSize - minSize);
// }

// function createIngredientHTML(ingredient) {
//     const size = calculateSize(ingredient.calories);
//     const nameIngredient = ingredient.ingredient.toUpperCase();

//     return `
//         <div class="ingredient" data-calories="${ingredient.calories}">
//             <img class="ingredient-img" src="src/img/ingredients/${ingredient.image}" alt="${ingredient.ingredient}" style="width:${size}px; height:${size}px;">
//             <span class="ingredient-name">${nameIngredient}</span>
//             <span class="ingredient-kcal">${ingredient.calories} <span class="under-title-kcal">KCAL</span></span>
//         </div>
//     `;
// }

// function generateIngredientsList() {
//     const ingredientsList = statisticsData.ingredients_kcal.sort(sortByCalories).map(createIngredientHTML).join('');
//     document.querySelector('.ingredients-list').innerHTML = ingredientsList;
// }

// export { generateIngredientsList };