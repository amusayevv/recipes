import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Search from "../components/Search";

function AddPopup() {
    return (
        <form className="add" action="post">
            <label htmlFor="add-title">Title</label>
            <input
                id="add-title"
                type="text"
                className="add-title"
                placeholder="Title"
            />
            <label htmlFor="add-description">Description</label>
            <input
                id="add-description"
                type="text"
                className="add-description"
                placeholder="Description"
            />
            <label htmlFor="add-ingredients">Ingredients</label>
            <input
                id="add-ingredients"
                type="text"
                className="add-popup-ingredients"
                placeholder="add ingredients separated by comma"
            />
            <label htmlFor="add-ingredients">Difficulty</label>
            <select name="cars" id="add-difficulty">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <label htmlFor="add-preparation">Preparation steps</label>
            <input
                id="add-preparation"
                type="text"
                className="add-popup-ingredients"
                placeholder="describe preparation steps separated by comma"
            />
            <label htmlFor="add-tags">Tags</label>
            <input
                id="add-tags"
                type="text"
                className="add-popup-ingredients"
                placeholder="add tags separated by comma"
            />
        </form>
    );
}

function Recipe() {
    const [allRecipes, setAllRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/recipes")
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
        const filtered = allRecipes.filter((item) => {
            const titleMatch = item.title.toLowerCase().includes(searchText);
            const descriptionMatch = item.description
                .toLowerCase()
                .includes(searchText);
            const tagsMatch = item.tags.some((tag) =>
                tag.toLowerCase().includes(searchText)
            );
            return titleMatch || descriptionMatch || tagsMatch;
        });
        setFilteredRecipes(filtered);
    }

    return (
        <div>
            <div className="search-flex">
                <Search handleSearch={handleSearch} />
                <button className="add-button primary">Add</button>
            </div>
            <div className="cards-flex">
                {filteredRecipes.map((item) => (
                    <RecipeCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        difficulty_level={item.difficulty_level}
                        tags={item.tags}
                        openPopup={() => handleClick(item.id)}
                    />
                ))}
            </div>

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
                                    {selectedRecipe.preparation_steps.map(
                                        (item) => {
                                            return <li>{item}</li>;
                                        }
                                    )}
                                </p>
                            </ol>

                            <ul>
                                <p>
                                    {selectedRecipe.ingredients.map((item) => {
                                        return <li>{item}</li>;
                                    })}
                                </p>
                            </ul>
                        </div>
                    </RecipeCard>
                </div>
            )}

            <AddPopup />
        </div>
    );
}

export default Recipe;
