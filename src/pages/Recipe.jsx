import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Search from "../components/Search";
import AddIcon from "@mui/icons-material/Add";
import AddPopup from "../components/AddPopup";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SwapVertIcon from "@mui/icons-material/SwapVert";

function Recipe() {
    const [allRecipes, setAllRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
    const [sortDirection, setSortDirection] = useState("asc");

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
            const ingredientsMatch = item.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(searchText)
            );
            return titleMatch || descriptionMatch || ingredientsMatch;
        });
        setFilteredRecipes(filtered);
    }

    function openAdd() {
        setIsAddPopupVisible(true);
    }

    function closeAddPopup() {
        setIsAddPopupVisible(false);
    }

    const allTags = [...new Set(allRecipes.flatMap((recipe) => recipe.tags))];

    function handleFilterChange(event) {
        const selectValue = event.target.value.toLowerCase();
        const filtered = allRecipes.filter((item) => {
            if (!selectValue) return allRecipes;

            const tagsMatch = item.tags.some(
                (tag) => tag.toLowerCase() === selectValue
            );
            return tagsMatch;
        });
        setFilteredRecipes(filtered);
    }
    function handleDifficultyChange(event) {
        const selectValue = event.target.value.toLowerCase();
        const filtered = allRecipes.filter((item) => {
            if (!selectValue) return allRecipes;
            return item.difficulty_level.toLowerCase() === selectValue;
        });
        setFilteredRecipes(filtered);
    }

    function handleSort(event) {
        const sortingComparator = event.target.innerText;

        if (sortingComparator === "Difficulty") {
            const difficultyOrder = { easy: 1, medium: 2, hard: 3 };

            const sorted = [...filteredRecipes].sort((a, b) => {
                const comparison =
                    difficultyOrder[a.difficulty_level.toLowerCase()] -
                    difficultyOrder[b.difficulty_level.toLowerCase()];
                return sortDirection === "asc" ? comparison : -comparison;
            });

            console.log(sorted);
            setFilteredRecipes(sorted);
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else if (sortingComparator === "Title") {
            const sorted = [...filteredRecipes].sort((a, b) => {
                const comparison = a.title.localeCompare(b.title);
                return sortDirection === "asc" ? comparison : -comparison;
            });

            console.log(sorted);
            setFilteredRecipes(sorted);
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        }
    }

    return (
        <div>
            <div className="search-flex">
                <Search handleSearch={handleSearch} />
                <button onClick={openAdd} className="add-button primary">
                    Add <AddIcon />
                </button>
            </div>
            <div className="filter-flex">
                <FilterListIcon />
                <select
                    onChange={handleDifficultyChange}
                    name="difficulty"
                    id="filter-difficulty"
                >
                    <option value="">Select difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <select
                    onChange={handleFilterChange}
                    name="tags"
                    id="filter-tags"
                >
                    <option value="">Select tag</option>
                    {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
                <button onClick={handleSort} className="primary">
                    Difficulty <SwapVertIcon />
                </button>
                <button onClick={handleSort} className="primary">
                    Title <SwapVertIcon />
                </button>
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
                        last_updated={item.last_updated}
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
                        last_updated={selectedRecipe.last_updated}
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

            {isAddPopupVisible && <AddPopup closeAddPopup={closeAddPopup} />}
        </div>
    );
}

export default Recipe;
