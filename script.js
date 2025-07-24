
// The Meal DB api.

const searchBox = document.querySelector('.search-box')
const searchBtn = document.querySelector('.search-btn')
const recipeContainer = document.querySelector('.recipe-container')
const recipePopContent = document.querySelector('.recipe-detail-content');
const recipePopBtn = document.querySelector('.close-pop-btn')

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
            <p><span>${element.strArea}</span> Dish</p>
            <p><span>${element.strCategory}</span> Category</p>
        `
        const button = document.createElement('button')
        button.textContent = "View Recipe";

        // Adding event linstener to button

        button.addEventListener('click', () => {
            openPopUp(element);
        })



        recipeDiv.appendChild(button);

        recipeContainer.appendChild(recipeDiv)
    });


}

const openPopUp = (elem) => {
    recipePopContent.innerHTML = `
        <h3>${elem.strMeal}</h3>
        <p><span>Ingredients:</span></p>
        <ul>${popIngredients(elem)}</ul>
    `
    recipePopContent.parentElement.style.display = 'block';  // its parentElement is "recipe-detail-pop"

}
// fetching ingredients
const popIngredients = () => {

}



searchBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const searchInput = searchBox.value.trim();
    fetchRecipe(searchInput);

})




