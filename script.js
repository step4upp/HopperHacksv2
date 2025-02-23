document.getElementById("fetch-recipes").addEventListener("click", async () => {
    const ingredients = document.getElementById("ingredients").value;

    if (!ingredients) {
        alert("Please enter ingredients!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/recipes?ingredients=${ingredients}`);
        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        // Display recipes
        const recipesList = document.getElementById("recipes");
        recipesList.innerHTML = ""; // Clear previous results

        data.forEach(recipe => {
            const recipeItem = document.createElement("div");
            recipeItem.classList.add("recipe-item");

            const img = document.createElement("img");
            img.src = recipe.image;  // Set image source
            img.alt = recipe.title;
            img.classList.add("recipe-image");

            const title = document.createElement("h3");
            title.textContent = recipe.title;

            recipeItem.appendChild(img);
            recipeItem.appendChild(title);
            recipesList.appendChild(recipeItem);
        });
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
});
