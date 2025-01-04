import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Search from "../components/Search";
import "./Recipe.css";

function Recipe() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedRecipes, setSelectedRecipes] = useState(new Set());

  useEffect(() => {
    fetch("http://localhost:3000/recepies")
      .then((res) => res.json())
      .then((data) => {
        setAllRecipes(data);
        setFilteredRecipes(data);
      })
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  function handleClick(id) {
    const currentRecipe = allRecipes.find((item) => item.id === id);
    setSelectedRecipe(currentRecipe);
  }

  function closePopup() {
    setSelectedRecipe(null);
  }

  function handleSearch(event) {
    const searchText = event.target.value.toLowerCase();
    const filtered = allRecipes.filter((item) =>
      item.title.toLowerCase().includes(searchText)
    );
    setFilteredRecipes(filtered);
  }

  function toggleRecipeSelection(id) {
    setSelectedRecipes((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  }

  function handleSendToMail() {
    const selectedRecipesArray = Array.from(selectedRecipes).map((id) =>
      allRecipes.find((recipe) => recipe.id === id)
    );
    const mailBody = selectedRecipesArray
      .map(
        (recipe) =>
          `Title: ${recipe.title}\nDescription: ${
            recipe.description
          }\nDifficulty: ${recipe.difficulty_level}\nTags: ${recipe.tags.join(
            ", "
          )}\nIngredients: ${recipe.ingredients.join(
            ", "
          )}\nSteps: ${recipe.preparation_steps.join("\n")}\n\n`
      )
      .join("\n");
    const mailtoLink = `mailto:?subject=Selected Recipes&body=${encodeURIComponent(
      mailBody
    )}`;
    window.location.href = mailtoLink;
  }

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <div className="cards-flex">
        {filteredRecipes.map((item) => (
          <RecipeCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            difficulty_level={item.difficulty_level}
            tags={item.tags}
            isSelected={selectedRecipes.has(item.id)}
            onCheckboxChange={toggleRecipeSelection}
            openPopup={() => handleClick(item.id)}
          />
        ))}
      </div>

      {selectedRecipes.size > 0 && (
        <button className="send-mail-btn" onClick={handleSendToMail}>
          Send to Mail
        </button>
      )}

      {selectedRecipe && (
        <div className="recipe-popup">
          <div onClick={closePopup} className="popup-bg"></div>
          <RecipeCard
            key={selectedRecipe.id}
            id={selectedRecipe.id}
            title={selectedRecipe.title}
            description={selectedRecipe.description}
            difficulty_level={selectedRecipe.difficulty_level}
            tags={selectedRecipe.tags}
            openPopup={() => handleClick(selectedRecipe.id)}
          >
            <div className="middle-flex">
              <ol>
                <p>
                  {selectedRecipe.preparation_steps.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </p>
              </ol>

              <ul>
                <p>
                  {selectedRecipe.ingredients.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </p>
              </ul>
            </div>
          </RecipeCard>
        </div>
      )}
    </div>
  );
}

export default Recipe;
