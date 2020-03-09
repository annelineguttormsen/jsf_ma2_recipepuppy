let recipes;
let queryRecipes;

const recipeArticles = document.querySelector(".recipe__articles");

fetch("https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/")
	.then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }

      response.json().then(function(data) {
        recipes = data.results;
        for (let i in recipes) {
        	recipeArticles.innerHTML += Recipe(recipes[i]);
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });


document.body.addEventListener("submit", (event) => {
	event.preventDefault();
	let query = event.target.elements[0].value;
	queryRecipes = recipes.filter((i)=>{
		if (i.ingredients.indexOf(query) !== -1) {
			return i;
		}
	});
	recipeArticles.innerHTML = "";
	for (let i in recipes) {
    	recipeArticles.innerHTML += Recipe(queryRecipes[i]);
    }
});

function Recipe(props) {
	return `
	<article>
		<h2>${props.title}</h2>
		<img src="${props.thumbnail}">
		<h3>Ingredients:</h3>
		<p>${props.ingredients}</p>
	</article>
	`;
}