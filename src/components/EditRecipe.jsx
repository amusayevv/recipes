import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

function EditRecipe({
    closeEditPopup,
    allRecipes,
    setAllRecipes,
    setFilteredRecipes,
    title,
    description,
    ingredients,
    difficulty_level,
    preparation_steps,
    tags,
    last_updated,
    id,
    setTriggerUseEffect,
}) {
    const [formData, setFormData] = useState({
        title: title,
        description: description,
        ingredients: ingredients.join(", "),
        difficulty_level: difficulty_level,
        preparation_steps: preparation_steps.join(", "),
        tags: tags.join(", "),
        last_updated: last_updated,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        const key = id.replace("add-", "");
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split("T")[0];
        const newRecipe = {
            ...formData,
            id: id.toString(),
            ingredients: formData.ingredients
                .split(",")
                .map((item) => item.trim()),
            preparation_steps: formData.preparation_steps
                .split(",")
                .map((item) => item.trim()),
            tags: formData.tags.split(",").map((item) => item.trim()),
            last_updated: currentDate,
        };

        fetch(`http://localhost:3000/recipes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecipe),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("Error");
                    return;
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setTriggerUseEffect((prev) => prev + 1);
                closeEditPopup();
            });
    };

    return (
        <div className="add-popup">
            <div className="popup-bg" onClick={closeEditPopup}></div>
            <form className="add" onSubmit={handleSubmit}>
                <div className="add-heading-flex">
                    <h3 className="add-heading">Add new recipe</h3>
                    <button
                        type="button"
                        className="close-button"
                        onClick={closeEditPopup}
                    >
                        <CloseIcon />
                    </button>
                </div>

                <label htmlFor="add-title">Title</label>
                <input
                    id="add-title"
                    type="text"
                    className="add-input"
                    placeholder="Title"
                    onChange={handleChange}
                    value={formData.title}
                    required
                />

                <label htmlFor="add-description">Description</label>
                <input
                    id="add-description"
                    type="text"
                    className="add-input"
                    placeholder="Description"
                    onChange={handleChange}
                    value={formData.description}
                    required
                />

                <label htmlFor="add-ingredients">Ingredients</label>
                <input
                    id="add-ingredients"
                    type="text"
                    className="add-input"
                    placeholder="Add ingredients separated by commas"
                    onChange={handleChange}
                    value={formData.ingredients}
                    required
                />

                <label htmlFor="add-difficulty">Difficulty</label>
                <select
                    id="add-difficulty_level"
                    onChange={handleChange}
                    value={formData.difficulty_level}
                >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>

                <label htmlFor="add-preparation_steps">Preparation steps</label>
                <input
                    id="add-preparation_steps"
                    type="text"
                    className="add-input"
                    placeholder="Describe preparation steps separated by commas"
                    onChange={handleChange}
                    value={formData.preparation_steps}
                    required
                />

                <label htmlFor="add-tags">Tags</label>
                <input
                    id="add-tags"
                    type="text"
                    className="add-input"
                    placeholder="Add tags separated by commas"
                    onChange={handleChange}
                    value={formData.tags}
                    required
                />

                <button type="submit" className="add-button primary">
                    Save <SaveOutlinedIcon />
                </button>
            </form>
        </div>
    );
}

export default EditRecipe;
