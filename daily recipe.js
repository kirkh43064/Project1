const get_meal_btn = document.getElementById("get_meal");
const meal_container = document.getElementById("meal");




get_meal_btn.addEventListener("click", () => {

    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(res => {
            createMeal(res.meals[0]);
        })
        .catch(e => {
            console.warn(e);
        });
});


const createMeal = (meal) => {
    console.log(meal)
    const ingredients = [];
    let content = `<h1>${meal.strMeal}</h1>`;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] !== "") {
            ingredients.push(
                `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`
            );} 
        else {
            break;
        }
    }
    content += `<img src=${meal.strMealThumb}/>`;
    content += `<h1>Ingredients</h1>`;
    content += `<ul>${ingredients.join("")}</ul>`;
    content += `<h2>Instructions</h2>`;
    content += `<p>${meal.strInstructions.replace("\r\n" , "<br/><br/>")}</p>`;
    meal_container.innerHTML = content;


}
