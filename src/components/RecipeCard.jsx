import React from "react";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import "./RecipeCard.css";

const RecipeCard = (props) => {
  const difficulty_level = props.difficulty_level;
  let difficulty_color;

  if (difficulty_level === "Easy") {
    difficulty_color = { backgroundColor: "#008a05" };
  } else if (difficulty_level === "Medium") {
    difficulty_color = { backgroundColor: "#8a5e00" };
  } else {
    difficulty_color = { backgroundColor: "#8a1000" };
  }

  const handleCheckboxChange = () => {
    if (props.onCheckboxChange) {
      props.onCheckboxChange(props.id);
    }
  };

  return (
    <div className="card">
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={handleCheckboxChange}
          className="select-checkbox"
        />
      </div>

      <div className="card-top-cnt">
        <div className="card-text">
          <h3 className="card-title">{props.title}</h3>
          <p className="card-description">{props.description}</p>
        </div>
        <div className="tags">
          <ul className="tag-cnt">
            <li style={difficulty_color} className="difficulty">
              {difficulty_level}
            </li>
            {props.tags.map((tag, index) => {
              return (
                <li key={index} className="tag">
                  {tag}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {props.children}

      <div className="details">
        <div className="date">last updated: 2023-10-05 12:00</div>
        <button className="more" onClick={() => props.openPopup(props.id)}>
          More <ChevronRightRoundedIcon />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
