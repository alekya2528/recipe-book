const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

function addRecipe(event) {
    event.preventDefault();

    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const steps = document.getElementById('steps').value;
    const imageFile = document.getElementById('image').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const recipe = {
            name,
            ingredients,
            steps,
            image: e.target.result,
        };

        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
        document.getElementById('recipe-form').reset();
    };
    reader.readAsDataURL(imageFile);
}

function displayRecipes() {
    const container = document.getElementById('recipes-container');
    container.innerHTML = '';

    recipes.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h3>${recipe.name}</h3>
            <img src="${recipe.image}" alt="${recipe.name}">
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Steps:</strong> ${recipe.steps}</p>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        container.appendChild(card);
    });
}

function searchRecipes() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query) || 
        recipe.ingredients.toLowerCase().includes(query)
    );

    const container = document.getElementById('recipes-container');
    container.innerHTML = '';

    filteredRecipes.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h3>${recipe.name}</h3>
            <img src="${recipe.image}" alt="${recipe.name}">
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Steps:</strong> ${recipe.steps}</p>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        container.appendChild(card);
    });
}

function deleteRecipe(index) {
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}

// Initial display of recipes
displayRecipes();
