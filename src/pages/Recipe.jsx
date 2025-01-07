import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Search from "../components/Search";
import AddIcon from "@mui/icons-material/Add";
import AddPopup from "../components/AddPopup";
import FilterListIcon from "@mui/icons-material/FilterList";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import EditRecipe from "../components/EditRecipe";
import Pagination from "../components/Pagination";
import ShareIcon from "@mui/icons-material/Share";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Recipe() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const [editedRecipe, setEditedRecipe] = useState(null);
  const [triggerUseEffect, setTriggerUseEffect] = useState(0);
  const [page, setPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(6);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/recipes")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.position - b.position);
        setAllRecipes(sortedData);
        setFilteredRecipes(sortedData);
      })
      .catch((err) => console.error("Error fetching recipes:", err));
  }, [triggerUseEffect]);

  function handleClick(id) {
    const currentRecipe = allRecipes.find((item) => item.id === id);
    setSelectedRecipe(currentRecipe);
  }

  function closePopup() {
    setSelectedRecipe(null);
  }

  function handleSearch(event) {
    const searchText = event.target.value.toLowerCase();
    if (!searchText) setFilteredRecipes(allRecipes);
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
  function closeEditPopup() {
    setIsAddPopupVisible(false);
    setEditedRecipe(null);
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

      const sorted = [...allRecipes].sort((a, b) => {
        const comparison =
          difficultyOrder[a.difficulty_level.toLowerCase()] -
          difficultyOrder[b.difficulty_level.toLowerCase()];
        return sortDirection === "asc" ? comparison : -comparison;
      });

      console.log(sorted);
      setFilteredRecipes(sorted);
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else if (sortingComparator === "Title") {
      const sorted = [...allRecipes].sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return sortDirection === "asc" ? comparison : -comparison;
      });

      console.log(sorted);
      setFilteredRecipes(sorted);
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else if (sortingComparator === "Time") {
      const sorted = [...allRecipes].sort((a, b) => {
        const comparison = new Date(a.last_updated) - new Date(b.last_updated);
        return sortDirection === "asc" ? comparison : -comparison;
      });
      console.log(sorted);
      setFilteredRecipes(sorted);
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else if (sortingComparator === "Tags") {
      const sorted = [...allRecipes].sort((a, b) => {
        const comparison = a.tags[0].localeCompare(b.tags[0]);
        return sortDirection === "asc" ? comparison : -comparison;
      });

      console.log(sorted);
      setFilteredRecipes(sorted);
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    }
  }

  function handleDelete(id) {
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTriggerUseEffect((prev) => prev + 1);
    });
  }

  function handleEdit(id) {
    const currentRecipe = allRecipes.find((item) => item.id === id);
    setEditedRecipe(currentRecipe);
  }

  function handleSelectRecipe(id) {
    setSelectedRecipes((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((recipeId) => recipeId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  }

  function handleShare() {
    const recipesToShare = allRecipes.filter((recipe) =>
      selectedRecipes.includes(recipe.id)
    );
    const emailContent = JSON.stringify(recipesToShare, null, 2);

    const emailLink = `mailto:?subject=Recipes&body=${encodeURIComponent(
      emailContent
    )}`;
    window.location.href = emailLink;
  }
  const moveRecipe = (dragIndex, hoverIndex) => {
    const updatedRecipes = [...filteredRecipes];
    const [movedRecipe] = updatedRecipes.splice(dragIndex, 1);
    updatedRecipes.splice(hoverIndex, 0, movedRecipe);

    setFilteredRecipes(updatedRecipes);

    updatedRecipes.forEach((recipe, index) => {
      fetch(`http://localhost:3000/recipes/${recipe.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ position: index }),
      }).catch((err) => console.error("Error updating recipe order:", err));
    });
  };

  const lastPostIndex = page * recipesPerPage;
  const firstPostIndex = lastPostIndex - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(firstPostIndex, lastPostIndex);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="search-flex">
          <Search handleSearch={handleSearch} />
          <button onClick={openAdd} className="add-button primary">
            Add <AddIcon />
          </button>
          <button onClick={handleShare} className="share-button primary">
            Share <ShareIcon />
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
          <select onChange={handleFilterChange} name="tags" id="filter-tags">
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
          <button onClick={handleSort} className="primary">
            Time <SwapVertIcon />
          </button>
          <button onClick={handleSort} className="primary">
            Tags <SwapVertIcon />
          </button>
        </div>
        <div className="cards-flex">
          {currentRecipes.map((item, index) => (
            <DraggableRecipeCard
              key={item.id}
              index={index}
              id={item.id}
              title={item.title}
              description={item.description}
              difficulty_level={item.difficulty_level}
              tags={item.tags}
              last_updated={item.last_updated}
              moveRecipe={moveRecipe}
              openPopup={() => handleClick(item.id)}
              handleDelete={() => handleDelete(item.id)}
              handleEdit={() => handleEdit(item.id)}
              isSelected={selectedRecipes.includes(item.id)}
              handleSelectRecipe={handleSelectRecipe}
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
                    {selectedRecipe.preparation_steps.map((item) => {
                      return <li>{item}</li>;
                    })}
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

        {isAddPopupVisible && (
          <AddPopup
            closeAddPopup={closeAddPopup}
            allRecipes={allRecipes}
            setAllRecipes={setAllRecipes}
            setFilteredRecipes={setFilteredRecipes}
            setTriggerUseEffect={setTriggerUseEffect}
          />
        )}

        {editedRecipe && (
          <EditRecipe
            closeEditPopup={closeEditPopup}
            allRecipes={allRecipes}
            setAllRecipes={setAllRecipes}
            setFilteredRecipes={setFilteredRecipes}
            key={editedRecipe.id}
            id={editedRecipe.id}
            title={editedRecipe.title}
            description={editedRecipe.description}
            difficulty_level={editedRecipe.difficulty_level}
            tags={editedRecipe.tags}
            last_updated={editedRecipe.last_updated}
            ingredients={editedRecipe.ingredients}
            preparation_steps={editedRecipe.preparation_steps}
            setTriggerUseEffect={setTriggerUseEffect}
          />
        )}

        <Pagination
          recipesPerPage={recipesPerPage}
          totalRecipes={allRecipes.length}
          paginate={setPage}
          currentPage={page}
        />
      </div>
    </DndProvider>
  );
}

const DraggableRecipeCard = ({ id, index, moveRecipe, ...props }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "recipe",
    hover(item) {
      if (item.index !== index) {
        moveRecipe(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "recipe",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <RecipeCard {...props} />
    </div>
  );
};

export default Recipe;
