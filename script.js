
// The Meal DB api.

const searchBox = document.querySelector('.search-box')
const searchBtn = document.querySelector('.search-btn')
const recipeContainer = document.querySelector('.recipe-container')
const recipePopContent = document.querySelector('.recipe-detail-content');
const recipeClosePopBtn = document.querySelector('.close-pop-btn')

const fetchRecipe = async(item) => {
    recipeContainer.innerHTML = "<h2><i>Loading...</i></h2>"
    
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`);
        const data = await response.json();
        // console.log(data);

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
    catch(error){
        recipeContainer.innerHTML = `<h2>Error in Fetching Recipe. Try again...`
    }


}

const openPopUp = (elem) => {
    recipePopContent.innerHTML = `
        <h3 class="recipe-head">${elem.strMeal}</h3>
        <p class="recipe-topic">Ingredients:</p>
        <ul id="ingredientList">${popIngredients(elem)}</ul>

        <div class="recipe-instruction">
            <p class="recipe-topic">Instructions : </p>
            <p>${elem.strInstructions}</p>
        </div>
    `

    recipePopContent.parentElement.style.display = 'block';  // its parentElement is "recipe-detail-pop"

}
// fetching ingredients
const popIngredients = (ele) => {
    console.log(ele);
    let ingredientsList = "";
    // we are running the loop 20 time because there is 20 ingredient and measure items in our api
    for(let i=1;i<=20;i++){
        const ingredient = ele[`strIngredient${i}`];

        if(ingredient){
            const measure = ele[`strMeasure${i}`];

            ingredientsList += `<li>${measure} - ${ingredient}</li>`;
        }
        else {
            break; // here we break the loop, if the ingredient is not present after 14 or 15 then just break it.
        }
    }
    return ingredientsList;
}

recipeClosePopBtn.addEventListener('click', () => {
    recipePopContent.parentElement.style.display = 'none'; // after clicking in the cross button just close the popUp 
})


searchBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const searchInput = searchBox.value.trim();

    if(!searchInput){   // done this because when we click on search btn even after entering the dish we get random items, also do return,
        recipeContainer.innerHTML = `<h2> <i>Please search your meal <i>!`
        recipeContainer.style.color = "rgb(148, 231, 228)";
        return;
    }

    fetchRecipe(searchInput);

})




