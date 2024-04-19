import statisticsData from './datas/burger_king_statistics.json';

function sortByCalories(a, b) {
    return b.calories - a.calories;
}

function calculateSize(calories) {
    const minSize = 150;
    const maxSize = 250;
    const minCalories = Math.min(...statisticsData.ingredients_kcal.map(i => i.calories));
    const maxCalories = Math.max(...statisticsData.ingredients_kcal.map(i => i.calories));

    return minSize + (calories - minCalories) / (maxCalories - minCalories) * (maxSize - minSize);
}

function createIngredientHTML(ingredient) {
    const size = calculateSize(ingredient.calories);
    const nameIngredient = ingredient.ingredient.toUpperCase();

    return `
        <div class="ingredient" data-calories="${ingredient.calories}">
            <img class="ingredient-img" src="src/img/ingredients/${ingredient.image}" alt="${ingredient.ingredient}" style="width:${size}px; height:${size}px;">
            <span class="ingredient-name">${nameIngredient}</span>
            <span class="ingredient-kcal">${ingredient.calories} <span class="under-title-kcal">KCAL</span></span>
        </div>
    `;
}

function generateIngredientsList() {
    const ingredientsList = statisticsData.ingredients_kcal.sort(sortByCalories).map(createIngredientHTML).join('');
    document.querySelector('.ingredients-list').innerHTML = ingredientsList;
}

export { generateIngredientsList };