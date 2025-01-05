import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

function AddPopup({ closeAddPopup }) {
    const [isVisible, setIsVisible] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        ingredients: [],
        difficulty: "easy",
        preparation: [],
        tags: [],
        date: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        const key = id.replace("add-", "");
        const isArrayField = ["ingredients", "preparation", "tags"].includes(
            key
        );

        setFormData((prev) => ({
            ...prev,
            [key]: isArrayField
                ? value.split(",").map((item) => item.trim())
                : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split("T")[0];
        const updatedFormData = { ...formData, date: currentDate };
        console.log("Form Data Submitted:", updatedFormData);
        setFormData(updatedFormData);
        closeAddPopup();
        alert("New recipe added successfully");
    };

    return isVisible ? (
        <div className="add-popup">
            <div className="popup-bg" onClick={closeAddPopup}></div>
            <form className="add" action="post" onSubmit={handleSubmit}>
                <div className="add-heading-flex">
                    <h3 className="add-heading">Add new recipe</h3>
                    <button className="close-button" onClick={closeAddPopup}>
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
                />

                <label htmlFor="add-description">Description</label>
                <input
                    id="add-description"
                    type="text"
                    className="add-input"
                    placeholder="Description"
                    onChange={handleChange}
                    value={formData.description}
                />

                <label htmlFor="add-ingredients">Ingredients</label>
                <input
                    id="add-ingredients"
                    type="text"
                    className="add-input"
                    placeholder="Add ingredients separated by comma"
                    onChange={handleChange}
                    value={formData.ingredients}
                />

                <label htmlFor="add-difficulty">Difficulty</label>
                <select
                    id="add-difficulty"
                    onChange={handleChange}
                    value={formData.difficulty}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <label htmlFor="add-preparation">Preparation steps</label>
                <input
                    id="add-preparation"
                    type="text"
                    className="add-input"
                    placeholder="Describe preparation steps separated by comma"
                    onChange={handleChange}
                    value={formData.preparation}
                />

                <label htmlFor="add-tags">Tags</label>
                <input
                    id="add-tags"
                    type="text"
                    className="add-input"
                    placeholder="Add tags separated by comma"
                    onChange={handleChange}
                    value={formData.tags}
                />

                <button type="submit" className="add-button primary">
                    Save <SaveOutlinedIcon />
                </button>
            </form>
        </div>
    ) : null;
}

export default AddPopup;
