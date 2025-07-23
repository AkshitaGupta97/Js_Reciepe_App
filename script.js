
// The Meal DB api.

const searchBox = document.querySelector('.search-box')
const searchBtn = document.querySelector('.search-btn')
const recipeContainer = document.querySelector('.recipe-container')

const fetchRecipe = async(item) => {
    recipeContainer.innerHTML = "<h2><i>Loading...</i></h2>"
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`);
    const data = await response.json();
    console.log(data);

    recipeContainer.innerHTML = "";
    data.meals.forEach(element => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe-content');

        recipeDiv.innerHTML = `
            <img src="${element.strMealThumb}" alt="">
            <h3>${element.strMeal}</h3>
            <p>${element.strArea}</p>
            <p>${element.strCategory}</p>
        `
        recipeContainer.appendChild(recipeDiv)
    });


}



searchBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const searchInput = searchBox.value.trim();
    fetchRecipe(searchInput);

})




