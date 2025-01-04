import React from "react";

function Home () {
    return( 
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
            <h2 className="new">Features</h2><br/><br/><br/>
            <div className="feature-align">
                    <div >
                        <h3 className="header-h3">Popular Recipe</h3>
                        <p></p>
                    </div>
                    <div>
                        <h3 className="header-h3">New Recipe</h3>
                        <p></p>
                    </div>
                    </div>
            </section>

            {/* <section>
                <h2 className="header-h2">Featured Recipe</h2>
                <div classname="featured">
                    <h3 className="header-h3">name of recipe</h3>
                    <p className="paragraph">ingredients</p>
                    <a href="#" target="_blank">View Full Recipe</a>
                </div>
            </section> */}

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