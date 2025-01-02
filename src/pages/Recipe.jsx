import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Search from "../components/Search";

function Recipe() {
    const [allRecipes, setAllRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

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
        </div>
    );
}

export default Recipe;
