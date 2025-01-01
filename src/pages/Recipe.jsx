import React, {useEffect, useState} from "react"
import RecipeCard from '../components/RecipeCard';


function Recipe () {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
      fetch("http://localhost:3000/recepies")
        .then(res => {
          return res.json();
        })
        .then(data => {
          setRecipe(data);
          console.log(data);
        })
    }, [])
  
    return (
        <div>
            <div className="cards-flex">
                {recipe && recipe.map(item => {
                    return <RecipeCard key={item.id} id={item.id} title={item.title} description={item.description} difficulty_level={item.difficulty_level} tags={item.tags} />
                })}
            </div>
        </div>
    
    )
}

export default Recipe;