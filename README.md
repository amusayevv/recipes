# Recipe Manager App

## Introduction   

This **Recipe Manager App is a React-based program** made to make it easier for users to efficiently create, view, edit, remove, and arrange recipes. The app is easy to use and intuitive because recipes include features like ingredients, preparation instructions, and tags. The goal of this tool is to make recipe management more user-friendly for both enthusiastic chefs and casual home cooks.

## Pages 

1. **Home Page**
* Welcoming Message: Includes an overview of the app's goal.
* Featured Recipe Section: Draws attention to a well-liked or recently added recipe.
* Portfolio Showcase: Shows the projects finished for the Web and Mobile 1 course.

2. **Recipe Page**
**Recipe Structure**
Each recipe includes:
* Title: Descriptive name of the recipe.
* Description: Brief summary of the recipe.
* Ingredients: Listed format for required ingredients.
* Preparation Steps: Detailed instructions in a numbered list or paragraph format.
* Tags: Categories such as “Dessert,” “Vegetarian,” “Quick Meal,” etc.
* Difficulty Level: Easy, Medium, or Hard.
* Last Updated: Automatically updates when a recipe is created or modified.

**Recipe Managament**
* Create Recipes
* Edit/Update Recipes
* Delete Recipes

**Main Features**
* Display Recipes: Fetches and displays recipes from the backend, sorted by last updated date or difficulty level.
* Search Functionality: Find recipes by title, description, or ingredients.
* Filter Options: Filter recipes by tags or difficulty level.
* Sort Options: Sort recipes by attributes like title, create date, update date, tags, or difficulty level.

3. **Contact Page**
* Form Submission: Allows users to enter their subject, email, and message content.
* JSON Storage: Messages are sent and stored in a JSON file on the JSON Server.

**Bonus Features**
* Share Recipes: Select multiple recipes and share their details via email in JSON format.
* Drag and Drop: Rearrange recipe order via drag-and-drop functionality, with changes persisted to the server.
* Pagination/Infinite Scrolling: Load more recipes as users scroll, maintaining sort order when applicable.



## Setup and Installation 

1. Clone the repository:
```
git clone https://github.com/amusayevv/recipes.git

```
2. Install dependencies:

```
npm install
```
3. Run application:
```
npm run dev
```
Then this link will be open: http://localhost:5173/

4. To start JSON server:
```
npx json-server data/db.json
```
and this will lead to the http://localhost:3000/recepies this link.

## Folder Structure
```
RECIPES/
├── data/
│   └── db.json          # JSON Server database for storing recipes and messages
├── image/
│   └── food.jpg         # Image assets for the app
├── node_modules/        # Auto-generated folder for npm dependencies
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Greeting.jsx # Component for displaying greetings or intro messages
│   │   └── RecipeCard.jsx # Component for displaying individual recipe cards
│   ├── pages/           # Page-level React components
│   │   ├── Contact.jsx  # Contact form page
│   │   ├── Home.jsx     # Home page with introduction and featured recipe
│   │   └── Recipe.jsx   # Recipe management page
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles for the app
│   └── main.jsx         # Entry point of the application
├── .gitignore           # Files and folders to ignore in Git commits
├── index.html           # HTML template for the app
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Lockfile for npm dependencies
├── README.md            # Documentation file
└── vite.config.js       # Configuration file for Vite
```






