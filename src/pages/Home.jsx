import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

function Home() {
    const [latestRecipe, setLatestRecipe] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/recipes")
            .then((res) => res.json())
            .then((data) => {
                // Sort recipes by last_updated in descending order
                const sortedRecipes = data.sort((a, b) => 
                    new Date(b.last_updated) - new Date(a.last_updated)
                );
                // Get the most recent recipe
                setLatestRecipe(sortedRecipes[0]);
            })
            .catch((err) => console.error("Error fetching recipes:", err));
    }, []);

    return (
        <div>
            <section className="center">
                <h2 className="header-h2">Welcome to the <br/>Recipe Manager App!</h2>
                <p className="paragraph">The Best App for Recipes You Want Try Today. </p>
            </section>

            <br /><br/><br/>

            <section className="feature">
                <div className="feature-align">
                    <div className="feature-style">
                        <div className="icon" >📘</div>
                        <h3 className="header-h3">Explore New Recipes</h3>
                        <p>Discover and browse through curated recipes tailored to your taste.</p>
                    </div>
                    <div className="feature-style">
                        <div className="icon" >❤️</div>
                        <h3 className="header-h3">Search & Filter</h3>
                        <p>Quickly find your favorite recipes using advanced search and filter options.</p>
                    </div>
                    <div className="feature-style">
                        <div className="icon" >🍴</div>
                        <h3 className="header-h3">Create Your Recipes</h3>
                        <p>Add, edit, or delete your own recipes to personalize your collection.</p>
                    </div>
                </div>
            </section>

            <br/><br/><br/><br/><br/>

            <section>
                <h2 className="new">Latest Recipe</h2><br/><br/><br/>
                <div className="latest__recipe">
                {latestRecipe && (
            <RecipeCard
            key={latestRecipe.id}
            id={latestRecipe.id}
            title={latestRecipe.title}
            description={latestRecipe.description}
            difficulty_level={latestRecipe.difficulty_level}
            tags={latestRecipe.tags}
            last_updated={latestRecipe.last_updated}
            openPopup={() => handleClick(latestRecipe.id)}
          >
            <div className="middle-flex">
              <ol>
                <p>
                  {latestRecipe.preparation_steps.map((item) => {
                    return <li>{item}</li>;
                  })}
                </p>
              </ol>

              <ul>
                <p>
                  {latestRecipe.ingredients.map((item) => {
                    return <li>{item}</li>;
                  })}
                </p>
              </ul>
                        </div>
                    </RecipeCard>
                )}
                </div>
            </section>

            <br /><br /><br /><br />

            <section>
                <h2 className="new">Projects</h2>
                <p className="paragraph">We had two projects during this Web & Mobile 1 class. This app is one these projects. 
                    Another one was about creating extension:   
                    <a href="https://github.com/amusayevv/auto-form-filler.git" target="_blank"> GitHub repository link. </a>
                </p>
            </section>
        </div>
    );
}

export default Home;