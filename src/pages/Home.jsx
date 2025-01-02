import React from "react";

function Home () {
    return( 
        <div>
            <section >
                <h2>Welcome to the Recipe Manager App!</h2>
                <p>The Best App for Recipes You Want Try Today. </p>
            </section>

            <br /><br/>

            <section>
                <h2>Featured Recipe</h2>
                <div classname="featured">
                    <h3>name of recipe</h3>
                    <p>ingredients</p>
                    {/* <a href="#" target="_blank">View Full Recipe</a> */}
                </div>
            </section>
            <br /><br />
            <section>
                <h2>Projects</h2>
                
                <p>We had two projects during this Web & Mobile 1 class. This app is one these projects. 
                    Another one was about creating extension:   
                         <a href="https://github.com/amusayevv/auto-form-filler.git" target="_blank"> GitHub repository link. </a>
                </p>
            </section>
            
        </div>

    );
}

export default Home;